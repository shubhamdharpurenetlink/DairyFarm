import {
  HeroSkeleton,
  StatsRowSkeleton,
  SectionHeaderSkeleton,
  ListSkeleton,
  ProductCardSkeleton,
  CowCardSkeleton,
  TestimonialSkeleton,
} from "@/ui/Skeleton";

export default function HomeLoading() {
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
          <ListSkeleton count={4} variant="default" card={ProductCardSkeleton} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeaderSkeleton />
          <ListSkeleton count={4} variant="default" card={CowCardSkeleton} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeaderSkeleton />
          <ListSkeleton count={3} variant="wide" card={TestimonialSkeleton} />
        </div>
      </section>
    </>
  );
}
