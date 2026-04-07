import ProductDetailSkeleton from "@/app/domains/catalog/components/ProductDetailSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <ProductDetailSkeleton />
    </div>
  );
}