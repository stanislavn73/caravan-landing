import { setRequestLocale, getTranslations } from "next-intl/server";
import { ConsultationFormProvider } from "@/components/ConsultationFormContext";
import { ConfiguratorProvider } from "@/components/ConfiguratorContext";
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { InteractiveConfigurator } from "@/components/InteractiveConfigurator";
import { TechnicalSpecs } from "@/components/TechnicalSpecs/TechnicalSpecs";
import { Advantages } from "@/components/Advantages/Advantages";
import { PriceCalculator } from "@/components/PriceCalculator/PriceCalculator";
import { CTASection } from "@/components/CTASection/CTASection";
import { Footer } from "@/components/Footer/Footer";
import { FloatingFeedbackButton } from "@/components/FloatingFeedbackButton/FloatingFeedbackButton";
import { ConsultationForm } from "@/components/ConsultationForm/ConsultationForm";

type Props = {
  params: Promise<{ locale: string }>;
};

function getJsonLd(locale: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://respocaravan.com";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Respo Caravan",
        url: baseUrl,
        logo: `${baseUrl}/images/respo-logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@respocaravan.com",
          contactType: "sales",
          areaServed: "UA",
          availableLanguage: ["English", "Ukrainian"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          addressCountry: "UA",
        },
      },
      {
        "@type": "Product",
        name: "Camper Wide",
        description:
          locale === "ua"
            ? "Компактний кемпер-причіп з просторним інтер'єром для сім'ї"
            : "Compact camping trailer with spacious interior for families",
        brand: { "@type": "Brand", name: "Respo Caravan" },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "8500",
          highPrice: "15500",
          offerCount: "3",
        },
        weight: { "@type": "QuantitativeValue", value: "600-700", unitCode: "KGM" },
      },
      {
        "@type": "Product",
        name: "Camper Off-Road",
        description:
          locale === "ua"
            ? "Кемпер-причіп для бездоріжжя з підвищеною прохідністю"
            : "Off-road camping trailer with all-terrain capability",
        brand: { "@type": "Brand", name: "Respo Caravan" },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "8500",
          highPrice: "15500",
          offerCount: "3",
        },
        weight: { "@type": "QuantitativeValue", value: "620-750", unitCode: "KGM" },
      },
    ],
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = getJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsultationFormProvider>
        <ConfiguratorProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[999] focus:px-6 focus:py-4 focus:bg-[#FF5A2F] focus:text-white focus:font-semibold focus:no-underline"
          >
            Skip to content
          </a>
          <div className="min-h-screen bg-white">
            <Navbar />
            <main id="main-content">
            <Hero />
            <InteractiveConfigurator />
            <TechnicalSpecs />
            <Advantages />
            <PriceCalculator />
            <CTASection />
            </main>
            <Footer />
            <FloatingFeedbackButton />
            <ConsultationForm />
          </div>
        </ConfiguratorProvider>
      </ConsultationFormProvider>
    </>
  );
}
