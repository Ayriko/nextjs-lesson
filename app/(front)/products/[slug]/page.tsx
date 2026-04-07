import { prisma } from "@/lib/prisma";
import ProductDetail from "@/app/domains/catalog/components/ProductDetail";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-screen-xl px-8 py-14">
      <ProductDetail slug={slug} />
    </div>
  );
}
