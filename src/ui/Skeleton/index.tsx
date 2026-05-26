import styles from "./Skeleton.module.scss";

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

type Style = React.CSSProperties;

export function SkelBlock({
  className,
  style,
}: {
  className?: string;
  style?: Style;
}) {
  return <span className={`${styles.block} ${className ?? ""}`} style={style} aria-hidden />;
}

export function SkelCircle({ size = 48, style }: { size?: number; style?: Style }) {
  return (
    <span
      className={styles.circle}
      style={{ width: size, height: size, ...style }}
      aria-hidden
    />
  );
}

export function SkelImage({
  aspect = "4 / 3",
  className,
  style,
}: {
  aspect?: string;
  className?: string;
  style?: Style;
}) {
  return (
    <span
      className={`${styles.image} ${className ?? ""}`}
      style={{ aspectRatio: aspect, ...style }}
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Card-shaped skeletons                                              */
/* ------------------------------------------------------------------ */

export function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <span className={styles.cardImg} />
      <div className={styles.cardBody}>
        <span className={`${styles.block} ${styles.title}`} />
        <span className={`${styles.block} ${styles.line80}`} />
        <span className={`${styles.block} ${styles.line60}`} />
        <div className={styles.cardFooter}>
          <span className={`${styles.block} ${styles.priceBlock}`} />
          <span className={`${styles.block} ${styles.btnBlock}`} />
        </div>
      </div>
    </div>
  );
}

export function CowCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <span className={styles.cardImg} />
      <div className={styles.cardBody}>
        <span className={`${styles.block} ${styles.title}`} />
        <span className={`${styles.block} ${styles.subtitle}`} />
        <span className={`${styles.block} ${styles.line80}`} />
        <div className={styles.cardFooter}>
          <span className={`${styles.block} ${styles.line40}`} />
          <span className={`${styles.block} ${styles.line30}`} />
        </div>
      </div>
    </div>
  );
}

export function TrainingCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <span className={styles.cardImg} />
      <div className={styles.cardBody}>
        <div className={styles.tagsRow}>
          <span className={`${styles.block} ${styles.tagBlock}`} />
          <span className={`${styles.block} ${styles.tagBlock}`} />
        </div>
        <span className={`${styles.block} ${styles.title}`} />
        <span className={`${styles.block} ${styles.line80}`} />
        <span className={`${styles.block} ${styles.line60}`} />
        <div className={styles.cardFooter}>
          <span className={`${styles.block} ${styles.line40}`} />
          <span className={`${styles.block} ${styles.line30}`} />
        </div>
      </div>
    </div>
  );
}

export function DiseaseCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <div className={styles.cardBody}>
        <div className={styles.tagsRow}>
          <span className={`${styles.block} ${styles.tagBlock}`} />
          <span className={`${styles.block} ${styles.tagBlock}`} />
        </div>
        <span className={`${styles.block} ${styles.title}`} />
        <span className={`${styles.block} ${styles.lineFull}`} />
        <span className={`${styles.block} ${styles.line80}`} />
        <span className={`${styles.block} ${styles.line60}`} />
      </div>
    </div>
  );
}

export function GalleryItemSkeleton() {
  return <SkelImage aspect="1 / 1" className={styles.galleryTile} />;
}

export function TeamCardSkeleton() {
  return (
    <div className={styles.teamCard} aria-hidden>
      <SkelCircle size={96} />
      <span className={`${styles.block} ${styles.title}`} />
      <span className={`${styles.block} ${styles.subtitle}`} />
      <span className={`${styles.block} ${styles.line80}`} />
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className={styles.testimonialCard} aria-hidden>
      <div className={styles.testimonialLines}>
        <span className={`${styles.block} ${styles.lineFull}`} />
        <span className={`${styles.block} ${styles.lineFull}`} />
        <span className={`${styles.block} ${styles.line80}`} />
      </div>
      <div className={styles.testimonialFooter}>
        <SkelCircle size={48} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          <span className={`${styles.block} ${styles.line50}`} />
          <span className={`${styles.block} ${styles.line30}`} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout-shaped skeletons                                            */
/* ------------------------------------------------------------------ */

export function SectionHeaderSkeleton() {
  return (
    <div className={styles.sectionHeader} aria-hidden>
      <span className={`${styles.block} ${styles.sectionHeaderTitle}`} />
      <span className={`${styles.block} ${styles.sectionHeaderSubtitle}`} />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="container">
      <div className={styles.hero} aria-hidden>
        <div className={styles.heroText}>
          <span className={`${styles.block} ${styles.subtitle}`} />
          <span className={`${styles.block} ${styles.heroTitle}`} />
          <span className={`${styles.block} ${styles.heroTitle}`} style={{ width: "55%" }} />
          <span className={`${styles.block} ${styles.heroSubtitle}`} />
          <div className={styles.heroCta}>
            <span className={`${styles.block} ${styles.heroBtn}`} />
            <span className={`${styles.block} ${styles.heroBtn}`} />
          </div>
        </div>
        <SkelImage aspect="4 / 3" className={styles.heroMedia} />
      </div>
    </div>
  );
}

export function StatsRowSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className={styles.statsRow} aria-hidden>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className={styles.statItem}>
          <span className={`${styles.block} ${styles.statValue}`} />
          <span className={`${styles.block} ${styles.statLabel}`} />
        </div>
      ))}
    </div>
  );
}

