import { getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import { HeroCarousel } from "./HeroCarousel";
import { HeroCTAButton } from "./HeroCTAButton";
import { blurDataURLs } from "@/lib/blur-data-urls";

const heroImages = [
  {
    src: "/images/hero-1.webp",
    alt: "Camping trailer in nature",
    blurDataURL: blurDataURLs["hero-1"],
  },
  {
    src: "/images/hero-2.webp",
    alt: "Camper van landscape",
    blurDataURL: blurDataURLs["hero-2"],
  },
  {
    src: "/images/hero-3.webp",
    alt: "Caravan travel",
    blurDataURL: blurDataURLs["hero-3"],
  },
  {
    src: "/images/hero-4.webp",
    alt: "Camping trailer",
    blurDataURL: blurDataURLs["hero-4"],
  },
  {
    src: "/images/hero-5.webp",
    alt: "Outdoor caravan",
    blurDataURL: blurDataURLs["hero-5"],
  },
];

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <HeroCarousel images={heroImages} />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1
              className="mb-8 font-bold tracking-tighter leading-[0.85]"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                color: "var(--respo-orange-60)",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              RESPO
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white text-lg sm:text-xl md:text-2xl mb-12 font-light tracking-wider uppercase"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)" }}
            >
              {t("slogan")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <HeroCTAButton label={t("cta")} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
