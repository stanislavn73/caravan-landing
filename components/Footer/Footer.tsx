import Image from "next/image";
import { Row, Col } from "antd";
import { getTranslations } from "next-intl/server";
import {
  PhoneIcon,
  MailIcon,
  LocationIcon,
  SocialIcons,
} from "./FooterIcons";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div className="mb-4 relative h-20 w-40">
              <Image
                src="/images/respo-logo.webp"
                alt="Respo Caravan Logo"
                width={160}
                height={80}
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">{t("description")}</p>
          </Col>
          <Col xs={24} md={8}>
            <h4 className="text-lg font-bold mb-3">{t("contacts")}</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <PhoneIcon />
                <span>+380 XX XXX XX XX</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <MailIcon />
                <span>info@respocaravan.com</span>
              </div>
              <div className="flex items-start text-gray-400 hover:text-white transition-colors text-sm">
                <LocationIcon />
                <span>Kyiv, Ukraine</span>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <h4 className="text-lg font-bold mb-3">{t("followUs")}</h4>
            <SocialIcons />
            <div className="mt-4 space-y-1">
              <a
                href="/privacy"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t("privacy")}
              </a>
              <a
                href="/terms"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t("terms")}
              </a>
            </div>
          </Col>
        </Row>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
