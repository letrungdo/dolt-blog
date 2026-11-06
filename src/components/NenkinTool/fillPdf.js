// Fills the NTA forms (納税管理人届出書 + 確定申告書 第一〜三表, 令和7年分以降用) in the browser.
// Coordinates are in the source PDF units (2481 x 3508, origin top-left); y is the vertical centre of the text.
import fontkit from "@pdf-lib/fontkit";
import { BlendMode, PDFDocument, rgb } from "pdf-lib";
import decompressWoff2 from "woff2-encoder/decompress";
import { calcRefund, toWareki } from "./calc.js";

const W = 2481;
const H = 3508;
const A4W = 595.276;
const A4H = 841.89;
const S = A4W / W;

const GREEN = rgb(0.62, 0.93, 0.62);
const YELLOW = rgb(1, 0.93, 0.2);

const text = (x, y, s, size = 34, align = "left", maxW = 0) => ({ kind: "text", x, y, s: s == null ? "" : String(s), size, align, maxW });
const num = (xr, y, s, size = 40) => text(xr, y, s, size, "right");
const strike = (x0, x1, y) => ({ kind: "strike", x0, x1, y });
const todo = (x0, y0, x1, y1) => ({ kind: "todo", x0, y0, x1, y1 });

// Split a postal code or phone number into the segments of a dashed field.
// Typed separators win ("160-0000", "+84 963 273 900"); otherwise the digits are split by pattern.
function splitParts(value, count) {
  const raw = (value || "").trim();
  if (!raw) return [];
  const parts = raw.split(/[-\s()]+/).filter(Boolean);
  if (parts.length > count) {
    return [parts.slice(0, parts.length - count + 1).join(" "), ...parts.slice(parts.length - count + 1)];
  }
  if (parts.length === count) return parts;

  const digits = raw.replace(/\D/g, "");
  const cut = (...lens) => {
    let i = 0;
    return lens.map((n) => digits.slice(i, (i += n)));
  };
  if (count === 2) return digits.length === 7 ? cut(3, 4) : null;
  // International (+84…): keep the country code with the first group, then 3 + 3 digits.
  // "+84 0963…" drops the domestic trunk 0 after a separated country code.
  if (raw.startsWith("+")) {
    const rest = parts.length > 1 ? parts.slice(1).join("").replace(/\D/g, "").replace(/^0/, "") : digits;
    const cc = parts.length > 1 ? `${parts[0]} ` : "+";
    return rest.length > 6 ? [`${cc}${rest.slice(0, -6)}`, rest.slice(-6, -3), rest.slice(-3)] : null;
  }
  if (digits.length === 11) return cut(3, 4, 4); // 090-1234-5678
  if (digits.length === 10) return /^0[36]/.test(digits) ? cut(2, 4, 4) : cut(3, 3, 4); // 03-1234-5678, 0963-…
  return null;
}

// Put text into the centred slots of a dashed field; empty value -> yellow box (handwrite) when box given.
// A value that cannot be split is written once across the whole field (x0..x1).
function slots(ops, value, xs, y, size, box, [x0, x1]) {
  if (!(value || "").trim()) {
    if (box) ops.push(box);
    return;
  }
  const parts = splitParts(value, xs.length);
  if (!parts) {
    ops.push(text(x0, y, value.trim(), size, "left", x1 - x0));
    return;
  }
  const slotW = (xs[1] - xs[0]) * 0.75;
  parts.forEach((p, i) => ops.push(text(xs[i], y, p, size, "center", slotW)));
}

function optional(ops, value, op, box) {
  if (value) ops.push(op(value));
  else if (box) ops.push(box);
}

