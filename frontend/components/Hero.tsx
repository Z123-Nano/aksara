import Link from "next/link"
import Image from "next/image"
import { client } from "@/lib/sanity.client"
import { urlForImage } from "@/lib/sanity.image"

// LOGIKA BISNIS (TIDAK DIUBAH)
async function getHeroData() {
  const query = `*[_type == "homepage"][0]{
    title,
    subtitle,
    heroImage
  }`
  const data = await client.fetch(query)
  return data
}

export default async function Hero() {
  const data = await getHeroData()

  // Data Default
  const title = data?.title || "ABADIKAN WARISAN LELUHUR"
  const subtitle = data?.subtitle || "Konversi namamu ke Aksara Nusantara dan simpan selamanya di Blockchain."
  const imageUrl = data?.heroImage ? urlForImage(data.heroImage).url() : null

  return (
    // PERBAIKAN DISINI:
    // Sebelumnya: pt-32 (terlalu mepet). 
    // Sekarang: pt-40 (Mobile) dan lg:pt-48 (Desktop) agar turun jauh ke bawah.
    <section className="relative min-h-screen flex items-center bg-[#FDFBF7] overflow-hidden pt-40 pb-20 lg:pt-48">
      
      {/* Background Ornamen */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      {/* Container Layout */}
      <div className="container mx-auto px-8 lg:px-16 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* KOLOM KIRI: Teks & Tombol */}
        <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start lg:pl-4">
          
          {/* Badge */}
          <span className="inline-block py-1.5 px-4 rounded-full border border-[#D4AF37] bg-[#F2ECE4] text-[#432818] text-[11px] lg:text-xs font-bold tracking-[0.2em] mb-6">
            PRESERVASI BUDAYA WEB3
          </span>

          {/* Judul Utama */}
          <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-[1.1] text-[#2A1D15] tracking-tight mb-6">
            {title}
          </h1>

          {/* Subjudul */}
          <p className="text-[#432818] text-base lg:text-lg leading-relaxed max-w-lg font-medium mb-8">
            {subtitle}
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/prasasti" 
              className="px-8 py-4 bg-[#432818] text-[#F9F7F2] text-xs lg:text-sm font-bold tracking-widest uppercase rounded-md hover:bg-[#D4AF37] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Mulai Sekarang
            </Link>
            
            <Link 
              href="/ensiklopedia" 
              className="px-8 py-4 border-2 border-[#432818] text-[#432818] text-xs lg:text-sm font-bold tracking-widest uppercase rounded-md hover:bg-[#432818] hover:text-[#F9F7F2] transition-all duration-300 bg-transparent text-center"
            >
              Pelajari Aksara
            </Link>
          </div>
        </div>

        {/* KOLOM KANAN: Gambar */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center w-full">
          
          {/* CONTAINER LINGKARAN */}
          <div className="relative flex items-center justify-center w-[320px] h-[320px] lg:w-[480px] lg:h-[480px] bg-[#784f18] rounded-full shadow-2xl border-[6px] border-[#FDFBF7] ring-1 ring-[#D4AF37]/30">
            
            <div className="relative w-[70%] h-[70%]"> 
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt="Hero Illustration" 
                  fill
                  className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700 ease-in-out"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#F9F7F2]">
                  <p className="text-sm font-bold opacity-80">Menunggu Gambar</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}