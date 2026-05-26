"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "@/ui/SectionHeader";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";
import { useHydratedRepo, useRepoReady } from "@/hooks/useRepoQuery";
import { teamRepo } from "@/services/repos";
import { ListSkeleton, TeamCardSkeleton } from "@/ui/Skeleton";
import styles from "./TeamGrid.module.scss";

export default function TeamGrid() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isHi = locale === "hi";
  const team = useHydratedRepo(teamRepo);
  const ready = useRepoReady(teamRepo);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader eyebrow={t("teamSub")} title={t("teamTitle")} />
        {!ready && team.length === 0 ? (
          <ListSkeleton count={6} variant="small" card={TeamCardSkeleton} />
        ) : (
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {team.map((m) => (
            <motion.div
              key={m.id}
              className={styles.card}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.avatarWrap}>
                <Image
                  src={m.avatar}
                  alt={m.name}
                  fill
                  sizes="200px"
                  className={styles.avatar}
                />
              </div>
              <h4 className={styles.name}>{m.name}</h4>
              <p className={styles.role}>{isHi ? m.role.hi : m.role.en}</p>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
