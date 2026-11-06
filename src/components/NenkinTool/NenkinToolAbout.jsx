import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getLocalizedPath } from "../../i18n/config";

const GUIDE_PATH = "/huong-dan-tu-lam-nenkin-lan-2/";
const LAN1_PATH = "/huong-dan-tu-lam-nenkin-lan-1/";

// Explanatory text under the form: helps readers and gives the page real content beyond the form.
function NenkinToolAbout({ lang }) {
  const guide = getLocalizedPath(GUIDE_PATH, lang);
  const lan1 = getLocalizedPath(LAN1_PATH, lang);

  if (lang === "en") {
    return (
      <section className="nenkin-about">
        <h2>What is the second nenkin refund?</h2>
        <p>
          When Japan pays your pension lump-sum withdrawal payment (脱退一時金), it withholds <strong>20.42% income tax</strong> from the
          Employees' Pension (厚生年金) part. By filing a tax return under the 退職所得の選択課税 rules, you can get most or all of that tax
          back. Because you no longer live in Japan, the return is filed through a <strong>tax agent (納税管理人)</strong> who lives there,
          and the refund is paid into the agent's Japanese bank account.
        </p>
        <h2>How to use this tool</h2>
        <ol>
          <li>Take the amounts from your Notice of Entitlement (脱退一時金支給決定通知書), in the 厚生年金保険 box.</li>
          <li>Enter your details, the amounts and, if you have them, your tax agent's details and bank account.</li>
          <li>Check the estimated refund, then open the <strong>check copy</strong> to review every filled field.</li>
          <li>Print the version without highlights on A4 at 100%, and send it with the original notice and copies of your passport and residence card.</li>
        </ol>
        <h2>How the refund is calculated</h2>
        <p>
          The retirement income deduction is ¥400,000 per year of coverage (at least ¥800,000). If the payment is not more than the deduction,
          the whole withheld tax comes back. Otherwise, half of the amount above the deduction is taxed at 5% plus 2.1% reconstruction tax,
          and the rest of the withheld tax is refunded.
        </p>
        <h2>FAQ</h2>
        <p>
          <strong>Is my data stored?</strong> No. The PDF is created in your browser and nothing you type is sent to a server. Only the
          needed parts of the Noto Sans JP font are loaded from Google Fonts.
        </p>
        <p>
          <strong>Why is the G01 box yellow?</strong> The new form has no code dedicated to this return, so it is left for the tax office to
          confirm. See the <AutoLink to={guide}>field-by-field guide</AutoLink>.
        </p>
        <p>
          <strong>I haven't received the lump-sum payment yet.</strong> Claim it first: see the{" "}
          <AutoLink to={lan1}>lump-sum withdrawal claim guide</AutoLink>.
        </p>
        <div className="disclaimer">
          <strong>Disclaimer</strong>
          <ul>
            <li>Based on official documents from the Japan Pension Service (日本年金機構) and the National Tax Agency (国税庁), current as of November 6, 2026. Rules and forms may change.</li>
            <li>This tool only helps you fill in the forms. It is <strong>not tax or legal advice</strong>, and your situation may differ. Check the forms with the tax office (税務署) or a tax accountant (税理士) before you submit them.</li>
            <li>This blog is <strong>not affiliated</strong> with the Japan Pension Service or the National Tax Agency and <strong>accepts no liability</strong> for any loss arising from use of this tool.</li>
            <li>See also: <AutoLink to="/terms/">Terms of use</AutoLink>.</li>
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="nenkin-about">
      <h2>Nenkin lần 2 là gì?</h2>
      <p>
        Khi nhận nenkin lần 1 (脱退一時金), phần tiền 厚生年金 bị Nhật <strong>trừ 20.42% thuế thu nhập</strong>. Nenkin lần 2 là nộp tờ khai thuế
        theo chế độ 退職所得の選択課税 để lấy lại phần lớn hoặc toàn bộ khoản thuế đó. Vì bạn đã về nước, tờ khai được nộp qua một{" "}
        <strong>người đại diện thuế (納税管理人)</strong> đang sống ở Nhật, và tiền hoàn chuyển vào tài khoản ngân hàng Nhật của người đó.
      </p>
      <h2>Cách dùng công cụ</h2>
      <ol>
        <li>Lấy số tiền trên giấy thông báo 脱退一時金支給決定通知書, ở khung 厚生年金保険.</li>
        <li>Nhập thông tin của bạn, số tiền và (nếu có) thông tin, tài khoản của người đại diện.</li>
        <li>Xem số tiền được hoàn dự kiến, rồi mở <strong>bản kiểm tra</strong> để soát từng ô đã điền.</li>
        <li>In bản không tô màu (A4, tỷ lệ 100%), gửi kèm bản gốc giấy thông báo, bản sao hộ chiếu và thẻ cư trú.</li>
      </ol>
      <h2>Cách tính tiền được hoàn</h2>
      <p>
        Khấu trừ (退職所得控除額) là 400.000 yên cho mỗi năm đóng, tối thiểu 800.000 yên. Nếu số tiền nenkin không lớn hơn khấu trừ, bạn được hoàn
        toàn bộ thuế đã trừ. Nếu lớn hơn, một nửa phần vượt quá bị tính thuế 5% cộng 2,1% thuế tái thiết, phần thuế còn lại được hoàn.
      </p>
      <h2>Hỏi đáp</h2>
      <p>
        <strong>Thông tin của tôi có bị lưu không?</strong> Không. File PDF được tạo ngay trên trình duyệt, nội dung bạn nhập không gửi lên
        máy chủ nào. Chỉ phần font Noto Sans JP cần dùng được tải từ Google Fonts.
      </p>
      <p>
        <strong>Vì sao ô G01 tô vàng?</strong> Mẫu mới chưa có mã riêng cho loại tờ khai này, nên để trống chờ cục thuế xác nhận. Xem{" "}
        <AutoLink to={guide}>hướng dẫn chi tiết từng ô</AutoLink>.
      </p>
      <p>
        <strong>Tôi chưa nhận nenkin lần 1.</strong> Hãy làm lần 1 trước: xem{" "}
        <AutoLink to={lan1}>hướng dẫn tự làm nenkin lần 1</AutoLink>.
      </p>
      <div className="disclaimer">
        <strong>Lưu ý / Miễn trừ trách nhiệm</strong>
        <ul>
          <li>Dựa trên tài liệu chính thức của 日本年金機構 và 国税庁, cập nhật đến ngày 06/11/2026. Quy định và mẫu đơn có thể thay đổi.</li>
          <li>Công cụ chỉ hỗ trợ điền đơn, <strong>không phải tư vấn thuế hay pháp lý</strong>. Trường hợp của bạn có thể khác. Hãy kiểm tra lại với cục thuế (税務署) hoặc chuyên viên thuế (税理士) trước khi nộp.</li>
          <li>Blog <strong>không liên quan</strong> đến 日本年金機構 hay 国税庁 và <strong>không chịu trách nhiệm</strong> về thiệt hại phát sinh do sử dụng công cụ này.</li>
          <li>Xem thêm: <AutoLink to="/terms/">Điều khoản sử dụng</AutoLink>.</li>
        </ul>
      </div>
    </section>
  );
}

export default NenkinToolAbout;
