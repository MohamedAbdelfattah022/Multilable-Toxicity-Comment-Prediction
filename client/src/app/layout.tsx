import type { Metadata } from "next";
import { Inter, Kalam } from "next/font/google";
import "./globals.css";

const kalam = Kalam({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kalam.className}>
        {children}
      </body>
    </html>
  );
}