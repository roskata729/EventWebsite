import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Събития Колеви",
  description: "Събития Колеви организира премиум събития с елегантна концепция и перфектна реализация.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
