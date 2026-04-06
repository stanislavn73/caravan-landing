"use client";

import Image from "next/image";
import { CheckOutlined, StarOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { useConfigurator } from "@/components/ConfiguratorContext";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { Button } from "@/components/ui/Button";

interface ConfigurationCardProps {
  type: "base" | "mid" | "performance";
  name: string;
  image: string;
  blurDataURL: string;
  price: string;
  features: string[];
  popular: boolean;
  popularLabel: string;
  selectLabel: string;
  selectedLabel: string;
  orderLabel: string;
}

export function ConfigurationCard({
  type,
  name,
  image,
  blurDataURL,
  price,
  features,
  popular,
  popularLabel,
  selectLabel,
  selectedLabel,
  orderLabel,
}: ConfigurationCardProps) {
  const { selectedConfig, selectConfig } = useConfigurator();
  const { openForm } = useConsultationForm();
  const isSelected = selectedConfig === type;

  return (
    <div
      className={`h-full relative rounded-lg border bg-white overflow-hidden transition-all duration-300 ${
        isSelected
          ? "ring-4 ring-[#FF5A2F] shadow-2xl border-[#FF5A2F]"
          : "border-gray-200 hover:shadow-xl"
      }`}
    >
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <Image
          alt={name}
          src={image}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 44px), min(370px, calc(33vw - 40px))"
          quality={75}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        {popular && (
          <div
            className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-lg flex items-center"
            style={{ backgroundColor: "#FF5A2F" }}
          >
            <StarOutlined className="mr-2" />
            {popularLabel}
          </div>
        )}
        {isSelected && (
          <div
            className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "#FF5A2F" }}
          >
            <CheckOutlined className="text-white text-2xl" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{name}</h3>
          <span className="text-2xl font-bold" style={{ color: "#FF5A2F" }}>
            {price}
          </span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckOutlined
                className="mt-1 mr-3 flex-shrink-0"
                style={{ color: "#FF5A2F" }}
              />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <Button
            variant={isSelected ? "outline" : "primary"}
            size="lg"
            block
            onClick={() => selectConfig(type)}
          >
            {isSelected ? (
              <>
                <CheckOutlined /> {selectedLabel}
              </>
            ) : (
              selectLabel
            )}
          </Button>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="dark" size="lg" block onClick={openForm}>
                {orderLabel}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
