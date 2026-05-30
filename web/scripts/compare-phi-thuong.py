#!/usr/bin/env python3
"""
So sánh phí mới (trích từ PDF) với categories-thuong.json hiện tại.
CHỈ BÁO CÁO — không ghi đè. Dùng để review trước khi cập nhật.

Map theo key (cap1, cap2, cap3) chuẩn hoá (lower + bỏ khoảng trắng thừa).

Usage: ~/.claude/skills/.venv/bin/python3 scripts/compare-phi-thuong.py
"""
import json
import re
from pathlib import Path

BASE = Path(__file__).parent
PDF_JSON = BASE / "pdf-phi-thuong-2026.json"
CUR_JSON = BASE.parent / "lib" / "data" / "categories-thuong.json"


def norm(s):
    if s is None:
        return ""
    return re.sub(r"\s+", " ", str(s)).strip().lower()


def key(row):
    return (norm(row.get("cap1")), norm(row.get("cap2")), norm(row.get("cap3")))


def main():
    pdf = json.loads(PDF_JSON.read_text(encoding="utf-8"))
    cur = json.loads(CUR_JSON.read_text(encoding="utf-8"))

    pdf_by_key = {}
    pdf_dups = 0
    for r in pdf:
        k = key(r)
        if k in pdf_by_key:
            pdf_dups += 1
        pdf_by_key[k] = r["phiCoDinh"]

    matched = 0
    changed = 0
    unchanged = 0
    not_found = []  # ngành trong JSON không tìm thấy trong PDF
    changes = []

    for c in cur:
        k = key(c)
        if k in pdf_by_key:
            matched += 1
            new_fee = pdf_by_key[k]
            old_fee = c["phiCoDinh"]
            if abs(new_fee - old_fee) > 1e-9:
                changed += 1
                changes.append((c, old_fee, new_fee))
            else:
                unchanged += 1
        else:
            not_found.append(c)

    # ngành trong PDF không có trong JSON
    cur_keys = {key(c) for c in cur}
    pdf_only = [r for r in pdf if key(r) not in cur_keys]

    print(f"=== TỔNG QUAN ===")
    print(f"JSON hiện tại  : {len(cur)} ngành")
    print(f"PDF trích được : {len(pdf)} dòng ({len(pdf_by_key)} key duy nhất, {pdf_dups} key trùng)")
    print(f"Khớp (matched) : {matched}")
    print(f"  - Đổi giá     : {changed}")
    print(f"  - Giữ nguyên  : {unchanged}")
    print(f"Không tìm thấy trong PDF (giữ nguyên giá cũ): {len(not_found)}")
    print(f"Chỉ có trong PDF (ngành mới, không map được) : {len(pdf_only)}")

    print(f"\n=== 25 NGÀNH ĐỔI GIÁ (mẫu) ===")
    for c, o, n in changes[:25]:
        path = " > ".join(x for x in [c['cap1'], c['cap2'], c['cap3']] if x)
        print(f"  {o*100:5.2f}% -> {n*100:5.2f}%  | {path}")

    if not_found:
        print(f"\n=== 25 NGÀNH JSON KHÔNG KHỚP PDF (mẫu) ===")
        for c in not_found[:25]:
            path = " > ".join(x for x in [c['cap1'], c['cap2'], c['cap3']] if x)
            print(f"  giữ {c['phiCoDinh']*100:.2f}%  | {path}")

    if pdf_only:
        print(f"\n=== 25 NGÀNH CHỈ CÓ TRONG PDF (mẫu) ===")
        for r in pdf_only[:25]:
            path = " > ".join(x for x in [r['cap1'], r['cap2'], r['cap3']] if x)
            print(f"  {r['phiCoDinh']*100:.2f}%  | {path}")


if __name__ == "__main__":
    main()
