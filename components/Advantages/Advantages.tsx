import { Row, Col, Card } from "antd";
import { getTranslations } from "next-intl/server";
import { AdvantageCard } from "./AdvantageCard";
import { AdvantageIcon } from "./AdvantageIcon";
import { AnimatedHeading } from "./AnimatedHeading";

export async function Advantages() {
  const t = await getTranslations("advantages");

  const advantages = [
    { title: t("1.title"), description: t("1.desc") },
    { title: t("2.title"), description: t("2.desc") },
    { title: t("3.title"), description: t("3.desc") },
    { title: t("4.title"), description: t("4.desc") },
    { title: t("5.title"), description: t("5.desc") },
    { title: t("6.title"), description: t("6.desc") },
    { title: t("7.title"), description: t("7.desc") },
    { title: t("8.title"), description: t("8.desc") },
  ];

  return (
    <section id="advantages" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
          <div
            className="w-20 h-0.5 mx-auto"
            style={{ backgroundColor: "#FF5A2F" }}
          />
        </AnimatedHeading>

        <Row gutter={[24, 32]}>
          {advantages.map((advantage, index) => (
            <Col xs={24} sm={12} lg={6} key={index} style={{ display: "flex" }}>
              <AdvantageCard index={index}>
                <Card
                  hoverable
                  className="transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: "#e5e7eb",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  styles={{
                    body: { flex: 1, display: "flex", flexDirection: "column" },
                  }}
                >
                  <div className="text-center flex flex-col h-full">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#FF5A2F", color: "#ffffff" }}
                    >
                      <AdvantageIcon index={index} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-black">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-500 text-sm flex-1">
                      {advantage.description}
                    </p>
                  </div>
                </Card>
              </AdvantageCard>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
