import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Poppins, Inter, Hind } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/lib/antd-theme";
import AuthProvider from "./AuthProvider";
import "@/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hind = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2E7D5B",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://laxmidairy.in"),
  title: {
    default: "Laxmi Dairy Farm — Pure A2 Milk Since 1985",
    template: "%s | Laxmi Dairy Farm",
  },
  description:
    "Bilingual modern PWA for Laxmi Dairy Farm. Pure A2 milk from indigenous Gir, Sahiwal & Tharparkar cows. Training programs, knowledge hub, and ethical dairy.",
  applicationName: "Laxmi Dairy",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Laxmi Dairy",
  },
  openGraph: {
    type: "website",
    siteName: "Laxmi Dairy Farm",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const locale = h.get("x-next-intl-locale") ?? "en";

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${inter.variable} ${hind.variable}`}
    >
      <body>
        <AuthProvider>
          <AntdRegistry>
            <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
