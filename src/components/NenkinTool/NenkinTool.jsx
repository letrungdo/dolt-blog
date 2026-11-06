import React, { useMemo, useState } from "react";
import { withPrefix } from "gatsby";
import { calcRefund } from "./calc";

const L = {
  vi: {
    privacy: "🔒 Mọi thông tin chỉ xử lý trên trình duyệt của bạn, không gửi lên máy chủ nào. Tải lại trang là xoá hết.",
    you: "1. Thông tin của bạn",
    name: "Họ tên (như hộ chiếu, chữ in hoa)",
    kana: "Họ tên katakana",
    dob: "Ngày sinh",
    job: "Nghề nghiệp hiện tại",
    myNumber: "My Number (12 số, đã trả thẻ thì để trống)",
    zipJP: "Mã bưu điện địa chỉ cuối ở Nhật",
    addrJP: "Địa chỉ cuối cùng ở Nhật (xem thẻ cư trú, cả mặt sau)",
    taxOffice: "Cục thuế phụ trách địa chỉ đó",
    taxOfficeHelp: "Tra tại trang danh sách cục thuế của 国税庁",
    addrAbroad: "Địa chỉ hiện tại ở nước ngoài (không dấu)",
    phoneAbroad: "Số điện thoại hiện tại",
    departDate: "Ngày xuất cảnh khỏi Nhật (dấu DEPARTED trên hộ chiếu)",
    notice: "2. Giấy 脱退一時金支給決定通知書 (khung 厚生年金保険)",
    decisionDate: "支給決定年月日 (ngày quyết định chi trả)",
    payment: "支給額 – số tiền nenkin (yên)",
    withheld: "所得税額及び復興特別所得税額 – thuế đã trừ (yên)",
    months: "被保険者期間 – số tháng đóng",
    agent: "3. Người đại diện thuế (納税管理人) ở Nhật",
    agentHelp: "Ô nào để trống sẽ được tô vàng trên bản kiểm tra để viết tay sau.",
    agentName: "Họ tên",
    agentKana: "Họ tên katakana",
    agentDob: "Ngày sinh",
    agentZip: "Mã bưu điện",
    agentAddr: "Địa chỉ ở Nhật",
    agentPhone: "Số điện thoại",
    agentJob: "Nghề nghiệp",
    relation: "Quan hệ với bạn",
    bank: "Tên ngân hàng (vd: 三井住友銀行)",
    branch: "Tên chi nhánh (vd: 新宿)",
    account: "Số tài khoản 普通",
    result: "Kết quả dự kiến",
    deduction: "Khấu trừ (退職所得控除額)",
    taxOwed: "Thuế thực phải chịu",
    refund: "Tiền được hoàn",
    download: "Tải PDF để in nộp",
    review: "Tải bản kiểm tra (tô màu)",
    working: "Đang tạo PDF…",
    missing: "Còn thiếu các mục bắt buộc",
    note: "Bản kiểm tra: xanh = đã điền, vàng = còn viết tay (ngày nộp, ô G01, thông tin người đại diện còn trống). Khi nộp, in bản không tô màu, A4 tỷ lệ 100%. Lần đầu tạo PDF sẽ tải khoảng 4 MB mẫu đơn, cùng phần font Noto Sans JP cần dùng từ Google Fonts (chỉ tải theo nhóm ký tự, không gửi nội dung bạn nhập). Hãy kiểm tra lại mọi thông tin trước khi nộp; công cụ này không thay thế tư vấn thuế.",
    error: "Không tạo được PDF: ",
  },
  en: {
    privacy: "🔒 Everything is processed in your browser. Nothing is sent to any server. Reloading the page clears it.",
    you: "1. About you",
    name: "Full name (as in passport, capitals)",
    kana: "Name in katakana",
    dob: "Date of birth",
    job: "Current job",
    myNumber: "My Number (12 digits, leave blank if returned)",
    zipJP: "Postal code of your last address in Japan",
    addrJP: "Last address in Japan (check both sides of your residence card)",
    taxOffice: "Tax office for that address",
    taxOfficeHelp: "Find it on the NTA tax office list",
    addrAbroad: "Current address abroad",
    phoneAbroad: "Current phone number",
    departDate: "Date you left Japan (DEPARTED stamp in passport)",
    notice: "2. Notice of Entitlement 脱退一時金支給決定通知書 (厚生年金保険 box)",
    decisionDate: "支給決定年月日 (entitlement date)",
    payment: "支給額 – payment amount (yen)",
    withheld: "所得税額及び復興特別所得税額 – tax withheld (yen)",
    months: "被保険者期間 – months of coverage",
    agent: "3. Tax agent (納税管理人) in Japan",
    agentHelp: "Blank fields are highlighted yellow in the check copy so they can be handwritten later.",
    agentName: "Full name",
    agentKana: "Name in katakana",
    agentDob: "Date of birth",
    agentZip: "Postal code",
    agentAddr: "Address in Japan",
    agentPhone: "Phone number",
    agentJob: "Job",
    relation: "Relationship to you",
    bank: "Bank name (e.g. 三井住友銀行)",
    branch: "Branch name (e.g. 新宿)",
    account: "Ordinary (普通) account number",
    result: "Estimated result",
    deduction: "Deduction (退職所得控除額)",
    taxOwed: "Tax actually owed",
    refund: "Refund",
    download: "Download PDF to print",
    review: "Download check copy (highlighted)",
    working: "Creating PDF…",
    missing: "Required fields missing",
    note: "Check copy: green = filled, yellow = handwrite (submission date, G01, any blank agent fields). Print the version without highlights, A4 at 100%. The first PDF downloads about 4 MB of forms, plus the parts of the Noto Sans JP font it needs from Google Fonts (fetched by character group; your text is not sent). Check everything before you submit; this tool is not tax advice.",
    error: "Could not create the PDF: ",
  },
};

