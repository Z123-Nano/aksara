import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    // Background di-set cream cerah (#FDFBF7) dengan border bawah tipis emas pudar
    <nav className="fixed top-0 w-full z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6D9C8] shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* === LOGO === */}
        <Link href="/" className="flex items-center gap-4 group">
          {/* Wadah Logo: Cokelat Tua (#432818) */}
          <div className="relative w-12 h-12 bg-[#432818] shadow-md rounded-full overflow-hidden group-hover:rotate-6 transition-transform duration-300 border-2 border-[#D4AF37]">
            <Image 
              src="/logo.png" 
              alt="Logo Aksara Abadi"
              fill
              className="object-contain p-2" 
              sizes="(max-width: 768px) 48px, 48px"
            />
          </div>
          
          <div className="flex flex-col">
            {/* Teks Logo: Cokelat Gelap (#2A1D15) & Emas (#D4AF37) */}
            <span className="font-serif text-2xl font-bold text-[#2A1D15] tracking-tight leading-none">
              AKSARA<span className="text-[#D4AF37]">ABADI</span>
            </span>
          </div>
        </Link>

        {/* === MENU DESKTOP === */}
        {/* Warna Teks Menu: Cokelat Medium (#6D5236) -> Hover jadi Hitam Kecoklatan */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest text-[#6D5236]">
          <Link href="/ensiklopedia" className="hover:text-[#2A1D15] transition-colors relative group py-2">
            ENSIKLOPEDIA
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/prasasti" className="hover:text-[#2A1D15] transition-colors relative group py-2">
            BUAT PRASASTI
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/galeri" className="hover:text-[#2A1D15] transition-colors relative group py-2">
            GALERI
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* === TOMBOL CONNECT === */}
        {/* Background Cokelat Tua (#432818) Teks Putih Kekuningan (#F2ECE4) */}
        <button className="hidden md:block px-8 py-3 bg-[#432818] text-[#F2ECE4] text-xs font-bold tracking-widest rounded-full hover:bg-[#D4AF37] hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md">
          CONNECT WALLET
        </button>
      </div>
    </nav>
  )
}