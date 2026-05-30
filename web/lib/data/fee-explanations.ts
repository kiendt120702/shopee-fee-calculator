/**
 * Nội dung giải thích các loại phí Shopee (trang /cac-loai-phi).
 *
 * ====== CÁCH THÊM / SỬA ======
 * Mỗi loại phí là 1 object trong mảng FEE_EXPLANATIONS.
 *   - id:        slug duy nhất (dùng cho anchor #id trên trang)
 *   - name:      tên loại phí
 *   - summary:   1 câu định nghĩa ngắn
 *   - formula:   công thức (tuỳ chọn) — hiển thị nổi bật trong khung
 *   - paragraphs: các đoạn giải thích (mảng string, mỗi phần tử 1 đoạn)
 *   - notes:     các gạch đầu dòng lưu ý (tuỳ chọn)
 *   - sourceUrl: link tài liệu gốc Shopee (tuỳ chọn)
 */

export interface FeeExplanation {
  /** Slug duy nhất, dùng làm anchor #id */
  id: string;
  /** Tên loại phí */
  name: string;
  /** Mức phí ngắn gọn hiển thị ở hàng accordion (tuỳ chọn), vd "4.91%", "2.700đ/đơn" */
  badge?: string;
  /** Định nghĩa ngắn 1 câu */
  summary: string;
  /** Công thức tính (tuỳ chọn) */
  formula?: string;
  /** Ghi chú nhỏ dưới công thức (tuỳ chọn), vd cách tính Giá trị sản phẩm */
  formulaNote?: string;
  /** Các đoạn giải thích chi tiết */
  paragraphs: string[];
  /** Các lưu ý dạng gạch đầu dòng (tuỳ chọn) */
  notes?: string[];
  /**
   * Bảng phí vi phạm (tuỳ chọn) — dùng cho phí phạt theo nhóm lý do vi phạm.
   * Mỗi nhóm có nhiều dòng (chi tiết vi phạm + mức phí). Cột nhóm tự gộp dòng.
   */
  violationGroups?: ViolationGroup[];
  /** Tiêu đề cột mức phí của bảng vi phạm (mặc định "Phí dịch vụ từng lần phát sinh") */
  violationFeeHeader?: string;
  /** Link tài liệu gốc Shopee (tuỳ chọn) */
  sourceUrl?: string;
}

/** Một nhóm lý do vi phạm với các dòng chi tiết */
export interface ViolationGroup {
  /** Tên nhóm lý do vi phạm (cột trái, gộp dòng) */
  group: string;
  /** Các dòng: mô tả vi phạm + mức phí */
  rows: { detail: string; fee: string }[];
}

