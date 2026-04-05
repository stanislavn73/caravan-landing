"use client";

import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

export function PhoneIcon() {
  return <PhoneOutlined className="mr-2" style={{ color: "#FF5A2F" }} />;
}

export function MailIcon() {
  return <MailOutlined className="mr-2" style={{ color: "#FF5A2F" }} />;
}

export function LocationIcon() {
  return (
    <EnvironmentOutlined className="mr-2 mt-1" style={{ color: "#FF5A2F" }} />
  );
}

export function SocialIcons() {
  return (
    <div className="flex space-x-3">
      <a
        href="#"
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <FacebookOutlined className="text-lg" />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <InstagramOutlined className="text-lg" />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <YoutubeOutlined className="text-lg" />
      </a>
    </div>
  );
}
