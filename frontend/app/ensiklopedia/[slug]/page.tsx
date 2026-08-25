import { client } from "@/lib/sanity.client"
import groq from "groq"
import { urlForImage } from "@/lib/sanity.image"
import { PortableText } from "@portabletext/react"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"

// Fungsi Fetch Data berdasarkan Slug
async function getDetailAksara(slug: string) {
  return client.fetch(groq`
    *[_type == "aksara" && slug.current == $slug][0]{
      name,
      origin,
      visual, 
      description,
      content,
      "audio": pronunciation.asset->url
    }
  `, { slug })
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DetailAksaraPage({ params }: Props) {
  const { slug } = await params
  const data = await getDetailAksara(slug)

  // JIKA DATA TIDAK DITEMUKAN
  if (!data) return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A1D15]">
        <Navbar />
        <div className="container mx-auto px-6 pt-40 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Data tidak ditemukan</h1>
            <p className="mb-8 text-[#543D2A]">Aksara yang Anda cari mungkin belum didokumentasikan.</p>
            <Link href="/ensiklopedia" className="text-[#D4AF37] hover:text-[#432818] font-bold tracking-widest uppercase transition-colors">
                ← Kembali ke Daftar
            </Link>
        </div>
    </div>
  )

  // TAMPILAN UTAMA
  return (
    // Background: Cream Terang (#FDFBF7)
    <main className="relative min-h-screen bg-[#FDFBF7] text-[#2A1D15] selection:bg-[#D4AF37] selection:text-[#F9F7F2]">
      <Navbar />

      {/* Background Pattern Batik Halus */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20 max-w-4xl relative z-10">
        
        {/* Breadcrumb / Navigasi Balik */}
        <Link href="/ensiklopedia" className="inline-flex items-center text-[#543D2A] hover:text-[#D4AF37] mb-12 transition-colors text-xs font-bold tracking-[0.2em] uppercase group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform text-lg">←</span> KEMBALI KE DAFTAR
        </Link>

        {/* HEADER SECTION: Gambar & Judul */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-16 border-b border-[#D4AF37]/20 pb-16">
           
           {/* Gambar Kiri */}
           <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-white ring-1 ring-[#D4AF37]/20 rotate-1 hover:rotate-0 transition-transform duration-500">
              {data.visual ? (
                 <Image 
                   src={urlForImage(data.visual).url()} 
                   alt={data.name} 
                   fill 
                   className="object-cover"
                 />
              ) : (
                 <div className="w-full h-full flex items-center justify-center bg-[#F2ECE4] text-[#543D2A]/50 font-bold">
                    No Image
                 </div>
              )}
           </div>

           {/* Info Kanan */}
           <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
              
              {/* Badge Origin */}
              <span className="inline-block py-1.5 px-4 rounded-full border border-[#D4AF37] bg-[#F2ECE4] text-[#432818] text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
                {data.origin}
              </span>

              {/* Judul Aksara */}
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#2A1D15] mb-8 leading-tight">
                {data.name}
              </h1>
              
              {/* Audio Player (Custom Style Container) */}
              {data.audio && (
                <div className="w-full bg-white p-6 rounded-xl border border-[#D4AF37]/20 shadow-sm flex flex-col gap-2">
                   <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🔊</span>
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Dengarkan Pelafalan</p>
                   </div>
                   <audio controls src={data.audio} className="w-full h-8 accent-[#D4AF37]" />
                </div>
              )}
           </div>
        </div>

        {/* CONTENT SECTION: Portable Text */}
        {/* Menggunakan Tailwind Typography (prose) yang dikustomisasi warnanya */}
        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#2A1D15] prose-p:text-[#543D2A] prose-a:text-[#D4AF37] prose-strong:text-[#432818] prose-blockquote:border-[#D4AF37] prose-blockquote:bg-[#F2ECE4]/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-li:text-[#543D2A] max-w-none">
           
           {/* Deskripsi Singkat */}
           {data.description && (
             <div className="text-xl md:text-2xl font-serif text-[#432818] leading-relaxed mb-12">
                <PortableText value={data.description} />
             </div>
           )}

           {/* Separator Elegan */}
           <div className="w-24 h-1 bg-[#D4AF37] mb-12 opacity-50"></div>

           {/* Konten Detail */}
           {data.content && <PortableText value={data.content} />}
        </div>

      </div>
    </main>
  )
}