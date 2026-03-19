import { prisma } from "@/lib/prisma";
import ProductCard from "@/app/domains/catalog/components/ProductCard";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-14 text-center">
        <h1 className="text-2xl font-semibold">Nos produits</h1>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              images: product.images as { main: string },
            }}
          />
        ))}
      </section>
    </div>
  );
}