const RELATIONS = ["知人", "友人", "親族", "同僚"];
const REQUIRED = ["name", "kana", "dob", "zipJP", "addrJP", "taxOffice", "addrAbroad", "departDate", "decisionDate", "payment", "withheld", "months"];

const EMPTY = {
  name: "", kana: "", dob: "", job: "会社員", myNumber: "", zipJP: "", addrJP: "", taxOffice: "",
  addrAbroad: "", phoneAbroad: "", departDate: "", decisionDate: "", payment: "", withheld: "", months: "",
  agent: { name: "", kana: "", dob: "", zip: "", addr: "", phone: "", job: "会社員", relation: "知人", bank: "", branch: "", account: "" },
};

const yen = (n) => `¥${Number(n).toLocaleString("ja-JP")}`;

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.arrayBuffer();
}

const loadStatic = (path) => fetchBuffer(withPrefix(path));

function Field({ label, help, children }) {
  return (
    <label className="nenkin-field">
      <span className="nenkin-label">{label}</span>
      {children}
      {help && <small className="nenkin-help">{help}</small>}
    </label>
  );
}

function NenkinTool({ lang = "vi" }) {
  const t = L[lang] || L.vi;
  const [d, setD] = useState(EMPTY);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [showMissing, setShowMissing] = useState(false);

  const set = (key) => (e) => setD({ ...d, [key]: e.target.value });
  const setAgent = (key) => (e) => setD({ ...d, agent: { ...d.agent, [key]: e.target.value } });

  const calc = useMemo(() => {
    const payment = Number(d.payment);
    const withheld = Number(d.withheld);
    const months = Number(d.months);
    if (!payment || !withheld || !months) return null;
    return calcRefund({ payment, withheld, months });
  }, [d.payment, d.withheld, d.months]);

  const missing = REQUIRED.filter((k) => !String(d[k]).trim());

  const download = async (highlight) => {
    setError("");
    if (missing.length) {
      setShowMissing(true);
      const first = document.querySelector(`.nenkin-tool [name="${missing[0]}"]`);
      if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "center" });
        first.focus({ preventScroll: true });
      }
      return;
    }
    setBusy(highlight ? "review" : "print");
    // Open the tab inside the click handler; popup blockers reject window.open after an await.
    const tab = window.open("", "_blank");
    if (tab) tab.document.write(`<title>${t.working}</title><p style="font:16px sans-serif;padding:24px">${t.working}</p>`);
    try {
      const { generateNenkinPdf } = await import("./fillPdf");
      const bytes = await generateNenkinPdf(d, { highlight, load: loadStatic, fetchUrl: fetchBuffer });
      // Not revoked: the tab's PDF viewer reads the blob again when the user saves or prints.
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      if (tab && !tab.closed) {
        tab.location.href = url;
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = highlight ? "nenkin-refund-check.pdf" : "nenkin-refund-forms.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      if (tab) tab.close();
      setError(t.error + err.message);
    } finally {
      setBusy("");
    }
  };

  const input = (key, props = {}) => {
    const invalid = showMissing && missing.includes(key);
    return <input name={key} value={d[key]} onChange={set(key)} className={invalid ? "is-invalid" : undefined} aria-invalid={invalid || undefined} {...props} />;
  };
  const agentInput = (key, props = {}) => <input value={d.agent[key]} onChange={setAgent(key)} {...props} />;

  return (
    <div className="nenkin-tool">
      <p className="nenkin-privacy">{t.privacy}</p>

      <fieldset>
        <legend>{t.you}</legend>
        <div className="nenkin-grid">
          <Field label={t.name}>{input("name", { placeholder: "NGUYEN VAN A", autoComplete: "off" })}</Field>
          <Field label={t.kana}>{input("kana", { placeholder: "グエン ヴァン ア" })}</Field>
          <Field label={t.dob}>{input("dob", { type: "date" })}</Field>
          <Field label={t.job}>{input("job")}</Field>
          <Field label={t.myNumber}>{input("myNumber", { inputMode: "numeric" })}</Field>
          <Field label={t.zipJP}>{input("zipJP", { placeholder: "160-0000" })}</Field>
          <Field label={t.addrJP}>{input("addrJP", { placeholder: "東京都新宿区○○町1丁目2番3号 ○○ハイツ101号" })}</Field>
          <Field
            label={t.taxOffice}
            help={
              <a href="https://www.nta.go.jp/about/organization/access/map.htm" target="_blank" rel="noopener noreferrer">
                {t.taxOfficeHelp}
              </a>
            }
          >
            {input("taxOffice", { placeholder: "新宿" })}
          </Field>
          <Field label={t.addrAbroad}>{input("addrAbroad", { placeholder: "SO 1 DUONG ABC, PHUONG XYZ, TP HO CHI MINH, VIET NAM" })}</Field>
          <Field label={t.phoneAbroad}>{input("phoneAbroad", { placeholder: "+84 900 000 000" })}</Field>
          <Field label={t.departDate}>{input("departDate", { type: "date" })}</Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>{t.notice}</legend>
        <div className="nenkin-grid">
          <Field label={t.decisionDate}>{input("decisionDate", { type: "date" })}</Field>
          <Field label={t.payment}>{input("payment", { type: "number", min: 0, placeholder: "1500000" })}</Field>
          <Field label={t.withheld}>{input("withheld", { type: "number", min: 0, placeholder: "306300" })}</Field>
          <Field label={t.months}>{input("months", { type: "number", min: 1, max: 60, placeholder: "36" })}</Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>{t.agent}</legend>
        <p className="nenkin-help">{t.agentHelp}</p>
        <div className="nenkin-grid">
          <Field label={t.agentName}>{agentInput("name", { placeholder: "TRAN THI B" })}</Field>
          <Field label={t.agentKana}>{agentInput("kana", { placeholder: "チャン ティ ビー" })}</Field>
          <Field label={t.agentDob}>{agentInput("dob", { type: "date" })}</Field>
          <Field label={t.agentZip}>{agentInput("zip", { placeholder: "123-4567" })}</Field>
          <Field label={t.agentAddr}>{agentInput("addr", { placeholder: "東京都江戸川区○○町4-5-6" })}</Field>
          <Field label={t.agentPhone}>{agentInput("phone", { placeholder: "090-0000-0000" })}</Field>
          <Field label={t.agentJob}>{agentInput("job")}</Field>
          <Field label={t.relation}>
            <select value={d.agent.relation} onChange={setAgent("relation")}>
              {RELATIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>
          <Field label={t.bank}>{agentInput("bank")}</Field>
          <Field label={t.branch}>{agentInput("branch")}</Field>
          <Field label={t.account}>{agentInput("account", { inputMode: "numeric" })}</Field>
        </div>
      </fieldset>

      {calc && (
        <div className="nenkin-result">
          <strong>{t.result}</strong>
          <dl>
            <dt>{t.deduction}</dt>
            <dd>{yen(calc.deduction)}</dd>
            <dt>{t.taxOwed}</dt>
            <dd>{yen(calc.total)}</dd>
            <dt>{t.refund}</dt>
            <dd className="nenkin-refund">{yen(calc.refund)}</dd>
          </dl>
        </div>
      )}

      {showMissing && missing.length > 0 && (
        <p className="nenkin-missing">
          {t.missing}: {missing.length}
        </p>
      )}

      <div className="nenkin-actions">
        <button type="button" className="btn btn-primary" disabled={Boolean(busy)} onClick={() => download(false)}>
          {busy === "print" ? t.working : t.download}
        </button>
        <button type="button" className="btn btn-default" disabled={Boolean(busy)} onClick={() => download(true)}>
          {busy === "review" ? t.working : t.review}
        </button>
      </div>
      {error && <p className="nenkin-error">{error}</p>}
      <p className="nenkin-help">{t.note}</p>
    </div>
  );
}

export default NenkinTool;
