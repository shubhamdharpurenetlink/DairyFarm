import {
  Header,
  Footer,
  MobileBottomNav,
  WhatsAppFAB,
  PWAInstallPrompt,
} from "@/layout";
import CartDrawer from "@/features/products/components/CartDrawer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppFAB />
      <PWAInstallPrompt />
      <CartDrawer />
    </>
  );
}
