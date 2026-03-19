"use client";

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
  const outOfStock = product.stock === 0;

  async function handleAddToCart() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
      }),
    });
    window.dispatchEvent(new Event("cart:updated"));
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={outOfStock}
      className="rounded-xl bg-zinc-900 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-zinc-900"
    >
      {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
    </button>
  );
}