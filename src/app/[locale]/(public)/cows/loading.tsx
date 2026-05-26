import {
  SectionHeaderSkeleton,
  FilterBarSkeleton,
  ListSkeleton,
  CowCardSkeleton,
} from "@/ui/Skeleton";

export default function CowsLoading() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeaderSkeleton />
        <FilterBarSkeleton items={4} />
        <ListSkeleton count={6} variant="default" card={CowCardSkeleton} />
      </div>
    </section>
  );
}