export function buildOps(d) {
  const a = d.agent;
  const payment = Number(d.payment);
  const withheld = Number(d.withheld);
  const c = calcRefund({ payment, withheld, months: Number(d.months) });
  const decision = toWareki(d.decisionDate);
  const year = decision ? decision.year : "";
  const dob = toWareki(d.dob);
  const agentDob = toWareki(a.dob);
  const depart = toWareki(d.departDate);
  const office = (d.taxOffice || "").replace(/税務署$/, "");
  const zero = c.taxable === 0;
  const tax = zero ? 0 : c.tax;

  const form1 = [
    strike(781, 1015, 224),
    strike(1545, 1723, 224),
    text(800, 476, office, 38, "center"),
    text(419, 581, d.myNumber, 36),
    text(1600, 581, d.job, 36),
    text(419, 688, d.kana, 36, "left", 1180),
    text(419, 797, d.name, 40, "left", 1180),
    text(497, 904, "5", 40, "center"),
    text(741, 1121, d.addrJP, 36, "left", 1700),
    text(741, 1341, d.addrAbroad, 34, "left", 1700),
    strike(322, 912, 1452),
    strike(1639, 1773, 1452),
    text(662, 1561, "1", 48, "center"),
    text(662, 1666, "1", 48, "center"),
    text(1627, 2253, a.relation || "知人", 34, "center"),
    text(205, 2446, d.addrAbroad, 36, "left", 2150),
    text(205, 2621, "出国のため（厚生年金脱退一時金に係る退職所得の選択課税の還付申告のため）", 34, "left", 2150),
    text(1290, 2978, "厚生年金脱退一時金（退職所得）", 34),
    todo(780, 372, 1250, 428),
  ];
  if (dob) {
    form1.push(text(1682, 476, dob.name, 34, "center"), text(1896, 476, dob.year, 40, "center"));
    form1.push(text(2111, 476, dob.month, 40, "center"), text(2325, 476, dob.day, 40, "center"));
  }
  slots(form1, d.zipJP, [877, 1121], 1012, 40, null, [760, 1240]);
  slots(form1, d.phoneAbroad, [1807, 2056, 2306], 1228, 36, null, [1700, 2390]);
  if (depart) {
    form1.push(text(906, 2773, depart.year, 40, "center"), text(1008, 2773, depart.month, 40, "center"));
    form1.push(text(1115, 2773, depart.day, 40, "center"));
  }
  // 2. 納税管理人 – blank fields stay yellow for handwriting
  slots(form1, a.zip, [848, 1121], 1869, 40, todo(735, 1833, 1250, 1905), [750, 1240]);
  optional(form1, a.addr, (v) => text(741, 1965, v, 36, "left", 920), todo(720, 1928, 1680, 2003));
  if (agentDob) {
    form1.push(text(1930, 1965, `${agentDob.name}${agentDob.year}`, 32, "right"));
    form1.push(text(2085, 1965, agentDob.month, 36, "right"), text(2238, 1965, agentDob.day, 36, "right"));
  } else {
    form1.push(todo(1790, 1928, 2320, 2003));
  }
  optional(form1, a.kana, (v) => text(526, 2062, v, 36, "left", 1780), todo(500, 2022, 2320, 2100));
  optional(form1, a.name, (v) => text(526, 2158, v, 40, "left", 1780), todo(500, 2118, 2320, 2198));
  slots(form1, a.phone, [632, 875, 1121], 2253, 38, todo(500, 2215, 1250, 2293), [510, 1240]);
  optional(form1, a.job, (v) => text(2163, 2253, v, 34, "center"), todo(2005, 2215, 2320, 2293));

  // 第一表
  const agentLine = [a.addr, a.name].filter(Boolean).join(" ");
  const jan1Same = Boolean(d.departDate && d.decisionDate && d.departDate >= `${d.decisionDate.slice(0, 4)}-01-01`);
  const p1 = [
    text(526, 195, year, 48, "center"),
    strike(752, 1323, 195),
    text(1575, 195, "退職所得の選択課税", 36),
    text(1500, 357, office, 38, "center"),
    text(1180, 425, d.myNumber, 36),
    text(330, 503, d.addrJP, 34, "left", 1040),
    text(1680, 503, d.kana, 34, "left", 690),
    text(330, 583, d.addrAbroad, 28, "left", 1040),
    text(1680, 583, d.name, 40, "left", 690),
    text(330, 663, `${jan1Same ? "同上 ／ " : ""}納税管理人：${agentLine}`, 24, "left", 1040),
    text(676, 737, "1", 40, "center"),
    num(2370, 902, tax),
    num(2370, 1288, tax),
    num(2370, 1417, tax),
    num(2370, 1481, zero ? 0 : c.reconstruction),
    num(2370, 1547, zero ? 0 : c.total),
    num(2370, 1674, withheld),
    num(2370, 1738, `△${c.refund}`),
    num(2370, 1931, `△${c.refund}`),
    num(2370, 2382, withheld),
    text(1700, 2832, "（納税管理人）", 22),
    todo(700, 330, 1060, 388),
    todo(1474, 160, 1556, 230),
  ];
  if (dob) {
    p1.push(text(2066, 425, dob.code, 38, "center"), text(2161, 425, dob.year, 38, "center"));
    p1.push(text(2255, 425, dob.month, 38, "center"), text(2345, 425, dob.day, 38, "center"));
  }
  slots(p1, d.zipJP, [774, 935], 425, 38, null, [700, 1010]);
  if (!agentLine) p1.push(todo(700, 640, 1380, 688));
  slots(p1, a.phone, [1930, 2115, 2300], 737, 36, todo(1840, 712, 2385, 762), [1850, 2380]);
  optional(p1, a.bank, (v) => text(1862, 2832, v, 30, "left", 200), todo(1855, 2810, 2060, 2856));
  optional(p1, a.bank, () => text(2342, 2832, "1", 38, "center"), todo(2300, 2810, 2385, 2856));
  optional(p1, a.branch, (v) => text(1710, 2897, v.replace(/支店$/, ""), 32, "left", 350), todo(1690, 2875, 2060, 2920));
  optional(p1, a.branch, () => text(2342, 2897, "2", 38, "center"), todo(2300, 2875, 2385, 2920));
  p1.push(text(1745, 2963, "1", 40, "center"));
  optional(p1, a.account, (v) => text(1710, 3030, v, 40), todo(1690, 3005, 2385, 3055));

  // 第二表
  const p2 = [
    text(166, 121, year, 44, "center"),
    strike(318, 883, 121),
    text(330, 62, "退職所得の選択課税", 34),
    text(300, 316, d.addrAbroad, 26, "left", 820),
    text(300, 356, d.addrJP, 28, "left", 820),
    text(300, 489, d.kana, 24, "left", 820),
    text(300, 524, d.name, 34, "left", 820),
    text(220, 1553, "退職", 34, "center"),
    text(433, 1553, "脱退一時金", 30, "center"),
    text(579, 1553, "厚生労働省", 32),
    text(1121, 1553, "東京都千代田区霞が関1-2-2", 30),
    num(2070, 1553, payment),
    num(2405, 1553, withheld),
    num(2405, 1855, withheld),
  ];

  // 第三表
  const p3 = [
    text(312, 230, year, 44, "center"),
    strike(503, 1050, 230),
    text(503, 165, "退職所得の選択課税", 34),
    text(322, 505, d.addrAbroad, 22, "left", 720),
    text(322, 555, d.addrJP, 24, "left", 720),
    text(330, 721, d.kana, 24, "left", 720),
    text(330, 780, d.name, 34, "left", 720),
    text(1255, 579, "1", 36, "center"),
    text(1436, 579, "171", 36, "center"),
    num(1215, 1694, payment),
    num(1215, 2534, zero ? 0 : c.income),
    num(1215, 2612, 0),
    num(2370, 1466, tax),
    num(2370, 1542, tax),
    num(1881, 2918, payment),
    num(2349, 2918, c.deduction),
  ];
  if (!zero) p3.push(num(1091, 3300, c.taxable / 1000));

  return { form1, p1, p2, p3 };
}

