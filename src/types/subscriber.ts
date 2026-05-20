import type { ID } from "./common";

export interface Subscriber {
  id: ID;
  email: string;
  createdAt: string;
}
