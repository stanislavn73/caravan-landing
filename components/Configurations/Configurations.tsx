import { Row, Col } from "antd";
import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import Image from "next/image";
import { ConfigurationCard } from "./ConfigurationCard";
import { blurDataURLs } from "@/lib/blur-data-urls";

export type ConfigType = "base" | "mid" | "performance" | null;

export async function Configurations() {
  const t = await getTranslations("config");
  const tTypes = await getTranslations("types");

  const configs = [
    {
      type: "base" as const,
      name: t("base.name"),
      image: "/images/config-base.webp",
      blurDataURL: blurDataURLs["config-base"],
      price: "€8,500",
      features: [t("base.feature1"), t("base.feature2"), t("base.feature3")],
      popular: false,
    },
    {
      type: "mid" as const,
      name: t("mid.name"),
      image: "/images/config-mid.webp",
      blurDataURL: blurDataURLs["config-mid"],
      price: "€11,500",
      features: [t("mid.feature1"), t("mid.feature2"), t("mid.feature3")],
      popular: true,
    },
    {
      type: "performance" as const,
      name: t("performance.name"),
      image: "/images/config-performance.webp",
      blurDataURL: blurDataURLs["config-performance"],
      price: "€15,500",
      features: [
        t("performance.feature1"),
        t("performance.feature2"),
        t("performance.feature3"),
      ],
      popular: false,
    },
  ];

  return (
    <section id="configurations" className="py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/config-section-bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={70}
          priority={false}
          placeholder="blur"
          blurDataURL={blurDataURLs["config-section-bg"]}
        />
        <div className="absolute inset-0 bg-white/88" aria-hidden />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
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

        <Row gutter={[24, 24]}>
          {configs.map((config, index) => (
            <Col xs={24} md={12} lg={8} key={config.type}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="h-full"
              >
                <ConfigurationCard
                  type={config.type}
                  name={config.name}
                  image={config.image}
                  blurDataURL={config.blurDataURL}
                  price={config.price}
                  features={config.features}
                  popular={config.popular}
                  popularLabel={t("popular")}
                  selectLabel={tTypes("select")}
                  selectedLabel={t("selected")}
                  orderLabel={t("order")}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
