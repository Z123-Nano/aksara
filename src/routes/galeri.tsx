import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExternalLink, ShieldCheck, ScrollText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSkeleton from "@/components/PageSkeleton";
import { prasastiListQueryOptions } from "@/lib/sanityQueries";
import { z } from "zod";

const SCRIPTS = [
  { value: "all", label: "Semua Aksara" },
  { value: "javanese", label: "Jawa" },
  { value: "sundanese", label: "Sunda" },
  { value: "balinese", label: "Bali" },
  { value: "makassar", label: "Makassar" },
] as const;

const gallerySearchSchema = z.object({
  scriptType: z.enum(["all", "javanese", "sundanese", "balinese", "makassar"]).optional(),
});

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri Prasasti Digital | Aksara Abadi" },
      {
        name: "description",
        content: "Galeri publik prasasti digital yang terinspirasi dari sistem tulisan Nusantara.",
      },
      { property: "og:title", content: "Galeri Prasasti Digital | Aksara Abadi" },
      {
        property: "og:description",
        content: "Lihat koleksi prasasti digital yang telah diabadikan pada blockchain.",
      },
    ],
  }),
  validateSearch: gallerySearchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(prasastiListQueryOptions),
  pendingMs: 100,
  pendingComponent: () => <PageSkeleton cards={6} />,
  errorComponent: ({ error }) => (
    <div role="alert" className="pt-40 text-center text-clay">
      {error.message}
    </div>
  ),
  component: GaleriPage,
});

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
}

function scriptLabel(value: string) {
  return SCRIPTS.find((s) => s.value === value)?.label ?? value;
}

function GaleriPage() {
  const { data: prasasti } = useSuspenseQuery(prasastiListQueryOptions);
  const { scriptType = "all" } = Route.useSearch();

  const items = scriptType === "all" ? prasasti : prasasti.filter((p) => p.scriptType === scriptType);

  return (
    <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
      <Navbar />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
            GALERI DIGITAL
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-ink">
            Galeri Prasasti Digital
          </h1>
          <p className="text-clay font-medium text-base md:text-lg leading-relaxed">
            Koleksi prasasti digital yang telah diabadikan pada blockchain Ethereum Sepolia testnet.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SCRIPTS.map((s) => {
            const active = scriptType === s.value;
            return (
              <Link
                key={s.value}
                to="/galeri"
                search={{ scriptType: s.value }}
                resetScroll={false}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  active
                    ? "bg-bark text-parchment border-bark shadow-md"
                    : "bg-white text-bronze border-sand-dark hover:border-gold hover:text-ink"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-gold/30 rounded-3xl bg-white/60 max-w-2xl mx-auto">
            <ScrollText className="w-10 h-10 mx-auto text-gold mb-4" />
            <p className="text-xl font-serif font-bold mb-2">Belum ada prasasti</p>
            <p className="text-sm text-clay mb-8">
              Jadilah yang pertama mengabadikan namamu dalam aksara Nusantara.
            </p>
            <Link
              to="/prasasti"
              className="inline-block px-8 py-4 bg-bark text-parchment rounded-md font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-ink transition-all"
            >
              Buat Prasasti
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <article
                key={item.txHash || index}
                className="group flex flex-col bg-white border border-gold/20 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="h-48 w-full bg-sand flex items-center justify-center p-6 border-b border-gold/10">
                  <p className="font-aksara text-3xl leading-relaxed text-ink text-center break-words">
                    {item.message}
                  </p>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="w-12 h-1 bg-gold mb-4" />
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">
                    {scriptLabel(item.scriptType)}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-ink mb-1">{item.name}</h2>
                  <p className="text-xs text-clay mb-6">{formatDate(item.timestamp)}</p>

                  <div className="mt-auto pt-4 border-t border-gold/20 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-moss-dark">
                      <ShieldCheck className="w-4 h-4" />
                      On-chain
                    </span>
                    {item.txUrl && (
                      <a
                        href={item.txUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-bronze hover:text-gold transition-colors"
                      >
                        Lihat Transaksi
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
