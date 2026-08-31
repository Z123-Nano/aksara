/**
 * Named GROQ queries. Both the SSR loader and the browser (via the
 * `runSanityQuery` server function) reference queries by key, so no raw GROQ
 * ever crosses the network from the client.
 */
export const SANITY_QUERIES = {
  home: `{
  "home": *[_type == "homepage"][0],
  "aksara": *[_type == "aksara"][0...3]{ name, origin, "slug": slug.current, visual },
  "galeri": *[_type == "galeri"][0...3]{ title, image }
}`,
  aksaraList: `*[_type == "aksara"]{ name, origin, "slug": slug.current, visual }`,
  aksaraDetail: `*[_type == "aksara" && slug.current == $slug][0]{
    name, origin, visual, description, content, "audio": pronunciation.asset->url
  }`,
  prasastiList: `*[_type == "prasasti"] { name, message, scriptType, txHash, txUrl, timestamp } | order(timestamp desc)`,
} as const;

export type SanityQueryKey = keyof typeof SANITY_QUERIES;
