import { getTranslations } from "next-intl/server";
import {
  PriceCalculatorToggle,
  PriceCalculatorInteractive,
} from "./PriceCalculatorInteractive";

export async function PriceCalculator() {
  const t = await getTranslations("calculator");

  const labels = {
    title: t("title"),
    additionalOptions: t("additionalOptions"),
    exteriorOptions: t("exteriorOptions"),
    interiorOptions: t("interiorOptions"),
    summary: t("summary"),
    trailerType: t("trailerType"),
    configuration: t("configuration"),
    basePrice: t("basePrice"),
    selectedOptions: t("selectedOptions"),
    finalPrice: t("finalPrice"),
    getConsultation: t("getConsultation"),
    order: t("order"),
  };

  const optionNames = {
    solar: t("solar"),
    roof: t("roof"),
    awning: t("awning"),
    storage: t("storage"),
    bike: t("bike"),
    kitchen: t("kitchen"),
    heating: t("heating"),
    bed: t("bed"),
    lighting: t("lighting"),
    electric: t("electric"),
  };

  return (
    <PriceCalculatorToggle>
      <PriceCalculatorInteractive labels={labels} optionNames={optionNames} />
    </PriceCalculatorToggle>
  );
}
