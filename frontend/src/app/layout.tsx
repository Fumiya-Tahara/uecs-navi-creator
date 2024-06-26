import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../features/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UECS Navi Creator",
  description: "UECS Navi Creator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
        style={{
          color: "#1a1a1c",
          backgroundColor: "rgb(243 244 246)",
          height: "100vh",
          margin: 0,
        }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
