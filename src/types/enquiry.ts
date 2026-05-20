import type { ID } from "./common";

export type EnquirySubject =
  | "general"
  | "visit"
  | "order"
  | "training"
  | "partnership";

export type EnquiryStatus = "new" | "open" | "resolved" | "spam";

export interface Enquiry {
  id: ID;
  name: string;
  phone: string;
  email: string;
  subject: EnquirySubject;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}
