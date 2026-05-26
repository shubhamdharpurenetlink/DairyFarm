import {
  SectionHeaderSkeleton,
  FilterBarSkeleton,
  ListSkeleton,
  DiseaseCardSkeleton,
} from "@/ui/Skeleton";

export default function CowCareLoading() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeaderSkeleton />
        <FilterBarSkeleton items={5} />
        <ListSkeleton count={6} variant="wide" card={DiseaseCardSkeleton} />
      </div>
    </section>
  );
}
