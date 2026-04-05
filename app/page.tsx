import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

// Fallback redirect — middleware handles this at the edge,
// but if middleware is bypassed this ensures users still land on the correct locale.
export default async function RootPage() {
  const headersList = await headers();
  console.log(headersList);
  const acceptLanguage = headersList.get("accept-language") ?? "";

  const userLocale = routing.locales.find((locale) =>
    acceptLanguage.toLowerCase().includes(locale === "ua" ? "uk" : locale),
  );

  redirect(`/${userLocale ?? routing.defaultLocale}`);
}
