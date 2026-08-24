import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PHOENIX | Baseball Club",
  description: "PHOENIX baseball team official site",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

