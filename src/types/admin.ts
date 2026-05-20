export type AdminRole = "owner" | "editor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  issuedAt: string;
}
