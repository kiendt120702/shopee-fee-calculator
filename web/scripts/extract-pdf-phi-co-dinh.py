#!/usr/bin/env python3
"""
Trích bảng Phí Cố Định non-Mall (Shop Thường) từ PDF thông báo Shopee
(áp dụng từ 23/05/2026) thành JSON có cấu trúc.

Mỗi dòng: { stt, cap1, cap2, cap3, phiCoDinh }
  - phiCoDinh: số thập phân (vd 2.50% -> 0.025)
  - cap2 / cap3 rỗng -> null (giữ nhất quán với categories-thuong.json)

Output: scripts/pdf-phi-thuong-2026.json
Usage:  ~/.claude/skills/.venv/bin/python3 scripts/extract-pdf-phi-co-dinh.py <pdf_path>
"""
import json
import sys
import re
from pathlib import Path

import pdfplumber


def parse_percent(raw: str):
    """'2.50%' -> 0.025 ; '12.00%' -> 0.12. Trả None nếu không phải %."""
    if not raw:
        return None
    s = raw.strip().replace("%", "").replace(",", ".")
    try:
        return round(float(s) / 100, 6)
    except ValueError:
        return None


def clean(cell):
    if cell is None:
        return None
    txt = re.sub(r"\s+", " ", str(cell)).strip()
    return txt or None


def main():
    pdf_path = Path(sys.argv[1])
    out_path = Path(__file__).parent / "pdf-phi-thuong-2026.json"

    rows = []
    seen_stt = set()

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                for r in table:
                    if not r or len(r) < 5:
                        continue
                    stt_raw = clean(r[0])
                    # chỉ nhận dòng có STT là số
                    if not stt_raw or not stt_raw.isdigit():
                        continue
                    stt = int(stt_raw)
                    if stt in seen_stt:
                        continue
                    fee = parse_percent(clean(r[-1]))
                    if fee is None:
                        continue
                    seen_stt.add(stt)
                    rows.append({
                        "stt": stt,
                        "cap1": clean(r[1]),
                        "cap2": clean(r[2]),
                        "cap3": clean(r[3]),
                        "phiCoDinh": fee,
                    })

    rows.sort(key=lambda x: x["stt"])
    out_path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Extracted {len(rows)} rows -> {out_path}")
    if rows:
        print("First:", json.dumps(rows[0], ensure_ascii=False))
        print("Last :", json.dumps(rows[-1], ensure_ascii=False))
        # cảnh báo nếu STT không liên tục
        stts = [r["stt"] for r in rows]
        gaps = [i for i in range(1, max(stts) + 1) if i not in seen_stt]
        if gaps:
            print(f"WARNING: {len(gaps)} STT bị thiếu: {gaps[:20]}{'...' if len(gaps) > 20 else ''}")


if __name__ == "__main__":
    main()
