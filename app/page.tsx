import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

// Fallback redirect — middleware handles this at the edge,
// but if middleware is bypassed this ensures users still land on the default locale.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
