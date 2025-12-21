import { icon } from "@/lib/definitions";
import { JSX } from "react";
import { twMerge } from "tailwind-merge";

const InputField = ({
  type = "text",
  Icon,
  name,
  value,
  setValue,
  placeholder,
  className,
  disabled = false,
}: {
  type: string;
  name?: string;
  Icon?: icon;
  value?: any;
  setValue?: any;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <div
      className={twMerge(
        "flex h-8 w-full rounded-sm border border-black/25",
        className,
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {Icon && (
        <span className="h-full w-8 grid place-items-center">
          <Icon size={18} />
        </span>
      )}
      <input
        className={`${Icon ? "" : "px-2"} text-sm flex-1`}
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