/** Danh sách giải thích phí — thêm mục mới vào mảng này. */
export const FEE_EXPLANATIONS: FeeExplanation[] = [
  {
    id: "phi-co-dinh",
    name: "Phí Cố Định",
    badge: "2 – 17,7%",
    summary:
      "Phí hoa hồng cố định áp dụng cho mọi giao dịch bán hàng thành công qua sàn Shopee, tính theo ngành hàng.",
    formula:
      "Phí Cố Định = Giá trị sản phẩm (*) × Tỷ lệ phần trăm phí cố định theo ngành hàng (đã bao gồm thuế GTGT)",
    formulaNote:
      "(*) Giá trị sản phẩm = Giá sản phẩm trước Shopee trợ giá − Khuyến mãi Người bán đã áp dụng",
    paragraphs: [
      "Là phí hoa hồng cố định áp dụng cho tất cả các giao dịch bán sản phẩm, sử dụng dịch vụ của Người bán được thực hiện thành công qua sàn giao dịch thương mại điện tử Shopee (đơn hàng nằm ở mục “Đã giao”) hoặc đơn hàng có phát sinh yêu cầu Trả hàng/Hoàn tiền được Người bán/Shopee chấp nhận “Hoàn tiền ngay” (trừ lý do Chưa nhận được hàng).",
    ],
    notes: [
      "Phí Cố Định (đã bao gồm thuế GTGT) sẽ được tính trên giá trị mỗi sản phẩm theo biểu phí từng ngành hàng.",
      "Phí Cố Định áp dụng cho các đơn hàng giao thành công (mục “Đã giao”) hoặc đơn có phát sinh yêu cầu Trả hàng/Hoàn tiền được chấp nhận “Hoàn tiền ngay” (trừ lý do Chưa nhận được hàng).",
      "Phí Cố Định được cấn trừ trực tiếp trên từng đơn hàng trước khi Khoản Tiền Thanh Toán từ Người Mua được chuyển vào Số dư TK Shopee của Người Bán.",
    ],
  },
  {
    id: "phi-xu-ly-giao-dich",
    name: "Phí Xử Lý Giao Dịch",
    badge: "6%",
    summary:
      "Phí hỗ trợ vận hành và nâng cao chất lượng hệ thống giao dịch (trước đây gọi là Phí Thanh Toán).",
    formula:
      "Phí Xử Lý Giao Dịch = (Giá sản phẩm trước Shopee trợ giá + Phí vận chuyển Người mua trả − Khuyến mãi Người bán đã áp dụng − Khuyến mãi từ Ngân hàng) × 6%",
    formulaNote:
      "Đã bao gồm thuế GTGT, chưa bao gồm Phí Cố Định, các loại thuế và chi phí khác.",
    paragraphs: [
      "Bắt đầu từ ngày 24/04/2026, Shopee cập nhật tên “Phí Thanh Toán” thành “Phí Xử Lý Giao Dịch” nhằm phù hợp với tên dịch vụ trên Hóa đơn tài chính mà Shopee phát hành cho Người bán.",
      "Phí Xử Lý Giao Dịch là phí hỗ trợ vận hành và nâng cao chất lượng hệ thống giao dịch, bao gồm nhưng không giới hạn các hoạt động như: xử lý thanh toán, đối soát, v.v.",
      "Mức phí 6% áp dụng cho mọi phương thức thanh toán (thẻ tín dụng/ghi nợ, COD, chuyển khoản, ATM nội địa, SPayLater, Apple Pay, Google Pay, ShopeePay…). Thời gian áp dụng: từ 01/05/2026 cho Người bán không thuộc Shopee Mall, từ 08/05/2026 cho Người bán thuộc Shopee Mall (trước đó là 4.91%).",
    ],
    notes: [
      "Áp dụng cho tất cả Người bán trên Shopee, tính cho mỗi đơn hàng thành công (mục “Đã giao”) hoặc đơn có yêu cầu Trả hàng/Hoàn tiền được chấp nhận “Hoàn tiền ngay” (trừ lý do Chưa nhận được hàng).",
      "Được cấn trừ trực tiếp trên từng đơn hàng trước khi Khoản Tiền Thanh Toán từ Người mua được chuyển vào Số dư TK Shopee của Người bán.",
    ],
  },
  {
    id: "phi-vi-pham-shopee-mall",
    name: "Phí dịch vụ từng lần phát sinh (Shopee Mall vi phạm)",
    badge: "Theo vi phạm",
    summary:
      "Phí áp dụng cho Người bán Shopee Mall khi vi phạm quy định, tính theo từng lần phát sinh.",
    paragraphs: [
      "Để đảm bảo trải nghiệm cho khách hàng, Shopee áp dụng chính sách phí dịch vụ từng lần phát sinh khi Người bán Shopee Mall vi phạm quy định, với mức phí (đã bao gồm thuế GTGT) theo từng nhóm lý do vi phạm như bảng dưới đây.",
    ],
    violationFeeHeader: "Phí dịch vụ từng lần phát sinh (đã gồm thuế GTGT)",
    violationGroups: [
      {
        group: "Đơn hủy lỗi do Shop",
        rows: [
          {
            detail: "Hủy đơn do hết hàng hoặc không xác nhận đơn hàng",
            fee: "196.360đ/đơn hàng",
          },
          { detail: "Hủy đơn do để sai giá", fee: "490.910đ/đơn hàng" },
        ],
      },
      {
        group: "Vi phạm quy định về sản phẩm",
        rows: [
          {
            detail: "Gửi hàng không phải là hàng chính hãng",
            fee: "9.818.180đ hoặc 100% giá bán ra của sản phẩm, tùy giá trị nào cao hơn cho mỗi sản phẩm",
          },
          {
            detail: "Gửi hàng hóa bị cấm / hạn chế giao dịch",
            fee: "981.820đ/hàng hóa",
          },
          {
            detail:
              "Tăng giá hoặc giảm số lượng sản phẩm khi đang tham gia chương trình khuyến mãi",
            fee: "490.910đ/đơn hàng bị hủy",
          },
        ],
      },
      {
        group: "Hành vi gian lận",
        rows: [
          {
            detail: "Tự đặt hàng của chính mình để gian lận",
            fee: "9.818.180đ/đơn hàng",
          },
          { detail: "Đóng gói sai quy cách", fee: "196.360đ/đơn hàng" },
        ],
      },
    ],
  },
];
