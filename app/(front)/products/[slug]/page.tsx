import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

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

  const images = product.images as { main: string };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
        ← Retour aux produits
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-zinc-500">{product.category}</p>
      <div className="relative mt-6 h-96 w-full">
        <Image
          src={images.main}
          alt={product.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <p className="mt-6 text-zinc-700 dark:text-zinc-300">{product.description}</p>
      <div className="mt-4 flex items-center gap-6">
        <p className="text-xl font-bold">{product.price} {product.currency}</p>
        <button className="rounded-xl bg-zinc-900 px-6 py-2 text-white dark:bg-white dark:text-zinc-900">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
