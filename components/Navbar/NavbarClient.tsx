"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  MenuOutlined,
  GlobalOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

interface MenuItem {
  key: string;
  label: string;
}

interface NavbarClientProps {
  menuItems: MenuItem[];
  locale: string;
}

export function NavbarClient({ menuItems, locale }: NavbarClientProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      const sections = [
        "hero",
        "types",
        "configurations",
        "specs",
        "advantages",
        "calculator",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  // Color scheme: over hero (not sticky) = orange text on transparent bg
  // After scroll (sticky) = white/gray text on dark bg
  const navTextColor = isSticky ? "text-white" : "text-black md:text-[#FF5A2F]";
  const navTextColorMuted = isSticky
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 md:text-[#FF5A2F]/70 hover:text-gray-900 md:hover:text-[#FF5A2F]";
  const dividerColor = isSticky ? "bg-white/30" : "bg-gray-300 md:bg-[#FF5A2F]/30";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isSticky
            ? "bg-black/95 backdrop-blur-md shadow-lg"
            : "bg-white md:bg-transparent shadow-md md:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={() => (window.location.href = "/")}
                className={`${navTextColor} hover:text-[#FF5A2F] transition-colors hidden sm:flex items-center px-2 py-1`}
              >
                <ArrowLeftOutlined />
                <span className="ml-2 text-sm md:text-base">
                  Respo Trailers
                </span>
              </button>
              <div
                className={`h-6 md:h-8 w-px ${dividerColor} hidden sm:block`}
                aria-hidden="true"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center cursor-pointer relative h-8 md:h-10 w-auto"
                onClick={() => scrollToSection("hero")}
              >
                <Image
                  src="/images/logo-vertical.webp"
                  alt="Respo Logo"
                  width={120}
                  height={40}
                  className={`h-8 md:h-10 w-auto object-contain ${!isSticky ? "invert brightness-0 md:invert-0 md:brightness-100" : ""}`}
                  priority
                />
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.key
                      ? "text-white"
                      : navTextColorMuted
                  }`}
                  style={{
                    backgroundColor:
                      activeSection === item.key ? "#FF5A2F" : "transparent",
                  }}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-4 flex items-center space-x-2">
                <GlobalOutlined
                  className={`text-lg ${isSticky ? "text-white" : "text-gray-700 md:text-[#FF5A2F]"}`}
                />
                <button
                  onClick={() => switchLocale("en")}
                  className={`px-3 py-1 rounded transition-colors ${
                    locale === "en"
                      ? "bg-[#FF5A2F] text-white"
                      : navTextColorMuted
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale("ua")}
                  className={`px-3 py-1 rounded transition-colors ${
                    locale === "ua"
                      ? "bg-[#FF5A2F] text-white"
                      : navTextColorMuted
                  }`}
                >
                  UA
                </button>
              </div>
            </div>

            <motion.div whileTap={{ scale: 0.95 }} className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="flex items-center justify-center w-12 h-12 hover:bg-orange-50/50 active:bg-orange-100/50 transition-all duration-200 rounded-lg"
              >
                <MenuOutlined
                  className="text-2xl"
                  style={{ color: "#FF5A2F" }}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/45 z-[200]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[201] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <div className="flex items-center relative h-7 w-[140px]">
                  <Image
                    src="/images/logo-vertical.webp"
                    alt="Respo Logo"
                    width={140}
                    height={28}
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center text-2xl text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col space-y-3"
                >
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="flex items-center gap-2 h-12 px-4 text-base rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ border: "1px solid #e5e7eb", backgroundColor: "#ffffff" }}
                  >
                    <ArrowLeftOutlined />
                    Respo Trailers
                  </button>
                  <div className="h-px bg-gray-200 my-2" />
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.key)}
                      className={`px-5 py-4 rounded-lg text-left transition-all text-base font-medium ${
                        activeSection === item.key
                          ? "text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      style={{
                        backgroundColor:
                          activeSection === item.key
                            ? "#FF5A2F"
                            : "transparent",
                      }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="pt-6 border-t border-gray-200 mt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <GlobalOutlined className="text-xl text-gray-700" />
                      <span className="font-semibold text-base">Language</span>
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          switchLocale("en");
                          setMobileMenuOpen(false);
                        }}
                        className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium ${
                          locale === "en"
                            ? "bg-[#FF5A2F] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        English
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          switchLocale("ua");
                          setMobileMenuOpen(false);
                        }}
                        className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium ${
                          locale === "ua"
                            ? "bg-[#FF5A2F] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Українська
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
