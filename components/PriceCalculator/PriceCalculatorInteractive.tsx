"use client";

import { useState, useEffect } from "react";
import { Card, Checkbox, Row, Col, Button, Divider } from "antd";
import { motion } from "motion/react";
import { useConfigurator } from "@/components/ConfiguratorContext";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { AnimatedHeading } from "@/components/Advantages/AnimatedHeading";
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
    activeTrailer === "wide" ? "Camper Wide" : "Camper Off-Road";
  const configName =
    activeConfig === "base"
      ? "Base"
      : activeConfig === "mid"
        ? "Mid"
        : "Performance";

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
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={14}>
              <Card className="shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6">
                  {labels.additionalOptions}
                </h3>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-600">
                    {labels.exteriorOptions}
                  </h4>
                  <div className="space-y-3">
                    {exteriorOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <Checkbox
                          checked={selectedOptions.includes(option.id)}
                          onChange={(e) =>
                            handleOptionChange(option.id, e.target.checked)
                          }
                          className="flex-1"
                        >
                          <span className="text-base">{option.name}</span>
                        </Checkbox>
                        <span className="font-medium text-gray-500 ml-4">
                          + {option.price.toLocaleString()} ₴
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <Divider className="my-6" />
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-600">
                    {labels.interiorOptions}
                  </h4>
                  <div className="space-y-3">
                    {interiorOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <Checkbox
                          checked={selectedOptions.includes(option.id)}
                          onChange={(e) =>
                            handleOptionChange(option.id, e.target.checked)
                          }
                          className="flex-1"
                        >
                          <span className="text-base">{option.name}</span>
                        </Checkbox>
                        <span className="font-medium text-gray-500 ml-4">
                          + {option.price.toLocaleString()} ₴
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    size="large"
                    block
                    onClick={openForm}
                    className="h-12"
                  >
                    {labels.getConsultation}
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card
                className="shadow-lg h-full"
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
                <Divider className="my-6" />
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
                  type="default"
                  size="large"
                  block
                  onClick={openForm}
                  className="h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    borderColor: "#6b7280",
                  }}
                >
                  {labels.order}
                </Button>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
}
