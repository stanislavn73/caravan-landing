import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

export function FooterPhoneIcon() {
  return <PhoneOutlined className="mr-2" style={{ color: "#FF5A2F" }} />;
}

export function FooterMailIcon() {
  return <MailOutlined className="mr-2" style={{ color: "#FF5A2F" }} />;
}

export function FooterLocationIcon() {
  return <EnvironmentOutlined className="mr-2 mt-1" style={{ color: "#FF5A2F" }} />;
}

export function SocialIcons() {
  return (
    <div className="flex space-x-3">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <FacebookOutlined className="text-lg" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <InstagramOutlined className="text-lg" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <YoutubeOutlined className="text-lg" />
      </a>
    </div>
  );
}
