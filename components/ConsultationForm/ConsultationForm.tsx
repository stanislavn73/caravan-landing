"use client";

import { useState } from "react";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export function ConsultationForm() {
  const t = useTranslations("form");
  const { open, closeForm } = useConsultationForm();
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) newErrors.name = t("nameRequired");
    if (!values.phone.trim()) newErrors.phone = t("phoneRequired");
    if (!values.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
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
    setValues({ name: "", phone: "", email: "" });
    setErrors({});
    closeForm();
  };

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("name")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#FF5A2F" }}>
                      <UserOutlined />
                    </span>
                    <input
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("namePlaceholder")}
                      className={`w-full h-11 pl-10 pr-4 rounded-lg border text-base transition-colors ${
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("phone")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#FF5A2F" }}>
                      <PhoneOutlined />
                    </span>
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder={t("phonePlaceholder")}
                      className={`w-full h-11 pl-10 pr-4 rounded-lg border text-base transition-colors ${
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("email")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#FF5A2F" }}>
                      <MailOutlined />
                    </span>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className={`w-full h-11 pl-10 pr-4 rounded-lg border text-base transition-colors ${
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
