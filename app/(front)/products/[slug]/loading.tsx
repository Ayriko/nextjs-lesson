import ProductDetailSkeleton from "@/app/domains/catalog/components/ProductDetailSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-screen-xl px-8 py-14">
      <ProductDetailSkeleton />
    </div>
  );
}
