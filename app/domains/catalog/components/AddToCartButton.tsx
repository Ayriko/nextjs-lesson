"use client";

import { useCart } from "@/app/contexts/CartContext";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    stock: number;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const outOfStock = product.stock === 0;

  return (
    <button
      onClick={() => addItem(product)}
      disabled={outOfStock}
      className="rounded-xl bg-zinc-900 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-zinc-900"
    >
      {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
    </button>
  );
}