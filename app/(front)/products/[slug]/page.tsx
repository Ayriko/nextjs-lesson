import { prisma } from "@/lib/prisma";
import ProductDetail from "@/app/domains/catalog/components/ProductDetail";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <ProductDetail slug={slug} />
    </div>
  );
}