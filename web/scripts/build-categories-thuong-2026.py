#!/usr/bin/env python3
"""
Sinh lại categories-thuong.json từ bảng Phí Cố Định non-Mall mới (PDF 23/05/2026).

Quy trình:
  1. Đọc scripts/pdf-phi-thuong-2026.json (đã trích từ PDF)
  2. Gộp các dòng trùng key (cap1,cap2,cap3) — đã xác nhận cùng phí, không mâu thuẫn
  3. Đánh lại STT liên tục theo thứ tự xuất hiện
  4. Backup file cũ -> lib/data/categories-thuong.json.bak
  5. Ghi đè lib/data/categories-thuong.json (format Category giữ nguyên)

Usage: ~/.claude/skills/.venv/bin/python3 scripts/build-categories-thuong-2026.py
"""
import json
import re
import shutil
from pathlib import Path

BASE = Path(__file__).parent
PDF_JSON = BASE / "pdf-phi-thuong-2026.json"
OUT = BASE.parent / "lib" / "data" / "categories-thuong.json"
BAK = OUT.with_suffix(".json.bak")


def norm(s):
    return re.sub(r"\s+", " ", str(s)).strip().lower() if s else ""


def key(r):
    return (norm(r["cap1"]), norm(r["cap2"]), norm(r["cap3"]))


def main():
    pdf = json.loads(PDF_JSON.read_text(encoding="utf-8"))

    # Gộp key trùng — giữ dòng đầu tiên, cảnh báo nếu phí mâu thuẫn
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
        print(f"DỪNG: {len(conflicts)} key trùng có phí mâu thuẫn:")
        for k, a, b in conflicts[:10]:
            print(f"  {k} : {a*100}% vs {b*100}%")
        raise SystemExit(1)

    # Đánh lại STT liên tục theo thứ tự gốc trong PDF
    rows = list(merged.values())
    out = []
    for i, r in enumerate(rows, start=1):
        out.append({
            "stt": i,
            "cap1": r["cap1"],
            "cap2": r["cap2"] if r["cap2"] else "",
            "cap3": r["cap3"] if r["cap3"] else None,
            "phiCoDinh": r["phiCoDinh"],
        })

    # Backup
    if OUT.exists():
        shutil.copy2(OUT, BAK)
        print(f"Backup: {BAK.name}")

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Ghi {len(out)} ngành -> {OUT.name}")
    print(f"First: {json.dumps(out[0], ensure_ascii=False)}")
    print(f"Last : {json.dumps(out[-1], ensure_ascii=False)}")


if __name__ == "__main__":
    main()
