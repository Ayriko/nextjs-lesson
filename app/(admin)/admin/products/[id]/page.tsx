import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/admin/products"
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          transition: "color 0.2s",
        }}
        className="hover:text-[var(--text)]"
      >
        ← Retour aux produits
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "2rem",
          fontWeight: 400,
          color: "var(--text)",
          marginTop: "1.5rem",
        }}
      >
        Modifier — <em>{product.name}</em>
      </h1>
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginTop: "0.25rem",
        }}
      >
        SKU : {product.sku}
      </p>

      <EditProductForm
        id={product.id}
        defaultValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          brand: product.brand,
        }}
      />
    </div>
  );
}
