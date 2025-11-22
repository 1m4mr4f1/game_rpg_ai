import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Pastikan file globals.css ada (bawaan create-next-app)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG AI Adventure",
  description: "Game RPG Text-based yang digerakkan oleh Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}