import type { Enquiry } from "@/types";

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();

export const enquiries: Enquiry[] = [
  {
    id: "e1",
    name: "Ramesh Kumar",
    phone: "+919812345671",
    email: "ramesh.k@example.com",
    subject: "visit",
    message: "We are planning a family visit this Saturday. Are 6 adults and 4 kids allowed?",
    status: "new",
    createdAt: hoursAgo(2),
  },
  {
    id: "e2",
    name: "Anjali Sharma",
    phone: "+919812345672",
    email: "anjali@example.com",
    subject: "order",
    message: "Do you deliver A2 ghee outside Karnal? I am in Panipat.",
    status: "new",
    createdAt: hoursAgo(5),
  },
  {
    id: "e3",
    name: "Vikram Yadav",
    phone: "+919812345673",
    email: "vikram@example.com",
    subject: "partnership",
    message: "I run an organic store in Gurgaon. Interested in B2B supply.",
    status: "open",
    createdAt: hoursAgo(24),
  },
  {
    id: "e4",
    name: "Kavita Bisht",
    phone: "+919812345674",
    email: "kavita@example.com",
    subject: "training",
    message: "Is the advanced dairy farming course suitable for women-only batches?",
    status: "resolved",
    createdAt: hoursAgo(72),
  },
];
