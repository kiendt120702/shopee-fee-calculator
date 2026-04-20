import * as XLSX from "xlsx";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import type { Category } from "../lib/types";

const SOURCE = resolve(
  __dirname,
  "../../CÔNG THỨC TÍNH GIÁ BÁN SHOPEE MALL + THƯỜNG.xlsx"
);

const OUT_DIR = resolve(__dirname, "../lib/data");

function readSheetAsRows(sheet: XLSX.WorkSheet): unknown[][] {
  return XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: null,
    raw: true,
  });
}

function parseMall(sheet: XLSX.WorkSheet): Category[] {
  const rows = readSheetAsRows(sheet);
  const out: Category[] = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const stt = r[0];
    const cap1 = r[1];
    const cap2 = r[2];
    const cap3 = r[3];
    const fee = r[5];
    if (typeof stt !== "number" || typeof cap1 !== "string" || typeof cap2 !== "string") continue;
    if (typeof fee !== "number") continue;
    out.push({
      stt,
      cap1: cap1.trim(),
      cap2: cap2.trim(),
      cap3: typeof cap3 === "string" && cap3.trim() ? cap3.trim() : null,
      phiCoDinh: fee,
    });
  }
  return out;
}

function parseThuong(sheet: XLSX.WorkSheet): Category[] {
  const rows = readSheetAsRows(sheet);
  const out: Category[] = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const stt = r[0];
    const cap1 = r[1];
    const cap2 = r[2];
    const cap3 = r[3];
    const fee = r[4];
    if (typeof stt !== "number" || typeof cap1 !== "string" || typeof cap2 !== "string") continue;
    if (typeof fee !== "number") continue;
    out.push({
      stt,
      cap1: cap1.trim(),
      cap2: cap2.trim(),
      cap3: typeof cap3 === "string" && cap3.trim() ? cap3.trim() : null,
      phiCoDinh: fee,
    });
  }
  return out;
}

function writeJson(file: string, data: unknown) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function main() {
  console.log(`Reading: ${SOURCE}`);
  const wb = XLSX.readFile(SOURCE);

  if (!wb.Sheets["DuLieuGoc"]) throw new Error("Missing sheet DuLieuGoc");
  if (!wb.Sheets["DuLieuGoc2"]) throw new Error("Missing sheet DuLieuGoc2");

  const mall = parseMall(wb.Sheets["DuLieuGoc"]);
  const thuong = parseThuong(wb.Sheets["DuLieuGoc2"]);

  console.log(`Mall: ${mall.length} categories`);
  console.log(`Thuong: ${thuong.length} categories`);

  if (mall.length < 100) throw new Error("Mall data too small, parse failed?");
  if (thuong.length < 100) throw new Error("Thuong data too small, parse failed?");

  writeJson(resolve(OUT_DIR, "categories-mall.json"), mall);
  writeJson(resolve(OUT_DIR, "categories-thuong.json"), thuong);

  console.log(`✓ Wrote ${OUT_DIR}/categories-mall.json`);
  console.log(`✓ Wrote ${OUT_DIR}/categories-thuong.json`);

  const sample = mall.find((c) => c.stt === 195);
  if (sample) console.log("Sanity STT 195 (Mall):", sample);
}

main();
