/**
 * Dữ liệu thông báo cập nhật / thay đổi của sàn Shopee.
 *
 * ====== CÁCH THÊM THÔNG BÁO MỚI ======
 * Thêm 1 object vào ĐẦU mảng `SHOPEE_UPDATES` (mới nhất nằm trên cùng).
 * Trang /updates tự sắp theo ngày giảm dần nên thứ tự khai báo không bắt buộc,
 * nhưng để dễ đọc nên giữ tin mới ở trên.
 *
 * Ví dụ:
 *   {
 *     id: "2026-06-01-tang-phi-thanh-toan",   // duy nhất, dạng ngày-slug
 *     date: "2026-06-01",                       // YYYY-MM-DD
 *     title: "Tăng phí thanh toán lên 5%",
 *     category: "phi",                          // xem UPDATE_CATEGORIES bên dưới
 *     description: "Mô tả chi tiết thay đổi...", // có thể nhiều dòng
 *     sourceUrl: "https://...",                 // (tuỳ chọn) link thông báo gốc Shopee
 *     important: true,                          // (tuỳ chọn) đánh dấu nổi bật
 *   }
 * Sau khi thêm, commit & deploy lại là tin hiển thị.
 */

export type UpdateCategory =
  | "phi" // Thay đổi phí
  | "chinh-sach" // Thay đổi chính sách
  | "voucher" // Khuyến mãi / voucher
  | "van-chuyen" // Vận chuyển
  | "khac"; // Khác

/**
 * Một dòng so sánh "trước → sau" trong bảng thay đổi.
 * Ví dụ: { label: "Phí Voucher Xtra", before: "4%", after: "5.5%" }
 */
export interface ComparisonRow {
  /** Tên hạng mục (cột trái) */
  label: string;
  /** Giá trị trước thay đổi */
  before: string;
  /** Giá trị sau thay đổi */
  after: string;
}

export interface ShopeeUpdate {
  /** ID duy nhất, dạng `YYYY-MM-DD-slug` */
  id: string;
  /** Ngày áp dụng / công bố, định dạng `YYYY-MM-DD` */
  date: string;
  /** Tiêu đề ngắn gọn */
  title: string;
  /** Loại thay đổi */
  category: UpdateCategory;
  /** Mô tả chi tiết (hỗ trợ nhiều đoạn, ngăn cách bằng `\n`) */
  description: string;
  /**
   * Bảng so sánh trước/sau (tuỳ chọn). Nếu có sẽ hiển thị dạng bảng.
   * Tiêu đề 2 cột mặc định là "Trước" / "Từ {ngày}", có thể tự đặt qua
   * `comparisonLabels`.
   */
  comparison?: ComparisonRow[];
  /** Nhãn 2 cột của bảng so sánh (tuỳ chọn) */
  comparisonLabels?: { before: string; after: string };
  /** Link thông báo gốc trên Shopee (tuỳ chọn) */
  sourceUrl?: string;
  /**
   * Link nội bộ "Chi tiết" (tuỳ chọn) — vd "/bang-phi?mode=mall".
   * Hiển thị nút điều hướng trong web (mở cùng tab) thay vì link ra ngoài.
   */
  detailHref?: string;
  /** Nhãn cho nút chi tiết (mặc định "Xem chi tiết") */
  detailLabel?: string;
  /** Đánh dấu thông báo quan trọng / nổi bật (tuỳ chọn) */
  important?: boolean;
}

/** Nhãn + màu hiển thị cho từng loại thay đổi */
export const UPDATE_CATEGORIES: Record<
  UpdateCategory,
  { label: string; badgeClass: string }
> = {
  phi: {
    label: "Thay đổi phí",
    badgeClass:
      "bg-[oklch(0.95_0.06_25)] text-[oklch(0.45_0.18_25)] border-[oklch(0.85_0.1_25)]",
  },
  "chinh-sach": {
    label: "Chính sách",
    badgeClass:
      "bg-[oklch(0.95_0.06_240)] text-[oklch(0.45_0.15_240)] border-[oklch(0.85_0.1_240)]",
  },
  voucher: {
    label: "Voucher / KM",
    badgeClass:
      "bg-[oklch(0.95_0.06_300)] text-[oklch(0.45_0.15_300)] border-[oklch(0.85_0.1_300)]",
  },
  "van-chuyen": {
    label: "Vận chuyển",
    badgeClass:
      "bg-[oklch(0.95_0.06_145)] text-[oklch(0.4_0.15_145)] border-[oklch(0.85_0.1_145)]",
  },
  khac: {
    label: "Khác",
    badgeClass:
      "bg-muted text-muted-foreground border-border",
  },
};

/**
 * Danh sách thông báo. Tin mới thêm vào đầu mảng.
 * (Dưới đây là 1 mục mẫu — thay bằng dữ liệu thật do bạn cung cấp.)
 */