export function FilterBarSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className={styles.filterBar} aria-hidden>
      {Array.from({ length: items }).map((_, i) => (
        <span key={i} className={`${styles.block} ${styles.chip}`} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  List wrappers                                                      */
/* ------------------------------------------------------------------ */

type GridVariant = "default" | "wide" | "small" | "gallery";

const GRID_CLASS: Record<GridVariant, string> = {
  default: styles.grid,
  wide: styles.gridWide,
  small: styles.gridSmall,
  gallery: styles.galleryGrid,
};

export function ListSkeleton({
  count = 6,
  variant = "default",
  card: CardComp = ProductCardSkeleton,
}: {
  count?: number;
  variant?: GridVariant;
  card?: React.ComponentType;
}) {
  return (
    <div className={GRID_CLASS[variant]} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <CardComp key={i} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail / table                                                     */
/* ------------------------------------------------------------------ */

export function DetailPageSkeleton() {
  return (
    <div className="container">
      <div className={styles.detail} aria-hidden>
        <SkelImage aspect="4 / 3" className={styles.detailMedia} />
        <div className={styles.detailInfo}>
          <div className={styles.tagsRow}>
            <span className={`${styles.block} ${styles.tagBlock}`} />
            <span className={`${styles.block} ${styles.tagBlock}`} />
          </div>
          <span className={`${styles.block} ${styles.heroTitle}`} />
          <span className={`${styles.block} ${styles.heroSubtitle}`} />
          <div className={styles.paragraph}>
            <span className={`${styles.block} ${styles.lineFull}`} />
            <span className={`${styles.block} ${styles.lineFull}`} />
            <span className={`${styles.block} ${styles.line80}`} />
            <span className={`${styles.block} ${styles.line60}`} />
          </div>
          <div className={styles.heroCta}>
            <span className={`${styles.block} ${styles.heroBtn}`} />
            <span className={`${styles.block} ${styles.heroBtn}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({
  rows = 6,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  const grid = `repeat(${cols}, minmax(0, 1fr))`;
  return (
    <div className={styles.table} aria-hidden>
      <div className={styles.tableHeader} style={{ gridTemplateColumns: grid }}>
        {Array.from({ length: cols }).map((_, i) => (
          <span key={i} className={`${styles.block} ${styles.tableCell}`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className={styles.tableRow}
          style={{ gridTemplateColumns: grid }}
        >
          {Array.from({ length: cols }).map((__, c) => (
            <span key={c} className={`${styles.block} ${styles.tableCell}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Default export — convenience namespace                              */
/* ------------------------------------------------------------------ */

const Skeleton = {
  Block: SkelBlock,
  Circle: SkelCircle,
  Image: SkelImage,
  ProductCard: ProductCardSkeleton,
  CowCard: CowCardSkeleton,
  TrainingCard: TrainingCardSkeleton,
  DiseaseCard: DiseaseCardSkeleton,
  GalleryItem: GalleryItemSkeleton,
  TeamCard: TeamCardSkeleton,
  Testimonial: TestimonialSkeleton,
  SectionHeader: SectionHeaderSkeleton,
  Hero: HeroSkeleton,
  StatsRow: StatsRowSkeleton,
  FilterBar: FilterBarSkeleton,
  List: ListSkeleton,
  Detail: DetailPageSkeleton,
  Table: TableSkeleton,
};

export default Skeleton;
