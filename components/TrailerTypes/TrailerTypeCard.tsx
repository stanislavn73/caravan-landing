"use client";

import Image from "next/image";
import { CheckOutlined } from "@ant-design/icons";
import { useConfigurator } from "@/components/ConfiguratorContext";
import { Button } from "@/components/ui/Button";

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
    <div
      className={`h-full rounded-lg overflow-hidden transition-all duration-300 bg-white ${
        isSelected ? "shadow-2xl" : "hover:shadow-xl"
      }`}
      style={{
        border: isSelected ? "3px solid #FF5A2F" : "1px solid #e5e7eb",
      }}
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
        <div className="flex justify-center">
          <div className="w-fit max-w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-black">{name}</h3>
            <div className="mb-6 space-y-2 text-left">
              {specs.map((spec, idx) => (
                <div key={idx} className="text-gray-700 text-sm">
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant={isSelected ? "primary" : "default"}
          size="md"
          block
          onClick={() => selectTrailerType(type)}
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
    </div>
  );
}
