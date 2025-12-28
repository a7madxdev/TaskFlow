"use client";

import { icon } from "@/lib/definitions";
import { Eye, EyeClosed } from "lucide-react";
import { JSX, RefObject, useState } from "react";
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
  ref,
  onFocus,
  onBlur,
}: {
  type: string;
  name?: string;
  Icon?: icon;
  value?: any;
  setValue?: any;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ref?: RefObject<null>;
  onFocus?: () => void;
  onBlur?: () => void;
}): JSX.Element => {
  const [passVisible, setPassVisible] = useState(false);
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
        className={`${Icon ? "" : "px-2"} text-sm min-w-0 flex-1`}
        type={type !== "password" ? type : passVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {type === "password" && (
        <button
          className="h-full w-8 grid place-items-center cursor-pointer"
          type="button"
          onClick={() => setPassVisible((prev) => !prev)}
        >
          {passVisible ? <Eye size={17} /> : <EyeClosed size={17} />}
        </button>
      )}
    </div>
  );
};

export default InputField;
