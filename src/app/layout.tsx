import { Inter, Figtree } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "@/app/styles/globals.scss";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree"
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Qantas Frontend Code Test",
  description: "Qantas Group Accommodation Frontend Code Test."
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages() as { metadata: { title: string; description: string } };

  return (
    <html lang={locale}>
      <body className={`antialiased ${inter.variable} ${figtree.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
