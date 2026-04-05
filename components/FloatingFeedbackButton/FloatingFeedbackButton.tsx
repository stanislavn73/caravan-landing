import { getTranslations } from "next-intl/server";
import { FloatingFeedbackButtonClient } from "./FloatingFeedbackButtonClient";

export async function FloatingFeedbackButton() {
  const t = await getTranslations("feedback");

  return <FloatingFeedbackButtonClient label={t("callBack")} />;
}
