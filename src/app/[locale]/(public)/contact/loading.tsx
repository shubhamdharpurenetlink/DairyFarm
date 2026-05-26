import { SectionHeaderSkeleton, SkelBlock, SkelImage } from "@/ui/Skeleton";

export default function ContactLoading() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeaderSkeleton />
        <div
          style={{
            display: "grid",
            gap: "var(--space-8, 2rem)",
            gridTemplateColumns: "1fr",
          }}
        >
          <SkelImage aspect="16 / 9" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SkelBlock style={{ height: 16, width: "40%" }} />
            <SkelBlock style={{ height: 44 }} />
            <SkelBlock style={{ height: 16, width: "30%" }} />
            <SkelBlock style={{ height: 44 }} />
            <SkelBlock style={{ height: 16, width: "35%" }} />
            <SkelBlock style={{ height: 120 }} />
            <SkelBlock style={{ height: 48, width: 160, borderRadius: 999 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
