import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vendigo — Own the machine. Earn the income.",
  description:
    "India's first fintech-powered vending machine investment platform. Fund a smart, IoT-connected vending machine and earn transparent, monthly passive income — tracked in real time.",
  metadataBase: new URL("https://vendigo.in"),
  openGraph: {
    title: "Vendigo — Own the machine. Earn the income.",
    description:
      "Fund a smart, IoT-connected vending machine. Earn transparent, monthly passive income.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-void text-white antialiased">{children}</body>
    </html>
  );
}
