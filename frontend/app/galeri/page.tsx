import Image from "next/image";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { urlForImage } from "@/lib/sanity.image";
import Navbar from "@/components/Navbar";

// Agar data selalu update saat upload foto baru
export const dynamic = 'force-dynamic';

interface GalleryItem {
  title: string;
  caption: string;
  image: {
    asset: {
      url: string;
    };
  };
}

async function getGaleri(): Promise<GalleryItem[]> {
  return client.fetch(groq`
    *[_type == "galeri"]{
      title,
      caption,
      image
    }
  `);
}

export default async function GaleriPage() {
  const galeri = await getGaleri();

  return (
    // Background: Cream Terang (#FDFBF7) - Konsisten
    <main className="relative min-h-screen bg-[#FDFBF7] text-[#2A1D15] selection:bg-[#D4AF37] selection:text-[#F9F7F2]">
      <Navbar />

      {/* Background Pattern (Batik Halus) */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {/* Badge Style Baru */}
          <span className="inline-block py-1.5 px-4 rounded-full border border-[#D4AF37] bg-[#F2ECE4] text-[#432818] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
            VISUALISASI BUDAYA
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#2A1D15]">
            Galeri Warisan
          </h1>
          
          <p className="text-[#543D2A] font-medium text-base md:text-lg leading-relaxed">
            Kumpulan dokumentasi naskah kuno, artefak, dan kegiatan pelestarian budaya yang kami abadikan untuk generasi mendatang.
          </p>
        </div>

        {/* Grid Galeri */}
        {galeri.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galeri.map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                {/* Gambar */}
                <div className="relative h-72 w-full overflow-hidden bg-[#F2ECE4]">
                  {item.image ? (
                    <Image
                      src={urlForImage(item.image).url()}
                      alt={item.title || "Foto Galeri"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#543D2A]/40 text-sm font-bold">
                      No Image
                    </div>
                  )}
                  
                  {/* Overlay Gradient saat Hover (Biar teks putih kalau mau ditaruh diatas gambar, tapi disini estetik aja) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D15]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Konten Teks */}
                <div className="p-8 relative">
                  {/* Hiasan Garis Emas (Animasi Memanjang saat Hover) */}
                  <div className="w-12 h-1 bg-[#D4AF37] mb-4 group-hover:w-full transition-all duration-500 ease-in-out"></div>
                  
                  <h3 className="font-serif text-2xl font-bold text-[#2A1D15] mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.caption && (
                    <p className="text-sm text-[#543D2A]/80 line-clamp-3 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tampilan Jika Data Kosong */
          <div className="text-center py-24 border-2 border-dashed border-[#D4AF37]/30 rounded-3xl bg-white/50 backdrop-blur-sm">
            <div className="text-4xl mb-4">📷</div>
            <p className="text-[#2A1D15] text-xl font-serif font-bold mb-2">Belum ada foto di galeri</p>
            <p className="text-sm text-[#543D2A]">Silakan upload foto di Sanity Studio (Backend)</p>
          </div>
        )}
      </div>
    </main>
  );
}