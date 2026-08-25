import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="relative bg-[#2A1D15] text-[#F9F7F2] py-16 border-t-4 border-[#D4AF37] overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="text-2xl font-serif font-bold tracking-wide">
              AKSARA<span className="text-[#D4AF37]">ABADI</span>
            </h4>
            <p className="text-sm mt-3 text-[#F9F7F2]/60 max-w-xs font-light leading-relaxed">
              Menjaga warisan luhur Nusantara tetap abadi di era digital melalui teknologi
              Blockchain.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
            {[
              { to: "/ensiklopedia", label: "Ensiklopedia" },
              { to: "/prasasti", label: "Prasasti" },
              { to: "/galeri", label: "Galeri" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-[#D4AF37] hover:underline decoration-[#D4AF37] underline-offset-4 transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm font-medium">&copy; {new Date().getFullYear()} Aksara Abadi.</p>
            <p className="text-xs mt-2 text-[#F9F7F2]/50">Dibangun untuk pelestarian budaya.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
