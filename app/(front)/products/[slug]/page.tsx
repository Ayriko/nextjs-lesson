import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductDetail from "@/app/domains/catalog/components/ProductDetail";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      category: true,
      brand: true,
      images: true,
    },
  });

  if (!product) {
    return {
      title: "Produit introuvable",
      robots: { index: false, follow: false },
    };
  }

  const images = product.images as string[];
  const firstImage = images?.[0] ?? null;

  return {
    // Le template du layout donne : "Nom du produit | Ma boutique trop bien"
    title: product.name,
    description: product.description,
    keywords: [product.brand, product.category, product.name, "acheter", "high-tech"],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      locale: "fr_FR",
      ...(firstImage && {
        images: [{ url: firstImage, alt: product.name }],
      }),
    },
  };
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
