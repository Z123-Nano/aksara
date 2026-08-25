import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6D9C8] shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 bg-[#432818] shadow-md rounded-full overflow-hidden group-hover:rotate-6 transition-transform duration-300 border-2 border-[#D4AF37]">
            <img
              src="/logo.png"
              alt="Logo Aksara Abadi"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-[#2A1D15] tracking-tight leading-none">
              AKSARA<span className="text-[#D4AF37]">ABADI</span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest text-[#6D5236]">
          {[
            { to: "/ensiklopedia", label: "ENSIKLOPEDIA" },
            { to: "/prasasti", label: "BUAT PRASASTI" },
            { to: "/galeri", label: "GALERI" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-[#2A1D15] transition-colors relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <button className="hidden md:block px-8 py-3 bg-[#432818] text-[#F2ECE4] text-xs font-bold tracking-widest rounded-full hover:bg-[#D4AF37] hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md">
          CONNECT WALLET
        </button>
      </div>
    </nav>
  );
}
