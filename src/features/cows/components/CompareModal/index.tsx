"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Modal, Empty, Button } from "antd";
import { useUIStore } from "@/stores/useUIStore";
import { useHydratedRepo } from "@/hooks/useRepoQuery";
import { cowRepo } from "@/services/repos";
import styles from "./CompareModal.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  locale: string;
}

export default function CompareModal({ open, onClose, locale }: Props) {
  const t = useTranslations("cows");
  const tCommon = useTranslations("common");
  const { compareList, clearCompare } = useUIStore();
  const isHi = locale === "hi";
  const cows = useHydratedRepo(cowRepo);

  const selected = cows.filter((c) => compareList.includes(c.slug));

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={t("compareTitle")}
      width={900}
      centered
    >
      {selected.length < 2 ? (
        <Empty description={t("compareSelectMsg")} />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                {selected.map((c) => (
                  <th key={c.slug}>
                    <div className={styles.head}>
                      <div className={styles.imgWrap}>
                        <Image
                          src={c.image}
                          alt={isHi ? c.nameHi : c.nameEn}
                          fill
                          sizes="120px"
                          className={styles.img}
                        />
                      </div>
                      <div className={styles.name}>
                        {isHi ? c.nameHi : c.nameEn}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label={tCommon("indigenous")}>
                {selected.map((c) => (
                  <td key={c.slug}>{tCommon(c.category)}</td>
                ))}
              </Row>
              <Row label={t("origin")}>
                {selected.map((c) => (
                  <td key={c.slug}>{c.origin}</td>
                ))}
              </Row>
              <Row label={t("milkYield")}>
                {selected.map((c) => (
                  <td key={c.slug}>
                    {c.milkYieldLitresPerDay.min}-{c.milkYieldLitresPerDay.max}{" "}
                    {t("litresDay")}
                  </td>
                ))}
              </Row>
              <Row label={t("fatContent")}>
                {selected.map((c) => (
                  <td key={c.slug}>{c.fatPercent}%</td>
                ))}
              </Row>
              <Row label={t("suitability")}>
                {selected.map((c) => (
                  <td key={c.slug} className={styles.smallText}>
                    {isHi ? c.suitability.hi : c.suitability.en}
                  </td>
                ))}
              </Row>
              <Row label={t("temperament")}>
                {selected.map((c) => (
                  <td key={c.slug} className={styles.smallText}>
                    {isHi ? c.temperament.hi : c.temperament.en}
                  </td>
                ))}
              </Row>
            </tbody>
          </table>
          <div className={styles.actions}>
            <Button onClick={clearCompare}>Clear</Button>
            <Button type="primary" onClick={onClose}>
              {tCommon("close")}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <th>{label}</th>
      {children}
    </tr>
  );
}
