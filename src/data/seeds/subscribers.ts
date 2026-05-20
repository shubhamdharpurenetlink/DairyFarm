import type { Subscriber } from "@/types";

const daysAgo = (d: number) => new Date(Date.now() - d * 86400_000).toISOString();

export const subscribers: Subscriber[] = [
  { id: "s1", email: "neha@example.com", createdAt: daysAgo(1) },
  { id: "s2", email: "rohit@example.com", createdAt: daysAgo(3) },
  { id: "s3", email: "anita@example.com", createdAt: daysAgo(7) },
  { id: "s4", email: "vishal@example.com", createdAt: daysAgo(14) },
];
