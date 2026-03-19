"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
};

export default function CartIcon() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function fetchCart() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    fetchCart();
    window.addEventListener("cart:updated", fetchCart);
    return () => window.removeEventListener("cart:updated", fetchCart);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function removeItem(productId: string) {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)} className="relative cursor-pointer">
        <span className="text-xl">🛒</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white dark:bg-white dark:text-zinc-900">
            {totalItems}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-72 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500">Votre panier est vide.</p>
          ) : (
            <>
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2 text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{(item.price * item.quantity).toFixed(2)} {item.currency}</span>
                      <button onClick={() => removeItem(item.productId)} className="text-zinc-400 hover:text-red-500">
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-zinc-100 pt-3 text-sm font-semibold dark:border-zinc-800">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}