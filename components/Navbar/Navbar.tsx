import { getTranslations, getLocale } from "next-intl/server";
import { NavbarClient } from "./NavbarClient";

interface MenuItem {
  key: string;
  label: string;
}

export async function Navbar() {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  const menuItems: MenuItem[] = [
    { key: "types", label: t("types") },
    { key: "configurations", label: t("configurations") },
    { key: "advantages", label: t("advantages") },
    { key: "calculator", label: t("options") },
  ];

  return <NavbarClient menuItems={menuItems} locale={locale} />;
}
