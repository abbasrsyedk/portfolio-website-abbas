import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const dir = path.join(process.cwd(), "public/images/photography");
  const files = fs.readdirSync(dir);

  const photos = files
    .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map((file) => `/images/photography/${file}`);

  return NextResponse.json(photos);
}