// Google Fonts serves Noto Sans JP as ~120 WOFF2 slices, each with a unicode-range. Only the slices that
// hold the characters to draw are downloaded, so the user's text itself is never sent to Google.
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400";

function parseSlices(css) {
  const slices = [];
  for (const block of css.split("@font-face").slice(1)) {
    const url = (block.match(/url\((https:[^)]+)\)/) || [])[1];
    const range = (block.match(/unicode-range:\s*([^;]+);/) || [])[1];
    if (!url || !range) continue;
    const ranges = range.split(",").map((r) => {
      const [a, b] = r.trim().replace(/^U\+/i, "").split("-");
      return [parseInt(a, 16), parseInt(b || a, 16)];
    });
    slices.push({ url, ranges });
  }
  return slices;
}

async function embedGoogleFont(out, text, fetchUrl) {
  const css = new TextDecoder().decode(await fetchUrl(GOOGLE_FONTS_CSS));
  const slices = parseSlices(css);
  const codePoints = [...new Set([...text].map((ch) => ch.codePointAt(0)))];
  const sliceFor = (cp) => slices.findIndex((sl) => sl.ranges.some(([a, b]) => cp >= a && cp <= b));
  const needed = [...new Set(codePoints.map(sliceFor).filter((i) => i >= 0))];
  // pdf-lib cannot read WOFF2 (glyphs come out broken) nor subset these fonts, so unpack to TTF and embed whole.
  const fonts = await Promise.all(
    needed.map(async (i) => {
      const ttf = await decompressWoff2(new Uint8Array(await fetchUrl(slices[i].url)));
      return [i, await out.embedFont(ttf, { subset: false })];
    })
  );
  const bySlice = new Map(fonts);
  const fallback = fonts[0][1];
  const fontFor = (ch) => bySlice.get(sliceFor(ch.codePointAt(0))) || fallback;
  // Split a string into runs that share one slice font.
  return (s) => {
    const runs = [];
    for (const ch of s) {
      const font = fontFor(ch);
      const last = runs[runs.length - 1];
      if (last && last.font === font) last.text += ch;
      else runs.push({ text: ch, font });
    }
    return runs;
  };
}

