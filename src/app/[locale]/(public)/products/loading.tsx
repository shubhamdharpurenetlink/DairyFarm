import {
  SectionHeaderSkeleton,
  FilterBarSkeleton,
  ListSkeleton,
  ProductCardSkeleton,
} from "@/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeaderSkeleton />
        <FilterBarSkeleton items={6} />
        <ListSkeleton count={9} variant="default" card={ProductCardSkeleton} />
      </div>
    </section>
  );
}
