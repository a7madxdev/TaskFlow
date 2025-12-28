import { CircleCheck, CircleHelp, CircleX } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface TipType {
  content: string;
  type?: "default" | "error" | "success";
}

const Tip = ({ content, type = "default" }: TipType) => {
  const types = {
    default: {
      style: "bg-gray-200 text-gray-700",
      icon: CircleHelp,
    },
    error: {
      style: "bg-red-100 text-red-500",
      icon: CircleX,
    },
    success: {
      style: "bg-green-100 text-green-700",
      icon: CircleCheck,
    },
  };
  const Icon = types[type].icon;
  return (
    <div
      className={twMerge(
        "min-h-5 text-sm w-fit rounded-sm px-2 py-1 mt-2 flex gap-1 wrap-break-word",
        types[type].style
      )}
    >
      <span className="h-5 flex items-center">
        <Icon size={14} />
      </span>
      <p className="flex-1">{content}</p>
    </div>
  );
};

export default Tip;
