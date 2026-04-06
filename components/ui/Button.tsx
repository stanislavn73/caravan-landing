import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "dark" | "ghost" | "default";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  children: ReactNode;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: 36, paddingLeft: 16, paddingRight: 16, fontSize: 14 },
  md: { height: 44, paddingLeft: 24, paddingRight: 24, fontSize: 16 },
  lg: { height: 48, paddingLeft: 32, paddingRight: 32, fontSize: 16 },
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#FF5A2F",
    color: "#ffffff",
    border: "1px solid #FF5A2F",
    boxShadow: "0 4px 12px rgba(255, 90, 47, 0.3)",
  },
  outline: {
    backgroundColor: "#ffffff",
    color: "#FF5A2F",
    border: "1px solid #FF5A2F",
  },
  dark: {
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "1px solid #000000",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "inherit",
    border: "1px solid transparent",
  },
  default: {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #d9d9d9",
  },
};

export function Button({
  variant = "default",
  size = "md",
  block = false,
  className = "",
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-semibold
        transition-all duration-300
        ${block ? "w-full" : ""}
        ${className}
      `.trim()}
      style={{
        fontFamily: "inherit",
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
