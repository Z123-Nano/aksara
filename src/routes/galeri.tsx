import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch, urlForImage } from "@/lib/sanity";

interface GalleryItem {
  title: string;
  caption?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri Warisan Budaya Nusantara | Aksara Abadi" },
      {
        name: "description",
        content:
          "Dokumentasi visual naskah kuno, artefak, dan kegiatan pelestarian aksara Nusantara.",
      },
      { property: "og:title", content: "Galeri Warisan | Aksara Abadi" },
      {
        property: "og:description",
        content: "Kumpulan dokumentasi naskah kuno dan artefak budaya Nusantara.",
      },
    ],
  }),
  loader: async () => {
    const data = await sanityFetch<GalleryItem[]>(`*[_type == "galeri"]{ title, caption, image }`);
    return data ?? [];
  },
  component: GaleriPage,
});

function GaleriPage() {
  const galeri = Route.useLoaderData();

  return (
    <main className="relative min-h-screen bg-cream text-ink selection:bg-gold selection:text-parchment">
      <Navbar />
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-ramp.png')] bg-repeat mix-blend-multiply" />

      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full border border-gold bg-sand text-bark text-[10px] md:text-xs font-bold tracking-[0.2em] mb-4">
            VISUALISASI BUDAYA
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-ink">
            Galeri Warisan
          </h1>
          <p className="text-clay font-medium text-base md:text-lg leading-relaxed">
            Kumpulan dokumentasi naskah kuno, artefak, dan kegiatan pelestarian budaya yang kami
            abadikan untuk generasi mendatang.
          </p>
        </div>

        {galeri.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galeri.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gold/20 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="relative h-72 w-full overflow-hidden bg-sand">
                  {item.image ? (
                    <img
                      src={urlForImage(item.image).url()}
                      alt={item.title || "Foto Galeri"}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-clay/40 text-sm font-bold">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-8 relative">
                  <div className="w-12 h-1 bg-gold mb-4 group-hover:w-full transition-all duration-500 ease-in-out"></div>
                  <h3 className="font-serif text-2xl font-bold text-ink mb-3 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-sm text-clay/80 line-clamp-3 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border-2 border-dashed border-gold/30 rounded-3xl bg-white/50 backdrop-blur-sm">
            <div className="text-4xl mb-4">📷</div>
            <p className="text-ink text-xl font-serif font-bold mb-2">Belum ada foto di galeri</p>
            <p className="text-sm text-clay">Silakan upload foto di Sanity Studio (Backend)</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
