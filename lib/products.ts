import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

/**
 * unstable_cache(fn, keyParts, options)
 *
 *  fn        — la fonction async à mettre en cache (doit être pure / sans args ici)
 *  keyParts  — clé de cache unique : Next.js s'en sert pour stocker/retrouver le résultat
 *  options   — tags  : permet revalidateTag("products") pour invalider
 *              revalidate : durée max en secondes (ici on invalide manuellement → pas de TTL)
 *
 * Comportement :
 *   1er appel → DB query, résultat mis en cache
 *   appels suivants → résultat retourné depuis le cache (0ms, pas de DB)
 *   après revalidateTag("products") → prochain appel re-exécute la fn et re-remplit le cache
 */
export const getProducts = unstable_cache(
  async () => {
    const start = performance.now();
    const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
    console.log(`[products] DB query ${(performance.now() - start).toFixed(0)}ms — ${products.length} produits`);
    return products;
  },
  ["products-list"],   // clé de cache
  { tags: ["products"] }
);
