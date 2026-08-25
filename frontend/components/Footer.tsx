import Link from 'next/link'

export default function Footer() {
  return (
    // Background: Cokelat Sangat Gelap (#2A1D15)
    // Border Top: Emas (#D4AF37) tebal 4px
    <footer className="relative bg-[#2A1D15] text-[#F9F7F2] py-16 border-t-4 border-[#D4AF37] overflow-hidden">
      
      {/* Background Pattern (Batik Halus - Opacity 3%) */}
      <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="text-2xl font-serif font-bold tracking-wide">
              AKSARA<span className="text-[#D4AF37]">ABADI</span>
            </h4>
            <p className="text-sm mt-3 text-[#F9F7F2]/60 max-w-xs font-light leading-relaxed">
              Menjaga warisan luhur Nusantara tetap abadi di era digital melalui teknologi Blockchain.
            </p>
          </div>

          {/* Navigation Links */}
          {/* Hover effect: Berubah jadi Emas */}
          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
            <Link href="/ensiklopedia" className="hover:text-[#D4AF37] hover:underline decoration-[#D4AF37] underline-offset-4 transition-all duration-300">
              Ensiklopedia
            </Link>
            <Link href="/prasasti" className="hover:text-[#D4AF37] hover:underline decoration-[#D4AF37] underline-offset-4 transition-all duration-300">
              Prasasti
            </Link>
            <Link href="/galeri" className="hover:text-[#D4AF37] hover:underline decoration-[#D4AF37] underline-offset-4 transition-all duration-300">
              Galeri
            </Link>
          </div>

          {/* Copyright & Info */}
          <div className="text-center md:text-right">
            <p className="text-sm font-medium">&copy; {new Date().getFullYear()} Aksara Abadi.</p>
            <p className="text-[10px] mt-1 text-[#F9F7F2]/40 tracking-wider uppercase">
              Preservasi Budaya Web3
            </p>
          </div>
          
        </div>

        {/* Garis Pemisah Tipis di Bawah */}
        <div className="mt-12 pt-8 border-t border-[#F9F7F2]/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#F9F7F2]/30 font-mono">
            <span>Powered by Ethereum & Sanity.io</span>
            <span className="mt-2 md:mt-0">Ver 1.0.0 Alpha</span>
        </div>

      </div>
    </footer>
  )
}