function drawOps(page, ops, toRuns, highlight) {
  const black = rgb(0, 0, 0);
  for (const op of ops) {
    if (op.kind === "todo") {
      if (highlight) {
        page.drawRectangle({ x: op.x0 * S, y: (H - op.y1) * S, width: (op.x1 - op.x0) * S, height: (op.y1 - op.y0) * S, color: YELLOW, blendMode: BlendMode.Multiply });
      }
    } else if (op.kind === "strike") {
      if (highlight) {
        page.drawRectangle({ x: op.x0 * S, y: (H - op.y - 14) * S, width: (op.x1 - op.x0) * S, height: 28 * S, color: GREEN, blendMode: BlendMode.Multiply });
      }
      page.drawLine({ start: { x: op.x0 * S, y: (H - op.y) * S }, end: { x: op.x1 * S, y: (H - op.y) * S }, thickness: 4 * S, color: black });
    } else if (op.s) {
      const runs = toRuns(op.s);
      const widthAt = (size) => runs.reduce((sum, r) => sum + r.font.widthOfTextAtSize(r.text, size), 0);
      let size = op.size;
      let width = widthAt(size);
      if (op.maxW && width > op.maxW) {
        size = (size * op.maxW) / width;
        width = op.maxW;
      }
      let x = op.x;
      if (op.align === "right") x -= width;
      else if (op.align === "center") x -= width / 2;
      if (highlight) {
        page.drawRectangle({ x: (x - 6) * S, y: (H - op.y - size * 0.62) * S, width: (width + 12) * S, height: size * 1.24 * S, color: GREEN, blendMode: BlendMode.Multiply });
      }
      for (const r of runs) {
        page.drawText(r.text, { x: x * S, y: (H - op.y - size * 0.36) * S, size: size * S, font: r.font, color: black });
        x += r.font.widthOfTextAtSize(r.text, size);
      }
    }
  }
}

// Returns a 4-page A4 PDF (Mẫu 1, 第一表, 第二表, 第三表) as bytes.
// `load(path)` resolves a static path such as "/tools/nenkin/x.pdf" to an ArrayBuffer;
// `fetchUrl(url)` fetches a Google Fonts URL as an ArrayBuffer.
export async function generateNenkinPdf(data, { highlight = false, load, fetchUrl }) {
  const ops = buildOps(data);
  const allText = Object.values(ops).flat().filter((op) => op.s).map((op) => op.s).join("");
  const out = await PDFDocument.create();
  out.registerFontkit(fontkit);
  const [form1Bytes, form2Bytes, form3Bytes, toRuns] = await Promise.all([
    load("/tools/nenkin/form1-nozei-kanrinin.pdf"),
    load("/tools/nenkin/form2-shinkokusho-1-2.pdf"),
    load("/tools/nenkin/form2-shinkokusho-3.pdf"),
    embedGoogleFont(out, allText, fetchUrl),
  ]);
  const [form1, form2, form3] = await Promise.all([form1Bytes, form2Bytes, form3Bytes].map((b) => PDFDocument.load(b)));
  const pages = [
    [form1, 0, ops.form1],
    [form2, 0, ops.p1],
    [form2, 1, ops.p2],
    [form3, 0, ops.p3],
  ];
  for (const [doc, index, pageOps] of pages) {
    const embedded = await out.embedPage(doc.getPage(index));
    const page = out.addPage([A4W, A4H]);
    page.drawPage(embedded, { x: 0, y: 0, xScale: S, yScale: S });
    drawOps(page, pageOps, toRuns, highlight);
  }
  return out.save();
}
