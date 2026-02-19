import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://sabitiakolevi.bg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Събития Колеви",
    template: "%s | Събития Колеви",
  },
  description: "Събития Колеви организира премиум събития с елегантна концепция и перфектна реализация.",
  openGraph: {
    title: "Събития Колеви",
    description: "Премиум организация на корпоративни събития, сватби и частни празници.",
    url: siteUrl,
    siteName: "Събития Колеви",
    locale: "bg_BG",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Събития Колеви",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: "hello@sabitiakolevi.bg",
  telephone: "+35970012345",
  sameAs: ["https://www.instagram.com/sabitiakolevi", "https://www.linkedin.com/company/sabitiakolevi"],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#eventservice`,
  name: "Събития Колеви",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "пл. Събития 12",
    addressLocality: "София",
    addressCountry: "BG",
  },
  priceRange: "$$$",
  description: "Event service за корпоративни събития, сватби и частни партита.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
