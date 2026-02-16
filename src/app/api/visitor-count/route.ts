import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'visitor-count.json');

function readCount(): { count: number; lastUpdated: string } {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { count: 0, lastUpdated: '' };
  }
}

function writeCount(count: number) {
  const data = { count, lastUpdated: new Date().toISOString() };
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  return data;
}

// GET - Mevcut sayıyı döndür
export async function GET() {
  const data = readCount();
  return NextResponse.json(data);
}

// POST - Sayıyı 1 artır ve döndür
export async function POST() {
  const current = readCount();
  const newData = writeCount(current.count + 1);
  return NextResponse.json(newData);
}
