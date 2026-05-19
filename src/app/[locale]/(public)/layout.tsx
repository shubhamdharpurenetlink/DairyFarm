import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppFAB from "@/components/contact/WhatsAppFAB";
import PWAInstallPrompt from "@/components/shared/PWAInstallPrompt";

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
    </>
  );
}
