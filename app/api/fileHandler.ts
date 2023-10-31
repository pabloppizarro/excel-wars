"use server";
import { readFileSync } from "fs";
import { read, utils, readFile } from "xlsx";
export default async function handleFile(file: any) {
  const rs = readFileSync(file);
  const wd = read(rs);
  var data = utils.sheet_to_json(wd, { header: 1 });
  return data;
}
