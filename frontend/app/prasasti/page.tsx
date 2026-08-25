import Navbar from "@/components/Navbar";
import PrasastiForm from "@/components/PrasastiForm"; // Import Form Canggih Kita

export default function PrasastiPage() {
  return (
    // Background: Cream Terang (#FDFBF7) - Konsisten dengan Hero
    <main className="relative min-h-screen bg-[#FDFBF7] text-[#2A1D15] selection:bg-[#D4AF37] selection:text-[#F9F7F2] overflow-hidden">
      
      {/* Navbar (Pastikan Navbar Anda support background terang atau transparan) */}
      <Navbar />
      
      {/* Background Pattern (Batik Halus - Sama seperti Hero) */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Header Halaman */}
        <div className="text-center mb-12">
            
            {/* Badge Kecil */}
            <span className="inline-block py-1.5 px-4 rounded-full border border-[#D4AF37] bg-[#F2ECE4] text-[#432818] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
              WEB3 IMMUTABLE STORAGE
            </span>
            
            {/* Judul Utama */}
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#2A1D15]">
              Buat Prasasti Digital
            </h1>
            
            {/* Deskripsi - Warna Cokelat Medium (#543D2A) agar terbaca jelas */}
            <p className="text-[#543D2A] font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Abadikan namamu dalam bentuk <span className="text-[#432818] font-bold decoration-[#D4AF37] underline decoration-2 underline-offset-4">Aksara Nusantara</span>. 
              Data transliterasi ini akan ditandatangani secara kriptografis dan siap disimpan di jaringan Blockchain.
            </p>
        </div>

        {/* Komponen Form Utama */}
        {/* Animasi smooth saat halaman dimuat */}
        <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
            <PrasastiForm />
        </div>
        
        {/* Footer Note */}
        <div className="text-center mt-12 text-[#432818]/50 text-xs md:text-sm font-mono tracking-wide">
          <p>Didukung oleh Teknologi Ethereum Blockchain (Testnet)</p>
        </div>

      </div>
    </main>
  );
}