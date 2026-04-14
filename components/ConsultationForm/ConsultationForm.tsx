"use client";

import { useState } from "react";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

type CaravanType = "wide" | "offroad";
type ConfigType = "base" | "comfort" | "pro";

const ADDITIONAL_ITEMS = [
  "solar",
  "roof",
  "awning",
  "storage",
  "bike",
  "kitchen",
  "heating",
  "bed",
  "lighting",
  "electric",
] as const;

type AdditionalItem = (typeof ADDITIONAL_ITEMS)[number];

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  caravanType: CaravanType;
  configuration: ConfigType;
  additionalItems: AdditionalItem[];
}

const INITIAL_VALUES: FormValues = {
  name: "",
  phone: "",
  email: "",
  caravanType: "wide",
  configuration: "base",
  additionalItems: [],
};

export function ConsultationForm() {
  const t = useTranslations("form");
  const { open, closeForm } = useConsultationForm();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) newErrors.name = t("nameRequired");
    if (!values.phone.trim()) newErrors.phone = t("phoneRequired");
    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      newErrors.email = t("emailInvalid");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form submitted:", values);
    toast.success(t("success"));
    setValues(INITIAL_VALUES);
    setErrors({});
    closeForm();
  };

  const handleChange = (field: keyof Pick<FormValues, "name" | "phone" | "email">, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleAdditionalItem = (item: AdditionalItem) => {
    setValues((prev) => ({
      ...prev,
      additionalItems: prev.additionalItems.includes(item)
        ? prev.additionalItems.filter((i) => i !== item)
        : [...prev.additionalItems, item],
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 z-[1000]"
            onClick={closeForm}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-lg shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-0">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "#FF5A2F" }}
                >
                  {t("title")}
                </h3>
                <button
                  onClick={closeForm}
                  className="w-8 h-8 flex items-center justify-center text-2xl text-gray-400 hover:text-gray-700 bg-transparent border-0 cursor-pointer"
                  aria-label="Close form"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Type of Caravan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("caravanType")}
                  </label>
                  <div className="flex gap-3">
                    {(["wide", "offroad"] as CaravanType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setValues((prev) => ({ ...prev, caravanType: type }))
                        }
                        className={`flex-1 h-11 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                          values.caravanType === type
                            ? "border-[#FF5A2F] bg-[#FF5A2F] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-[#FF5A2F]"
                        }`}
                      >
                        {t(type)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Configuration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("configuration")}
                  </label>
                  <div className="flex gap-3">
                    {(["base", "comfort", "pro"] as ConfigType[]).map((cfg) => (
                      <button
                        key={cfg}
                        type="button"
                        onClick={() =>
                          setValues((prev) => ({ ...prev, configuration: cfg }))
                        }
                        className={`flex-1 h-11 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                          values.configuration === cfg
                            ? "border-[#FF5A2F] bg-[#FF5A2F] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-[#FF5A2F]"
                        }`}
                      >
                        {t(cfg)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("additionalItems")}
                  </label>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {ADDITIONAL_ITEMS.map((item) => {
                      const checked = values.additionalItems.includes(item);
                      return (
                        <label
                          key={item}
                          className="flex items-center gap-2.5 py-1.5 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAdditionalItem(item)}
                            className="w-4 h-4 rounded accent-[#FF5A2F] cursor-pointer"
                          />
                          <span className="text-sm text-gray-700">
                            {t(item)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <span className="text-red-500 mr-0.5">*</span>
                    {t("name")}
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#FF5A2F" }}
                    >
                      <UserOutlined />
                    </span>
                    <input
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("namePlaceholder")}
                      className={`w-full h-11 pl-10 pr-4 rounded-lg border text-base transition-colors outline-none ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#FF5A2F]"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <span className="text-red-500 mr-0.5">*</span>
                    {t("phone")}
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#FF5A2F" }}
                    >
                      <PhoneOutlined />
                    </span>
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder={t("phonePlaceholder")}
                      className={`w-full h-11 pl-10 pr-4 rounded-lg border text-base transition-colors outline-none ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#FF5A2F]"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("email")}
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#FF5A2F" }}
                    >
                      <MailOutlined />
                    </span>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className={`w-full h-11 pl-10 pr-4 rounded-lg border text-base transition-colors outline-none ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#FF5A2F]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  block
                  className="shadow-md hover:shadow-lg"
                >
                  {t("submit")}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
