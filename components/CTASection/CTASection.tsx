import Image from "next/image";
import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import { CTAButton } from "./CTAButton";
import { blurDataURLs } from "@/lib/blur-data-urls";

export async function CTASection() {
  const t = await getTranslations("cta");

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL={blurDataURLs["cta-bg"]}
        />
      </div>
      <div className="absolute inset-0 bg-black/70 z-[1]" />

      <div className="relative z-[2] max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {t("subtitle")}
          </p>
          <CTAButton label={t("button")} />
        </motion.div>
      </div>
    </section>
  );
}
