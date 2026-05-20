import { Tag } from "antd";

const STATUS_COLORS: Record<string, string> = {
  pending: "orange",
  confirmed: "blue",
  preparing: "purple",
  out_for_delivery: "cyan",
  delivered: "green",
  cancelled: "red",
  new: "blue",
  open: "gold",
  resolved: "green",
  spam: "red",
  completed: "green",
  active: "green",
  inactive: "default",
  draft: "default",
};

const STATUS_LABELS: Record<string, string> = {
  out_for_delivery: "Out for Delivery",
};

export default function StatusTag({ value }: { value: string }) {
  return (
    <Tag color={STATUS_COLORS[value] ?? "default"} style={{ textTransform: "capitalize" }}>
      {STATUS_LABELS[value] ?? value.replace(/_/g, " ")}
    </Tag>
  );
}
