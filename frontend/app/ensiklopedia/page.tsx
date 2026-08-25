import Link from "next/link"
import Image from "next/image"
import { client } from "@/lib/sanity.client"
import groq from "groq"
import { urlForImage } from "@/lib/sanity.image"
import Navbar from "@/components/Navbar"

// Interface Data
interface AksaraItem {
  name: string;
  origin: string;
  slug: string;
  visual: {
    asset: {
      url: string;
    };
  };
}

// Fetch Data
async function getAksara(): Promise<AksaraItem[]> {
  return client.fetch(groq`
    *[_type == "aksara"]{
      name,
      origin,
      "slug": slug.current,
      visual
    }
  `)
}

export default async function EnsiklopediaPage() {
  const aksaras = await getAksara()

  return (
    // Background: Cream Terang (#FDFBF7) - Konsisten
    <main className="relative min-h-screen bg-[#FDFBF7] text-[#2A1D15] selection:bg-[#D4AF37] selection:text-[#F9F7F2]">
      <Navbar />

      {/* Background Pattern Batik Halus */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />
      
      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          {/* Badge */}
          <span className="inline-block py-1.5 px-4 rounded-full border border-[#D4AF37] bg-[#F2ECE4] text-[#432818] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
            PUSTAKA DIGITAL
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#2A1D15]">
            Ensiklopedia Aksara
          </h1>
          
          <p className="text-[#543D2A] font-medium text-base md:text-lg leading-relaxed">
            Jelajahi ragam tulisan kuno Nusantara yang menjadi saksi bisu peradaban bangsa kita di masa lalu.
          </p>
        </div>

        {/* Grid Kartu Aksara */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aksaras.map((item: AksaraItem) => (
            <Link 
              href={`/ensiklopedia/${item.slug}`} 
              key={item.slug}
              className="group block bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-[#D4AF37]/10 hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full bg-[#F2ECE4] overflow-hidden border-b border-[#D4AF37]/10">
                {item.visual ? (
                  <Image
                    src={urlForImage(item.visual).url()}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#543D2A]/40 text-sm font-bold">
                    No Image
                  </div>
                )}
                
                {/* Overlay Emas saat Hover */}
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-500 mix-blend-overlay"></div>
              </div>

              {/* Text Content */}
              <div className="p-8 relative">
                {/* Dekorasi Garis Vertikal Kecil */}
                <div className="absolute top-8 left-0 w-1 h-12 bg-[#D4AF37] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <p className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase mb-3">
                  {item.origin}
                </p>
                
                <h2 className="font-serif text-2xl font-bold text-[#2A1D15] mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {item.name}
                </h2>
                
                {/* Link Text dengan Panah Animasi */}
                <div className="flex items-center text-[#543D2A] text-xs font-bold tracking-widest uppercase mt-4 group-hover:text-[#432818] transition-colors">
                  Pelajari Selengkapnya 
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300 text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}