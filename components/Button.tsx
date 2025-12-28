import { JSX, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  type,
  className,
  style = "default",
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  style?: "default" | "primary" | "danger";
  onClick?: any;
  disabled?: boolean;
}) => {
  const styles = {
    default: "bg-gray-300 text-black font-normal",
    primary: "bg-blue-500 text-white font-medium",
    danger: "bg-red-500 text-white font-medium",
  };
  return (
    <button
      type={type}
      className={twMerge(
        "h-7 px-3 rounded-sm text-sm duration-150 hover:scale-96",
        className,
        disabled && "opacity-50 pointer-events-none",
        styles[style]
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
