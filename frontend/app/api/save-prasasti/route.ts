import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

// Client Khusus dengan Izin Tulis (Editor)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Menggunakan token rahasia
  apiVersion: "2024-01-01",
  useCdn: false, 
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, signature } = body;

    // Validasi data
    if (!name || !signature) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    // Simpan ke Sanity
    const result = await writeClient.create({
      _type: "prasasti",
      name,
      message,
      signature,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Sukses disimpan", id: result._id }, { status: 200 });
  } catch (error) {
    console.error("Sanity Write Error:", error);
    return NextResponse.json({ message: "Gagal menyimpan data" }, { status: 500 });
  }
}