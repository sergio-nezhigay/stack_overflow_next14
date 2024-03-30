import { Metadata } from "next";

const { NEXT_PUBLIC_SERVER_URL = "http://localhost:3000" } = process.env;

const data = {
  title: "Dev overflowed",
  description: "Dev overflow NextJS cloned",
  keywords: "NextJS",
  locale: "en",
};

const { title, description, keywords, locale } = data;

const meta: Metadata = {
  title,
  description,
  keywords,
  metadataBase: new URL(NEXT_PUBLIC_SERVER_URL as string),
  alternates: {
    canonical: NEXT_PUBLIC_SERVER_URL as string,
  },
  manifest: "/meta/site.webmanifest",
  openGraph: {
    title,
    description,
    url: NEXT_PUBLIC_SERVER_URL as string,
    siteName: title,
    locale,
    type: "website",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default meta;
