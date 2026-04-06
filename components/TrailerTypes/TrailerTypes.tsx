import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import { TrailerTypeCard } from "./TrailerTypeCard";
import { blurDataURLs } from "@/lib/blur-data-urls";

export type TrailerType = "wide" | "offroad" | null;

export async function TrailerTypes() {
  const t = await getTranslations("types");

  const trailers = [
    {
      type: "wide" as const,
      name: t("wide.name"),
      image: "/images/trailer-wide.webp",
      blurDataURL: blurDataURLs["trailer-wide"],
      specs: [
        "2.90 × 1.87 m",
        t("wide.spec1"),
        t("wide.spec2"),
        t("wide.spec3"),
        t("wide.spec4"),
      ],
    },
    {
      type: "offroad" as const,
      name: t("offroad.name"),
      image: "/images/trailer-offroad.webp",
      blurDataURL: blurDataURLs["trailer-offroad"],
      specs: [
        "2.90 × 1.43 m",
        t("offroad.spec1"),
        t("offroad.spec2"),
        t("offroad.spec3"),
        t("offroad.spec4"),
      ],
    },
  ];

  return (
    <section id="types" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
          <div
            className="w-20 h-0.5 mx-auto"
            style={{ backgroundColor: "#FF5A2F" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trailers.map((trailer, index) => (
            <motion.div
              key={trailer.type}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <TrailerTypeCard
                type={trailer.type}
                name={trailer.name}
                image={trailer.image}
                blurDataURL={trailer.blurDataURL}
                specs={trailer.specs}
                selectLabel={t("select")}
                selectedLabel={t("selected")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
