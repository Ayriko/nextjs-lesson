import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductImageGallery from "@/app/domains/catalog/components/ProductImageGallery";
import AddToCartButton from "@/app/domains/catalog/components/AddToCartButton";

export const dynamic = 'force-dynamic'

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

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

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const images = product.images as { main: string; gallery: string[] };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
        ← Retour aux produits
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-zinc-500">{product.category}</p>
      <ProductImageGallery images={images} alt={product.name} />
      <p className="mt-6 text-zinc-700 dark:text-zinc-300">{product.description}</p>
      <div className="mt-4 flex items-center gap-6">
        <p className="text-xl font-bold">{product.price} {product.currency}</p>
        <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, currency: product.currency, stock: product.stock }} />
      </div>
    </div>
  );
}
