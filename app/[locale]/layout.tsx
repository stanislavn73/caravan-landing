import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntdConfigProvider } from "@/components/AntdConfigProvider";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF5A2F",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://respocaravan.com";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Respo Caravan",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/ua`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ua")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale === "ua" ? "uk" : locale}>
      <body>
        <AntdRegistry>
          <AntdConfigProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
              <Toaster position="top-center" richColors />
            </NextIntlClientProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
