import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Aksara Abadi" },
      {
        name: "description",
        content:
          "Kenali tim dan misi di balik Aksara Abadi: melestarikan aksara Nusantara melalui teknologi digital dan blockchain.",
      },
      { property: "og:title", content: "Tentang Kami — Aksara Abadi" },
      {
        property: "og:description",
        content:
          "Kenali tim dan misi di balik Aksara Abadi: melestarikan aksara Nusantara melalui teknologi digital dan blockchain.",
      },
    ],
  }),
  component: TentangPage,
});

const TEAM = [
  {
    nama: "[Nama Anggota 1]",
    peran: "Project Lead & Frontend",
    bio: "[Deskripsi singkat anggota 1 — misalnya latar belakang, minat pada budaya, atau kontribusinya pada proyek ini.]",
    inisial: "A1",
  },
  {
    nama: "[Nama Anggota 2]",
    peran: "Backend & Data",
    bio: "[Deskripsi singkat anggota 2 — misalnya latar belakang, minat pada budaya, atau kontribusinya pada proyek ini.]",
    inisial: "A2",
  },
  {
    nama: "[Nama Anggota 3]",
    peran: "Riset Aksara & Konten",
    bio: "[Deskripsi singkat anggota 3 — misalnya latar belakang, minat pada budaya, atau kontribusinya pada proyek ini.]",
    inisial: "A3",
  },
];

const NILAI = [
  {
    ikon: "📜",
    judul: "Preservasi",
    deskripsi:
      "Mendokumentasikan aksara Nusantara agar tidak hilang ditelan zaman dan tetap bisa dipelajari generasi mendatang.",
  },
  {
    ikon: "🔗",
    judul: "Keabadian Digital",
    deskripsi:
      "Memanfaatkan teknologi blockchain agar warisan budaya tersimpan secara permanen dan tidak dapat dihapus.",
  },
  {
    ikon: "🌏",
    judul: "Akses Terbuka",
    deskripsi:
      "Membuat pengetahuan tentang aksara tradisional mudah diakses oleh siapa saja, di mana saja, secara gratis.",
  },
];

const STATISTIK = [
  { angka: "[3]+", label: "Aksara Terdokumentasi" },
  { angka: "[100]+", label: "Prasasti Dibuat" },
  { angka: "[2026]", label: "Tahun Berdiri" },
  { angka: "[3]", label: "Anggota Tim" },
];

function TentangPage() {
  return (
    <main className="bg-white selection:bg-[#D4AF37] selection:text-[#2A1D15]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-[#FDFBF7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] opacity-15 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <span className="inline-block py-1 px-4 mb-6 rounded-full border border-[#D4AF37]/50 text-[#8A6D2F] text-[10px] font-bold tracking-[0.3em] uppercase">
            Tentang Kami
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#2A1D15] mb-8 leading-tight">
            Menjaga Aksara,
            <br />
            <span className="text-[#D4AF37]">Merawat Peradaban</span>
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#543D2A]">
            Aksara Abadi lahir dari kegelisahan melihat aksara Nusantara yang perlahan terlupakan.
            Kami percaya teknologi modern bisa menjadi jembatan antara warisan masa lalu dan
            generasi masa depan.
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="py-24 bg-[#2A1D15] text-[#F9F7F2] relative overflow-hidden border-t border-[#D4AF37]/20">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 mb-4 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">
              Misi Kami
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Tiga Pilar Utama</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {NILAI.map((nilai) => (
              <div
                key={nilai.judul}
                className="bg-[#3A2818] border border-[#D4AF37]/20 rounded-xl p-8 hover:border-[#D4AF37]/60 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-6">{nilai.ikon}</div>
                <h3 className="font-serif text-xl font-bold mb-3 text-[#D4AF37]">{nilai.judul}</h3>
                <p className="text-[#F9F7F2]/70 font-light leading-relaxed text-sm">
                  {nilai.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-20 bg-[#F2ECE4] border-b border-[#E6D9C8]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            {STATISTIK.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl md:text-5xl font-bold text-[#432818] mb-2">
                  {stat.angka}
                </div>
                <div className="text-[#6D5236] text-xs font-bold tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
              Orang-Orang di Balik Layar
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#2A1D15] mb-4">Tim Kami</h2>
            <p className="text-[#543D2A] max-w-xl mx-auto">
              Tiga orang dengan satu tujuan: memastikan aksara Nusantara tetap hidup di era digital.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM.map((anggota) => (
              <div
                key={anggota.nama}
                className="group bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="h-56 bg-[#F2ECE4] flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-[#432818] border-2 border-[#D4AF37] flex items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                      {anggota.inisial}
                    </span>
                  </div>
                  <span className="absolute bottom-3 text-[10px] text-[#543D2A]/40 tracking-widest uppercase">
                    [Foto anggota]
                  </span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-[#2A1D15] group-hover:text-[#D4AF37] transition-colors">
                    {anggota.nama}
                  </h3>
                  <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mt-1 mb-4">
                    {anggota.peran}
                  </p>
                  <p className="text-[#543D2A] text-sm font-light leading-relaxed">
                    {anggota.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#432818] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-20" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#F9F7F2] mb-6">
            Ikut Melestarikan Bersama Kami
          </h2>
          <p className="max-w-2xl mx-auto text-[#F9F7F2]/80 text-lg mb-12 font-light leading-relaxed">
            Jelajahi ensiklopedia aksara, atau abadikan namamu dalam prasasti digital yang tak
            terhapuskan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ensiklopedia"
              className="border border-[#D4AF37] text-[#D4AF37] px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.15em] hover:bg-[#D4AF37] hover:text-[#2A1D15] transition-all"
            >
              Jelajahi Ensiklopedia
            </Link>
            <Link
              to="/prasasti"
              className="bg-[#D4AF37] text-[#2A1D15] px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-[0.15em] hover:bg-[#F9F7F2] hover:scale-105 transition-all shadow-xl"
            >
              Buat Prasasti
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
