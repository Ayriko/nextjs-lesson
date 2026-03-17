import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  stock: number;
  images: {
    main: string;
  };
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.slug}`}>
      <article className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <img
          src={product.images.main}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h2 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
            {product.name}
          </h2>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold">
              {product.price} {product.currency}
            </span>
            {product.stock === 0 && (
              <span className="text-xs text-red-500 font-medium">
                Rupture de stock
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
