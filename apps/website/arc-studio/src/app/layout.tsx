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
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  icons: {
    icon: "./favicon.png",
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
        
        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