export const SHOPEE_UPDATES: ShopeeUpdate[] = [
  {
    id: "2026-05-29-phi-co-dinh-shopee-mall",
    date: "2026-05-29",
    title: "Cập nhật Phí Cố Định cho Người bán Shopee Mall",
    category: "phi",
    description:
      "Từ ngày 29/05/2026, Shopee cập nhật Phí Cố Định dành cho Người bán Shopee Mall, với mức phí mới theo từng ngành hàng. Phí Cố Định (đã bao gồm thuế GTGT) được tính trên giá trị mỗi sản phẩm theo biểu phí từng ngành hàng.\nCông cụ Tính Phí Shopee của Betacom đã cập nhật toàn bộ biểu phí cố định mới cho Shopee Mall theo bảng phí 29/05/2026. Bạn chọn đúng ngành hàng trong công cụ để tính ra mức phí áp dụng.",
    detailHref: "/bang-phi?mode=mall",
    detailLabel: "Xem bảng phí Shopee Mall",
    important: true,
  },
  {
    id: "2026-05-23-phi-co-dinh-shop-thuong",
    date: "2026-05-23",
    title: "Cập nhật Phí Cố Định cho Người bán không thuộc Shopee Mall (Shop Thường)",
    category: "phi",
    description:
      "Từ ngày 23/05/2026, Shopee cập nhật Phí Cố Định dành cho Người bán không thuộc Shopee Mall, với mức phí mới theo từng ngành hàng. Phí Cố Định (đã bao gồm thuế GTGT) được tính trên giá trị mỗi sản phẩm theo biểu phí từng ngành hàng.\nCông cụ Tính Phí Shopee của Betacom đã cập nhật toàn bộ biểu phí cố định mới cho Shop Thường (hơn 1.400 ngành hàng) theo bảng phí 23/05/2026. Bạn chọn đúng ngành hàng trong công cụ để tính ra mức phí áp dụng.",
    detailHref: "/bang-phi?mode=thuong",
    detailLabel: "Xem bảng phí Shop Thường",
    important: true,
  },
  {
    id: "2026-05-29-tam-hoan-duy-tri-hien-thi",
    date: "2026-05-29",
    title: "Tạm hoãn Chương trình Duy Trì Hiển Thị",
    category: "chinh-sach",
    description:
      "Theo thông báo trước đây, Chương trình Duy Trì Hiển Thị với cơ chế nạp tiền tự động cho Dịch vụ Hiển thị (DVHT) dự kiến sẽ có hiệu lực từ ngày 29/05/2026.\nNhằm bảo đảm quá trình triển khai được thực hiện đồng bộ và hiệu quả, Shopee sẽ dành thêm thời gian để tiếp tục rà soát và hoàn thiện cơ chế áp dụng Chương trình Duy Trì Hiển Thị từ Nạp Tiền Tự Động trích từ Doanh Thu Đơn Hàng.\nTheo đó, Chương trình sẽ được tạm hoãn cho đến khi có thông báo mới.",
    important: false,
  },
  {
    id: "2026-05-23-phi-piship-2700",
    date: "2026-05-23",
    title: "Tăng Phí Dịch vụ PiShip — Gói Tiết Kiệm Vận Chuyển từ 1.620đ lên 2.700đ/đơn",
    category: "van-chuyen",
    description:
      "Từ ngày 23/05/2026, Shopee điều chỉnh Phí Dịch vụ PiShip (Gói Tiết Kiệm Vận Chuyển) dành cho Người bán có tham gia.",
    comparisonLabels: { before: "Trước 23/05/2026", after: "Từ 23/05/2026" },
    comparison: [
      {
        label: "Phí Dịch vụ PiShip (đã gồm thuế GTGT)",
        before: "1.620đ/đơn",
        after: "2.700đ/đơn",
      },
    ],
    important: true,
  },
  {
    id: "2026-05-23-chinh-sach-dong-tai-tro-ma-uu-dai",
    date: "2026-05-23",
    title: "Cập nhật Chính sách Đồng Tài Trợ Mã ưu đãi",
    category: "chinh-sach",
    description:
      "Từ ngày 23/05/2026, Shopee cập nhật Chính sách Đồng Tài Trợ Mã ưu đãi dành cho Người bán, thay đổi tỷ lệ chia sẻ giữa Shopee và Người bán.\nGiá trị Mã ưu đãi Đồng Tài Trợ của Người bán = 40% x Giá trị Mã ưu đãi thuộc Chính sách Đồng Tài Trợ (tối đa 50.000đ/sản phẩm). Giá trị Mã ưu đãi Đồng Tài Trợ còn lại sẽ do Shopee chi trả.",
    comparisonLabels: { before: "Trước 23/05/2026", after: "Từ 23/05/2026" },
    comparison: [
      { label: "Shopee", before: "70%", after: "60%" },
      { label: "Người bán", before: "30%", after: "40%" },
    ],
    important: true,
  },
  {
    id: "2026-05-23-phi-voucher-xtra-5-5",
    date: "2026-05-23",
    title: "Tăng phí Dịch vụ Gói Voucher Xtra từ 4% lên 5.5%",
    category: "phi",
    description:
      "Từ ngày 23/05/2026, Shopee cập nhật Phí Dịch vụ Gói Voucher Xtra dành cho Người bán có tham gia, áp dụng cho tất cả các ngành hàng.",
    comparisonLabels: { before: "Trước 23/05/2026", after: "Từ 23/05/2026" },
    comparison: [
      {
        label: "Phí Dịch vụ Gói Voucher Xtra (đã gồm thuế GTGT)",
        before: "4% giá trị mỗi sản phẩm\n(tối đa 50.000đ/sản phẩm)\nTất cả các ngành hàng",
        after: "5.5% giá trị mỗi sản phẩm\n(tối đa 50.000đ/sản phẩm)\nTất cả các ngành hàng",
      },
      {
        label: "Cách thức tính Phí Dịch vụ",
        before:
          "Tính trên các đơn giao thành công hoặc có yêu cầu Trả hàng/Hoàn tiền được chấp nhận hoàn tiền ngay (trừ lý do Chưa nhận được hàng).",
        after:
          "Tính trên các đơn giao thành công hoặc có yêu cầu Trả hàng/Hoàn tiền được chấp nhận hoàn tiền ngay (trừ lý do Chưa nhận được hàng).",
      },
    ],
    important: true,
  },
];
