import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Devflow",
  description:
    "A communtity driven platform for asking and answering questions about",
  icons: { icon: "/assets/images/site-logo.svg" },
  // canonical: "https://clerk.dev",
  // openGraph: {
  //   url: "https://clerk.dev",
  //   title: "Clerk NextJS",
  //   description: "Clerk NextJS",
  //   site_name: "Clerk NextJS",
  // },
  // twitter: {
  //   handle: "@clerk",
  //   site: "@clerk",
  //   cardType: "summary_large_image",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primart-gradients",
          footerActionLink: "primart-text-gradients hover: text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
