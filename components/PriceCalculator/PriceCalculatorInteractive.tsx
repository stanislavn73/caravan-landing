"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useConfigurator } from "@/components/ConfiguratorContext";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { AnimatedHeading } from "@/components/Advantages/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface OptionDef {
  id: string;
  price: number;
  category: "exterior" | "interior";
}

const optionDefs: OptionDef[] = [
  { id: "solar", price: 9000, category: "exterior" },
  { id: "roof", price: 3500, category: "exterior" },
  { id: "awning", price: 6000, category: "exterior" },
  { id: "storage", price: 2500, category: "exterior" },
  { id: "bike", price: 2700, category: "exterior" },
  { id: "kitchen", price: 6700, category: "interior" },
  { id: "heating", price: 11000, category: "interior" },
  { id: "bed", price: 4500, category: "interior" },
  { id: "lighting", price: 3200, category: "interior" },
  { id: "electric", price: 8500, category: "interior" },
];

const basePrices: Record<string, number> = {
  base: 60000,
  mid: 85000,
  performance: 115000,
};

interface Labels {
  title: string;
  additionalOptions: string;
  exteriorOptions: string;
  interiorOptions: string;
  summary: string;
  trailerType: string;
  configuration: string;
  basePrice: string;
  selectedOptions: string;
  finalPrice: string;
  getConsultation: string;
  order: string;
  camperWide: string;
  camperOffroad: string;
  configBase: string;
  configMid: string;
  configPerformance: string;
}

export function PriceCalculatorToggle({ children }: { children: ReactNode }) {
  const { selectedTrailerType, selectedConfig } = useConfigurator();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const shouldHide = hydrated && (!selectedTrailerType || !selectedConfig);

  return (
    <div style={shouldHide ? { display: "none" } : undefined}>{children}</div>
  );
}

function OptionCheckbox({
  checked,
  onChange,
  label,
  price,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  price: number;
}) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
    >
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded accent-[#FF5A2F]"
        />
        <span className="text-base">{label}</span>
      </label>
      <span className="font-medium text-gray-600 ml-4">
        + {price.toLocaleString()} ₴
      </span>
    </motion.div>
  );
}

export function PriceCalculatorInteractive({
  labels,
  optionNames,
}: {
  labels: Labels;
  optionNames: Record<string, string>;
}) {
  const { selectedTrailerType, selectedConfig } = useConfigurator();
  const { openForm } = useConsultationForm();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const activeTrailer = selectedTrailerType ?? "wide";
  const activeConfig = selectedConfig ?? "base";

  const options = optionDefs.map((def) => ({
    ...def,
    name: optionNames[def.id],
  }));

  const handleOptionChange = (optionId: string, checked: boolean) => {
    setSelectedOptions((prev) =>
      checked ? [...prev, optionId] : prev.filter((id) => id !== optionId),
    );
  };

  const basePrice = basePrices[activeConfig] ?? 0;
  const optionsPrice = options
    .filter((opt) => selectedOptions.includes(opt.id))
    .reduce((sum, opt) => sum + opt.price, 0);
  const totalPrice = basePrice + optionsPrice;

  const exteriorOptions = options.filter((opt) => opt.category === "exterior");
  const interiorOptions = options.filter((opt) => opt.category === "interior");
  const selectedOptionsDetails = options.filter((opt) =>
    selectedOptions.includes(opt.id),
  );

  const trailerTypeName =
    activeTrailer === "wide" ? labels.camperWide : labels.camperOffroad;
  const configName =
    activeConfig === "base"
      ? labels.configBase
      : activeConfig === "mid"
        ? labels.configMid
        : labels.configPerformance;

  return (
    <section id="calculator" className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {labels.title}
          </h2>
          <div
            className="w-20 h-0.5 mx-auto"
            style={{ backgroundColor: "#FF5A2F" }}
          />
        </AnimatedHeading>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
            <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6">
                {labels.additionalOptions}
              </h3>
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-600">
                  {labels.exteriorOptions}
                </h4>
                <div className="space-y-0">
                  {exteriorOptions.map((option) => (
                    <OptionCheckbox
                      key={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={(checked) =>
                        handleOptionChange(option.id, checked)
                      }
                      label={option.name}
                      price={option.price}
                    />
                  ))}
                </div>
              </div>
              <hr className="my-6 border-gray-200" />
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-600">
                  {labels.interiorOptions}
                </h4>
                <div className="space-y-0">
                  {interiorOptions.map((option) => (
                    <OptionCheckbox
                      key={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={(checked) =>
                        handleOptionChange(option.id, checked)
                      }
                      label={option.name}
                      price={option.price}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <Button variant="default" size="lg" block onClick={openForm}>
                  {labels.getConsultation}
                </Button>
              </div>
            </div>
            <div className="lg:w-[400px]">
              <div
                className="rounded-lg border border-gray-200 shadow-lg p-6 h-full"
                style={{ backgroundColor: "#f9fafb" }}
              >
                <h3 className="text-2xl font-bold mb-6">{labels.summary}</h3>
                <div className="mb-6 space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">
                      {labels.trailerType}
                    </p>
                    <p className="font-bold text-lg">{trailerTypeName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">
                      {labels.configuration}
                    </p>
                    <p className="font-bold text-lg">{configName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{labels.basePrice}</p>
                    <p className="font-bold text-xl">
                      {basePrice.toLocaleString()} ₴
                    </p>
                  </div>
                </div>
                {selectedOptionsDetails.length > 0 && (
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-3 font-semibold">
                      {labels.selectedOptions}
                    </p>
                    <div className="space-y-2">
                      {selectedOptionsDetails.map((option) => (
                        <div
                          key={option.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-700">{option.name}</span>
                          <span className="text-gray-600">
                            + {option.price.toLocaleString()} ₴
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <hr className="my-6 border-gray-200" />
                <motion.div
                  key={totalPrice}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {labels.finalPrice}
                    </p>
                    <p
                      className="font-bold text-5xl"
                      style={{ color: "#FF5A2F" }}
                    >
                      {totalPrice.toLocaleString()} ₴
                    </p>
                  </div>
                </motion.div>
                <Button
                  variant="dark"
                  size="lg"
                  block
                  onClick={openForm}
                  className="h-14 text-lg bg-gray-500 border-gray-500 shadow-lg hover:shadow-xl"
                >
                  {labels.order}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
