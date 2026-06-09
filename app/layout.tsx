import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "StormTarget Live | Real-Time Storm Intelligence Map",
  description: "Real-time radar, warnings, and preliminary hail/wind/tornado reports for roofing and storm-damage appointment targeting. Professional B2B operational dashboard.",
  keywords: ["roofing lead generation", "storm targeting", "hail damage map", "wind damage radar", "hail reports", "severe weather tracking", "roofing storm damage"],
  authors: [{ name: "StormTarget Map" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#030712" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </head>
      <body className={`${inter.variable} font-sans h-full bg-slate-950 text-slate-50 overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
