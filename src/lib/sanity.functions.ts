import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sanityFetch } from "@/lib/sanity";
import { SANITY_QUERIES } from "@/lib/sanityGroq";

const inputSchema = z.object({
  key: z.enum(["home", "aksaraList", "aksaraDetail", "prasastiList"]),
  params: z.record(z.string(), z.string()).optional(),
});

/**
 * Proxies read-only Sanity queries through the server so the browser never
 * calls the Sanity API directly (which is blocked by CORS on client navigation).
 */
export const runSanityQuery = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    return sanityFetch<unknown>(SANITY_QUERIES[data.key], data.params ?? {});
  });
