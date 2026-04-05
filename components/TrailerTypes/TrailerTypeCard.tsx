"use client";

import Image from "next/image";
import { Card, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useConfigurator } from "@/components/ConfiguratorContext";

interface TrailerTypeCardProps {
  type: "wide" | "offroad";
  name: string;
  image: string;
  blurDataURL: string;
  specs: string[];
  selectLabel: string;
  selectedLabel: string;
}

export function TrailerTypeCard({
  type,
  name,
  image,
  blurDataURL,
  specs,
  selectLabel,
  selectedLabel,
}: TrailerTypeCardProps) {
  const { selectedTrailerType, selectTrailerType } = useConfigurator();
  const isSelected = selectedTrailerType === type;

  return (
    <Card
      hoverable
      className={`h-full transition-all duration-300 overflow-hidden ${
        isSelected ? "shadow-2xl" : "hover:shadow-xl"
      }`}
      style={{
        border: isSelected ? "3px solid #FF5A2F" : "1px solid #e5e7eb",
      }}
      styles={{ body: { padding: 0 } }}
    >
      <div
        className="relative bg-white flex items-center justify-center px-6"
        style={{ height: "240px", paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="relative w-full h-[200px]">
          <Image
            alt={name}
            src={image}
            fill
            className="object-contain"
            sizes="(max-width: 1023px) calc(100vw - 80px), min(550px, calc(50vw - 48px))"
            quality={80}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </div>
      <div className="px-6 pb-6 pt-4">
        <h3
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "#000000" }}
        >
          {name}
        </h3>
        <div className="mb-6 space-y-2 text-center">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <span className="text-gray-700 text-sm">{spec}</span>
            </div>
          ))}
        </div>
        <Button
          type={isSelected ? "primary" : "default"}
          size="large"
          block
          onClick={() => selectTrailerType(type)}
          className="h-11 font-semibold transition-all duration-300"
          style={{
            backgroundColor: isSelected ? "#FF5A2F" : "#ffffff",
            borderColor: isSelected ? "#FF5A2F" : "#d9d9d9",
            color: isSelected ? "#ffffff" : "#000000",
          }}
        >
          {isSelected ? (
            <>
              <CheckOutlined /> {selectedLabel}
            </>
          ) : (
            selectLabel
          )}
        </Button>
      </div>
    </Card>
  );
}
