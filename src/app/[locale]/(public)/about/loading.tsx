import {
  HeroSkeleton,
  SectionHeaderSkeleton,
  StatsRowSkeleton,
  ListSkeleton,
  TeamCardSkeleton,
} from "@/ui/Skeleton";

export default function AboutLoading() {
  return (
    <>
      <HeroSkeleton />
      <section className="section">
        <div className="container">
          <StatsRowSkeleton items={4} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeaderSkeleton />
          <ListSkeleton count={6} variant="small" card={TeamCardSkeleton} />
        </div>
      </section>
    </>
  );
}
