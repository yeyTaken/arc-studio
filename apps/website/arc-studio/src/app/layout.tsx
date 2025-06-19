import "./styles/globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/ui/navbar";
import Background from "@/components/ui/style/background";
import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/config/fonts";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${fontSans.variable} ${fontMono.variable} text-foreground antialiased`}
      >
        <Background />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
