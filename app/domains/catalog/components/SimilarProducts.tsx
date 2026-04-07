import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";

type Props = {
  category: string;
  excludeId: string;
};

export default async function SimilarProducts({ category, excludeId }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const similarProducts = await prisma.product.findMany({
    where: {
      category,
      NOT: { id: excludeId },
    },
    take: 4,
  });

  if (similarProducts.length === 0) return null;

  return (
    <section>
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.62rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "2rem",
        }}
      >
        Dans la même catégorie
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((similar) => (
          <ProductCard
            key={similar.id}
            product={{
              ...similar,
              images: similar.images as { main: string },
            }}
          />
        ))}
      </div>
    </section>
  );
}