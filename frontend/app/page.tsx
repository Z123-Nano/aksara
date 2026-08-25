import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { urlForImage } from "@/lib/sanity.image";

export const dynamic = 'force-dynamic';

// --- 1. DEFINISI TIPE DATA (INTERFACE) ---
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

interface GaleriItem {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
}

interface HomeContent {
  aboutTitle?: string;
  aboutContent?: string;
}

// --- 2. FETCH DATA ---
async function getHomepageData(): Promise<{
  home: HomeContent;
  aksara: AksaraItem[];
  galeri: GaleriItem[];
}> {
  const query = groq`{
    "home": *[_type == "homepage"][0],
    "aksara": *[_type == "aksara"][0...3]{ name, origin, "slug": slug.current, visual },
    "galeri": *[_type == "galeri"][0...3]{ title, image }
  }`;
  
  return client.fetch(query);
}

export default async function Home() {
  const { home, aksara, galeri } = await getHomepageData();

  return (
    // Base Background: Putih/Cream
    <main className="bg-white selection:bg-[#D4AF37] selection:text-[#2A1D15]">
      <Navbar />
      
      {/* 1. HERO SECTION (Komponen yang sudah kita update sebelumnya) */}
      <Hero /> 

      {/* 2. ABOUT SECTION */}
      {/* Menggunakan warna Cokelat Gelap (#2A1D15) agar kontras dengan Hero */}
      <section className="py-24 bg-[#2A1D15] text-[#F9F7F2] relative overflow-hidden border-t border-[#D4AF37]/20">
         
         {/* Background Pattern Batik Halus */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat" />
         
         <div className="container mx-auto px-6 lg:px-8 text-center relative z-10 max-w-4xl">
            {/* Badge Emas */}
            <span className="inline-block py-1 px-4 mb-6 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">
                Misi Preservasi
            </span>

            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight">
              {home?.aboutTitle || "Tentang Aksara Abadi"}
            </h2>
            
            <p className="text-lg md:text-xl font-light leading-relaxed text-[#F9F7F2]/80">
              {home?.aboutContent || "Kami hadir untuk melestarikan aksara nusantara melalui teknologi modern. Menggabungkan kekayaan budaya masa lalu dengan keabadian teknologi Blockchain."}
            </p>
         </div>
      </section>

      {/* 3. ENSIKLOPEDIA PREVIEW */}
      <section className="py-24 bg-[#FDFBF7] text-[#2A1D15]">
        <div className="container mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold mb-4 text-[#2A1D15]">Jelajahi Aksara</h2>
              <p className="text-[#543D2A] text-lg">Kenali ragam tulisan dari berbagai penjuru nusantara yang mulai terlupakan.</p>
            </div>
            <Link href="/ensiklopedia" className="hidden md:inline-flex px-6 py-3 border border-[#432818] rounded-md text-[#432818] font-bold text-sm tracking-widest hover:bg-[#432818] hover:text-[#F9F7F2] transition-all duration-300 uppercase">
              Lihat Semua Aksara
            </Link>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aksara?.map((item: AksaraItem) => (
              <Link href={`/ensiklopedia/${item.slug}`} key={item.slug} className="group block">
                {/* Image Card */}
                <div className="relative h-72 bg-[#F2ECE4] rounded-xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 border border-[#D4AF37]/20">
                  {item.visual ? (
                    <Image 
                      src={urlForImage(item.visual).url()} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#543D2A]/40">No Image</div>
                  )}
                  
                  {/* Badge Origin */}
                  <div className="absolute top-4 left-4 bg-[#F9F7F2]/90 backdrop-blur border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#432818]">
                    {item.origin}
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-serif text-2xl font-bold text-[#2A1D15] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    {item.name}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-lg">→</span>
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/ensiklopedia" className="inline-block px-8 py-4 bg-[#432818] text-[#F9F7F2] rounded-md font-bold text-xs uppercase tracking-widest">
              Lihat Semua Aksara
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRASASTI CALL TO ACTION */}
      {/* Background Cokelat Medium (#432818) */}
      <section className="py-24 bg-[#432818] relative overflow-hidden">
        {/* Dekorasi Circle */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-20"></div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
           {/* Icon Container */}
           <div className="w-20 h-20 bg-[#2A1D15] rounded-full flex items-center justify-center text-4xl mb-8 border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
             ✍️
           </div>
           
           <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#F9F7F2] mb-6">
             Abadikan Namamu
           </h2>
           
           <p className="max-w-2xl text-[#F9F7F2]/80 text-lg md:text-xl mb-12 font-light leading-relaxed">
             Gunakan teknologi Blockchain untuk menyimpan namamu dalam bentuk Aksara Jawa. 
             Jadilah bagian dari sejarah digital yang tak terhapuskan.
           </p>
           
           <Link href="/prasasti" className="bg-[#D4AF37] text-[#2A1D15] px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.15em] hover:bg-[#F9F7F2] hover:scale-105 transition-all shadow-xl">
             Buat Prasasti Sekarang
           </Link>
        </div>
      </section>

      {/* 5. GALERI PREVIEW */}
      {/* Background Putih Bersih */}
      <section className="py-24 bg-white text-[#2A1D15]">
         <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
               <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Dokumentasi</span>
               <h2 className="font-serif text-4xl font-bold mb-4">Galeri Visual</h2>
               <p className="text-[#543D2A] max-w-xl mx-auto">
                 Artefak budaya dan kegiatan pelestarian yang kami kumpulkan.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {galeri?.map((item: GaleriItem, idx: number) => (
                 <div key={idx} className="relative h-72 md:h-96 rounded-lg overflow-hidden group cursor-pointer">
                    {item.image && (
                      <Image 
                        src={urlForImage(item.image).url()} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 filter grayscale group-hover:grayscale-0"
                      />
                    )}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D15] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="h-1 w-12 bg-[#D4AF37] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                        <h3 className="text-[#F9F7F2] font-serif font-bold text-xl leading-snug">
                          {item.title}
                        </h3>
                    </div>
                 </div>
               ))}
            </div>

            <div className="text-center mt-16">
               <Link href="/galeri" className="inline-block border-b border-[#2A1D15] pb-1 text-[#2A1D15] text-sm font-bold tracking-widest hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                 LIHAT GALERI LENGKAP
               </Link>
            </div>
         </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />
    </main>
  );
}