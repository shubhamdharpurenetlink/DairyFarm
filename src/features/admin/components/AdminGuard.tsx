"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useAdminAuth } from "@/stores/useAdminAuth";
import { routes } from "@/lib/routes";
import Loader from "@/ui/Loader";

interface Props {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useAdminAuth((s) => s.session);
  const hydrated = useAdminAuth((s) => s.hasHydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (!session && pathname !== routes.admin.login) {
      router.replace(routes.admin.login);
    }
    if (session && pathname === routes.admin.login) {
      router.replace(routes.admin.dashboard);
    }
  }, [hydrated, session, pathname, router]);

  if (!hydrated) return <Loader fullPage label="Loading admin..." />;
  if (!session && pathname !== routes.admin.login) {
    return <Loader fullPage label="Redirecting to login..." />;
  }
  return <>{children}</>;
}
