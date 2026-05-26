import {
  SectionHeaderSkeleton,
  FilterBarSkeleton,
  ListSkeleton,
  GalleryItemSkeleton,
} from "@/ui/Skeleton";

export default function GalleryLoading() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeaderSkeleton />
        <FilterBarSkeleton items={4} />
        <ListSkeleton count={9} variant="gallery" card={GalleryItemSkeleton} />
      </div>
    </section>
  );
}
