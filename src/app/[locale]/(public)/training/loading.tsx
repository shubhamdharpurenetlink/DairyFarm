import {
  SectionHeaderSkeleton,
  StatsRowSkeleton,
  FilterBarSkeleton,
  ListSkeleton,
  TrainingCardSkeleton,
} from "@/ui/Skeleton";

export default function TrainingLoading() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeaderSkeleton />
        <StatsRowSkeleton items={3} />
        <FilterBarSkeleton items={4} />
        <ListSkeleton count={6} variant="default" card={TrainingCardSkeleton} />
      </div>
    </section>
  );
}
