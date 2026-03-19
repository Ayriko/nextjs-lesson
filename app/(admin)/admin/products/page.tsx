import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
        ← Retour
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Produits</h1>
      <p className="mt-1 text-zinc-500">{products.length} produits</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-300">Nom</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-300">Catégorie</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-300">Marque</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-300">Prix</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-300">Stock</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-300">SKU</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-zinc-500">{product.category}</td>
                <td className="px-4 py-3 text-zinc-500">{product.brand}</td>
                <td className="px-4 py-3">{product.price} {product.currency}</td>
                <td className="px-4 py-3">
                  {product.stock === 0 ? (
                    <span className="text-red-500">Rupture</span>
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{product.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}