#!/usr/bin/env python3
"""
Sinh lại categories-mall.json từ bảng Phí Cố Định Shopee Mall mới (PDF 29/05/2026).

PDF Mall có cột trống làm pdfplumber tách lệch text ở nhóm ngành "Phương tiện"
-> sửa các chuỗi lỗi cố định trước khi ghi.

Usage: ~/.claude/skills/.venv/bin/python3 scripts/build-categories-mall-2026.py
"""
import json
import re
import shutil
from pathlib import Path

BASE = Path(__file__).parent
PDF_JSON = BASE / "pdf-phi-mall-2026.json"
OUT = BASE.parent / "lib" / "data" / "categories-mall.json"
BAK = OUT.with_suffix(".json.bak")

# Map text bị pdfplumber tách lệch -> text đúng (nhóm ngành Phương tiện)
FIX = {
    "Phụ tùng và Phụ kiện cho Phươ": "Phụ tùng và Phụ kiện cho Phương tiện",
    "nPgh tụiệ nkiện xe máy": "Phụ kiện xe máy",
    "nPgh tụiệ nkiện ngoại thất ô tô": "Phụ kiện ngoại thất ô tô",
    "nPgh tụiệ nkiện nội thất ô tô": "Phụ kiện nội thất ô tô",
    "nPgh tụiệ ntùng xe máy": "Phụ tùng xe máy",
    "nPgh tụiệ ntùng ô tô": "Phụ tùng ô tô",
}


def fix(v):
    return FIX.get(v, v) if v else v


def norm(s):
    return re.sub(r"\s+", " ", str(s)).strip().lower() if s else ""


def key(r):
    return (norm(r["cap1"]), norm(r["cap2"]), norm(r["cap3"]))


def main():
    pdf = json.loads(PDF_JSON.read_text(encoding="utf-8"))

    # Sửa text lỗi
    for r in pdf:
        r["cap1"] = fix(r["cap1"])
        r["cap2"] = fix(r["cap2"])
        r["cap3"] = fix(r["cap3"])

    # Gộp key trùng (cùng phí)
    merged = {}
    conflicts = []
    for r in pdf:
        k = key(r)
        if k in merged:
            if abs(merged[k]["phiCoDinh"] - r["phiCoDinh"]) > 1e-9:
                conflicts.append((k, merged[k]["phiCoDinh"], r["phiCoDinh"]))
            continue
        merged[k] = r

    if conflicts:
        print(f"DỪNG: {len(conflicts)} key trùng phí mâu thuẫn:")
        for k, a, b in conflicts[:10]:
            print(f"  {k} : {a*100}% vs {b*100}%")
        raise SystemExit(1)

    rows = list(merged.values())
    out = [
        {
            "stt": i,
            "cap1": r["cap1"],
            "cap2": r["cap2"] if r["cap2"] else "",
            "cap3": r["cap3"] if r["cap3"] else None,
            "phiCoDinh": r["phiCoDinh"],
        }
        for i, r in enumerate(rows, start=1)
    ]

    # Kiểm tra còn text lỗi sót không
    leftover = [o for o in out if "Phươ" == o["cap1"][-4:] or "nPgh" in (o["cap2"] or "")]
    if leftover:
        print(f"CẢNH BÁO: còn {len(leftover)} dòng text lỗi chưa sửa:")
        for o in leftover[:5]:
            print("  ", o["cap1"], "|", o["cap2"])

    if OUT.exists():
        shutil.copy2(OUT, BAK)
        print(f"Backup: {BAK.name}")

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Ghi {len(out)} ngành Mall -> {OUT.name}")
    print(f"First: {json.dumps(out[0], ensure_ascii=False)}")
    print(f"Last : {json.dumps(out[-1], ensure_ascii=False)}")


if __name__ == "__main__":
    main()
