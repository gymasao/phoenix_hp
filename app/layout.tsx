import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./site-header";

export const metadata: Metadata = {
  title: "PHOENIX | Baseball Club",
  description: "PHOENIX baseball team official site",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
