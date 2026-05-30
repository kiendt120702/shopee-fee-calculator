/**
 * Metadata về dữ liệu phí — ngày biểu phí được cập nhật mới nhất.
 *
 * Khi cập nhật lại biểu phí (chạy lại script convert/build), đổi ngày bên dưới
 * cho khớp ngày hiệu lực của bảng phí Shopee mới nhất.
 */

/** Ngày biểu phí cố định mới nhất đang áp dụng (YYYY-MM-DD) */
export const FEE_DATA_UPDATED = "2026-05-29";

/** Định dạng ngày YYYY-MM-DD -> "29/05/2026" */
export function formatDataDate(iso: string = FEE_DATA_UPDATED): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}
