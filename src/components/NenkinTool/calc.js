// Tax maths and date helpers for the nenkin lump-sum tax refund (退職所得の選択課税).

const ERAS = [
  { code: 5, name: "令和", start: new Date(2019, 4, 1) },
  { code: 4, name: "平成", start: new Date(1989, 0, 8) },
  { code: 3, name: "昭和", start: new Date(1926, 11, 25) },
];

// "1995-07-08" -> { code: 4, name: "平成", year: 7, month: 7, day: 8 }
export function toWareki(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  const era = ERAS.find((e) => date >= e.start);
  if (!era) return null;
  return { code: era.code, name: era.name, year: y - era.start.getFullYear() + 1, month: m, day: d };
}

export function retirementDeduction(months) {
  const years = Math.max(1, Math.ceil(months / 12));
  const deduction = years <= 20 ? Math.max(800000, 400000 * years) : 8000000 + 700000 * (years - 20);
  return { years, deduction };
}

// 速算表 for income tax on 課税退職所得金額
const BRACKETS = [
  [1950000, 0.05, 0],
  [3300000, 0.1, 97500],
  [6950000, 0.2, 427500],
  [9000000, 0.23, 636000],
  [18000000, 0.33, 1536000],
  [40000000, 0.4, 2796000],
  [Infinity, 0.45, 4796000],
];

export function incomeTax(taxable) {
  const [, rate, minus] = BRACKETS.find(([limit]) => taxable < limit);
  return Math.floor(taxable * rate - minus);
}

export function calcRefund({ payment, withheld, months }) {
  const { years, deduction } = retirementDeduction(months);
  const excess = Math.max(0, payment - deduction);
  // 短期退職手当等 (≤ 5 years): only the part above 3,000,000 is taxed without halving
  const income = years <= 5 && excess > 3000000 ? 1500000 + (excess - 3000000) : Math.floor(excess / 2);
  const taxable = Math.floor(income / 1000) * 1000;
  const tax = taxable > 0 ? incomeTax(taxable) : 0;
  const reconstruction = Math.floor(tax * 0.021);
  const total = tax + reconstruction;
  return { years, deduction, income, taxable, tax, reconstruction, total, refund: withheld - total };
}
