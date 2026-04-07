const ENDPOINT = "https://mock.shop/api";

export type MockShopProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: Array<{ url: string; altText: string | null }>;
};

async function gql<T>(query: string, options?: RequestInit): Promise<T> {
  const start = performance.now();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    ...options,
  });

  console.log(`[mock.shop] fetch ${(performance.now() - start).toFixed(0)}ms`);

  if (!res.ok) throw new Error(`mock.shop API error: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

function normalizeProduct(node: {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
}): MockShopProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    priceRange: node.priceRange,
    images: node.images.edges.map((e) => e.node),
  };
}

export async function getSponsoredProducts(count = 4): Promise<MockShopProduct[]> {
  const data = await gql<{
    products: { edges: Array<{ node: Parameters<typeof normalizeProduct>[0] }> };
  }>(
    `{
      products(first: ${count}) {
        edges {
          node {
            id title handle description
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }`,
    {
      // "force-cache"  → toujours depuis le cache (défaut Next.js)
      // "no-store"     → jamais de cache, toujours frais
      // next: { revalidate: 60 } → ISR : revalidation toutes les 60s
      // next: { tags: ["sponsored"] } → revalidation ciblée par tag
      next: { revalidate: 3600, tags: ["sponsored"] },
    }
  );

  return data.products.edges.map((e) => normalizeProduct(e.node));
}

export async function getSponsoredProduct(handle: string): Promise<MockShopProduct | null> {
  const data = await gql<{
    product: Parameters<typeof normalizeProduct>[0] | null;
  }>(
    `{
      product(handle: "${handle}") {
        id title handle description
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 6) { edges { node { url altText } } }
      }
    }`,
    {
      next: { revalidate: 3600, tags: ["sponsored"] },
    }
  );

  return data.product ? normalizeProduct(data.product) : null;
}
