import { queryOptions } from "@tanstack/react-query";
import { sanityFetch } from "@/lib/sanity";
import { SANITY_QUERIES, type SanityQueryKey } from "@/lib/sanityGroq";
import { runSanityQuery } from "@/lib/sanity.functions";
import type { HeroData } from "@/components/Hero";

const STALE_TIME = 5 * 60 * 1000;

export interface AksaraItem {
  name: string;
  origin: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: any;
}

export interface GaleriItem {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export interface HomeData {
  home: (HeroData & { aboutTitle?: string; aboutContent?: string }) | null;
  aksara: AksaraItem[];
  galeri: GaleriItem[];
}

export interface AksaraDetail {
  name: string;
  origin: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  audio?: string;
}

export interface PrasastiItem {
  name: string;
  message: string;
  scriptType: string;
  txHash: string;
  txUrl: string;
  timestamp: string;
}

async function query<T>(key: SanityQueryKey, params?: Record<string, string>): Promise<T> {
  if (typeof window === "undefined") {
    return sanityFetch<T>(SANITY_QUERIES[key], params ?? {});
  }
  return (await runSanityQuery({ data: { key, ...(params ? { params } : {}) } })) as T;
}

export const homeQueryOptions = queryOptions({
  queryKey: ["sanity", "home"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<HomeData> => {
    const data = await query<HomeData>("home");
    return { home: data?.home ?? null, aksara: data?.aksara ?? [], galeri: data?.galeri ?? [] };
  },
});

export const aksaraListQueryOptions = queryOptions({
  queryKey: ["sanity", "aksara-list"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<AksaraItem[]> => (await query<AksaraItem[]>("aksaraList")) ?? [],
});

export const aksaraDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "aksara", slug],
    staleTime: STALE_TIME,
    queryFn: () => query<AksaraDetail | null>("aksaraDetail", { slug }),
  });

export const prasastiListQueryOptions = queryOptions({
  queryKey: ["sanity", "prasasti-list"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<PrasastiItem[]> =>
    (await query<PrasastiItem[]>("prasastiList")) ?? [],
});

export interface SanityCounts {
  aksara: number;
  prasasti: number;
}

export const countsQueryOptions = queryOptions({
  queryKey: ["sanity", "counts"],
  staleTime: STALE_TIME,
  queryFn: async (): Promise<SanityCounts> => {
    const data = (await query<SanityCounts | null>("counts")) ?? null;
    return { aksara: data?.aksara ?? 0, prasasti: data?.prasasti ?? 0 };
  },
});
