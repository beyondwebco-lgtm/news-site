import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-news-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-news-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DAILY UPDATE — Modern Independent News",
  description:
    "A clean, independent newspaper covering technology, business, national and world affairs, science, environment, and culture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col selection:bg-neutral-200">
        {children}
      </body>
    </html>
  );
}
