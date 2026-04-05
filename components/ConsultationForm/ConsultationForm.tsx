"use client";

import { Modal, Form, Input, Button } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useConsultationForm } from "@/components/ConsultationFormContext";

export function ConsultationForm() {
  const [form] = Form.useForm();
  const t = useTranslations("form");
  const { open, closeForm } = useConsultationForm();

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Form submitted:", values);
    toast.success(t("success"));
    form.resetFields();
    closeForm();
  };

  return (
    <Modal
      open={open}
      onCancel={closeForm}
      footer={null}
      width={600}
      centered
      title={
        <h3 className="text-2xl font-bold" style={{ color: "#FF5A2F" }}>
          {t("title")}
        </h3>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-6"
        size="large"
      >
        <Form.Item
          name="name"
          label={t("name")}
          rules={[{ required: true, message: t("nameRequired") }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "#FF5A2F" }} />}
            placeholder={t("namePlaceholder")}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t("phone")}
          rules={[{ required: true, message: t("phoneRequired") }]}
        >
          <Input
            prefix={<PhoneOutlined style={{ color: "#FF5A2F" }} />}
            placeholder={t("phonePlaceholder")}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("email")}
          rules={[
            { required: true, message: t("emailRequired") },
            { type: "email", message: t("emailInvalid") },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "#FF5A2F" }} />}
            placeholder={t("emailPlaceholder")}
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="h-12 font-semibold"
            style={{ backgroundColor: "#FF5A2F", borderColor: "#FF5A2F" }}
          >
            {t("submit")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
