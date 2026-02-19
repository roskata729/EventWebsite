import type { Metadata } from "next";
import "./globals.css";
import { getServerLocale } from "@/lib/i18n/server";
import { getBrandName } from "@/lib/site-settings";

const siteUrl = "https://sabitiakolevi.bg";

export async function generateMetadata(): Promise<Metadata> {
  const brandName = await getBrandName();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: brandName,
      template: `%s | ${brandName}`,
    },
    description: `${brandName} provides premium event planning with elegant concepts and flawless execution.`,
    openGraph: {
      title: brandName,
      description: `Premium planning for corporate events, weddings, and private celebrations by ${brandName}.`,
      url: siteUrl,
      siteName: brandName,
      locale: "bg_BG",
      type: "website",
    },
  };
}

function getOrganizationSchema(brandName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: "hello@sabitiakolevi.bg",
    telephone: "+35970012345",
    sameAs: ["https://www.instagram.com/sabitiakolevi", "https://www.linkedin.com/company/sabitiakolevi"],
  };
}

function getLocalBusinessSchema(brandName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#eventservice`,
    name: brandName,
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Borisova 56",
      addressLocality: "Ruse",
      addressCountry: "BG",
    },
    priceRange: "$$$",
    description: "Event service for corporate events, weddings, and private parties.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const brandName = await getBrandName();
  const organizationSchema = getOrganizationSchema(brandName);
  const localBusinessSchema = getLocalBusinessSchema(brandName);

  return (
    <html lang={locale}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}