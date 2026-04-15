import { getTranslations } from "next-intl/server";
import { AdvantageCard } from "./AdvantageCard";
import { AdvantageIcon } from "./AdvantageIcon";
import { AnimatedHeading } from "./AnimatedHeading";

export async function Advantages() {
  const t = await getTranslations("advantages");

  const advantages = [
    { title: t("1.title"), description: t("1.desc") },
    { title: t("2.title"), description: t("2.desc") },
    { title: t("3.title"), description: t("3.desc") },
    { title: t("4.title"), description: t("4.desc") },
    { title: t("5.title"), description: t("5.desc") },
    { title: t("6.title"), description: t("6.desc") },
    { title: t("7.title"), description: t("7.desc") },
    { title: t("8.title"), description: t("8.desc") },
  ];

  return (
    <section id="advantages" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
          <div
            className="w-20 h-0.5 mx-auto"
            style={{ backgroundColor: "#FF5A2F" }}
          />
        </AnimatedHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard index={index} key={index}>
              <div
                className="h-full rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="p-6 text-center flex flex-col h-full">
                  <div className="mx-auto mb-4 flex h-24 w-24 shrink-0 items-center justify-center">
                    <AdvantageIcon index={index} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-black">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-500 text-sm flex-1">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </AdvantageCard>
          ))}
        </div>
      </div>
    </section>
  );
}
