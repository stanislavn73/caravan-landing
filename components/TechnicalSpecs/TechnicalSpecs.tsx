import { getTranslations } from "next-intl/server";
import { AnimatedHeading } from "@/components/Advantages/AnimatedHeading";
import {
  TechnicalSpecsToggle,
  SpecsTableToggle,
  SpecsBadges,
} from "./TechnicalSpecsToggle";

const trailerTypes = ["wide", "offroad"] as const;
const configTypes = ["base", "mid", "performance"] as const;

const specsValues: Record<
  string,
  Record<string, Record<string, string | { key: string; count: number }>>
> = {
  wide: {
    base: {
      weight: "600 kg",
      size: "450 × 500 × 125 cm",
      sleepingCapacity: "2",
      groundClearance: "450 mm",
      axleType: "torsion",
      batteryCapacity: "100 Ah",
      waterTank: "40 L",
      doorSize: "870 × 720 mm",
      rearDoorSize: "1140 × 930 mm",
      maximumSpeed: "140 km/h",
    },
    mid: {
      weight: "650 kg",
      size: "480 × 520 × 130 cm",
      sleepingCapacity: "3",
      groundClearance: "450 mm",
      axleType: "torsion",
      batteryCapacity: "150 Ah",
      waterTank: "60 L",
      doorSize: "870 × 720 mm",
      rearDoorSize: "1140 × 930 mm",
      maximumSpeed: "140 km/h",
    },
    performance: {
      weight: "700 kg",
      size: "500 × 540 × 135 cm",
      sleepingCapacity: "4",
      groundClearance: "450 mm",
      axleType: "reinforcedTorsion",
      batteryCapacity: "200 Ah",
      waterTank: "80 L",
      doorSize: "870 × 720 mm",
      rearDoorSize: "1140 × 930 mm",
      maximumSpeed: "140 km/h",
    },
  },
  offroad: {
    base: {
      weight: "620 kg",
      size: "450 × 500 × 130 cm",
      sleepingCapacity: "2",
      groundClearance: "500 mm",
      axleType: "reinforcedTorsion",
      batteryCapacity: "100 Ah",
      waterTank: "50 L",
      doorSize: "870 × 720 mm",
      rearDoorSize: "1140 × 930 mm",
      maximumSpeed: "140 km/h",
    },
    mid: {
      weight: "680 kg",
      size: "480 × 520 × 135 cm",
      sleepingCapacity: "3",
      groundClearance: "500 mm",
      axleType: "reinforcedTorsion",
      batteryCapacity: "150 Ah",
      waterTank: "70 L",
      doorSize: "870 × 720 mm",
      rearDoorSize: "1140 × 930 mm",
      maximumSpeed: "140 km/h",
    },
    performance: {
      weight: "750 kg",
      size: "500 × 540 × 140 cm",
      sleepingCapacity: "4",
      groundClearance: "500 mm",
      axleType: "reinforcedTorsion",
      batteryCapacity: "200 Ah",
      waterTank: "100 L",
      doorSize: "870 × 720 mm",
      rearDoorSize: "1140 × 930 mm",
      maximumSpeed: "140 km/h",
    },
  },
};

const specKeys = [
  "weight",
  "size",
  "sleepingCapacity",
  "groundClearance",
  "axleType",
  "batteryCapacity",
  "waterTank",
  "doorSize",
  "rearDoorSize",
  "maximumSpeed",
] as const;

export async function TechnicalSpecs() {
  const t = await getTranslations("specs");
  const tTypes = await getTranslations("types");
  const tConfig = await getTranslations("config");

  return (
    <TechnicalSpecsToggle>
      <section id="specs" className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedHeading>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
              {t("title")}
            </h2>
            <div
              className="w-20 h-0.5 mx-auto mb-4"
              style={{ backgroundColor: "#FF5A2F" }}
            />
            <SpecsBadges
              trailerNames={{
                wide: tTypes("wide.name"),
                offroad: tTypes("offroad.name"),
              }}
              configNames={{
                base: tConfig("base.name"),
                mid: tConfig("mid.name"),
                performance: tConfig("performance.name"),
              }}
            />
          </AnimatedHeading>

          <div className="max-w-3xl mx-auto">
            {trailerTypes.map((trailer) =>
              configTypes.map((config) => {
                const data = specsValues[trailer][config];
                return (
                  <SpecsTableToggle
                    key={`${trailer}-${config}`}
                    trailerType={trailer}
                    configType={config}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      {specKeys.map((specKey) => {
                        const rawValue = data[specKey] as string;
                        let displayValue: string;
                        if (specKey === "sleepingCapacity") {
                          displayValue = t("persons", {
                            count: parseInt(rawValue),
                          });
                        } else if (
                          specKey === "axleType" &&
                          (rawValue === "torsion" ||
                            rawValue === "reinforcedTorsion")
                        ) {
                          displayValue = t(rawValue);
                        } else {
                          displayValue = rawValue;
                        }

                        return (
                          <div
                            key={specKey}
                            className="grid grid-cols-2 gap-6 py-4 px-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-gray-600 text-base">
                              {t(specKey)}
                            </span>
                            <span
                              className="font-bold text-lg text-right"
                              style={{ color: "#FF5A2F" }}
                            >
                              {displayValue}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </SpecsTableToggle>
                );
              }),
            )}
          </div>
        </div>
      </section>
    </TechnicalSpecsToggle>
  );
}
