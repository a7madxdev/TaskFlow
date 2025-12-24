"use client";

import { Toast as ToastType } from "@/context/ToastContext";
import { CheckLine, CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { style } from "motion/react-client";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

const ToastContainer = ({ toasts }: { toasts: ToastType[] }) => {
  const toastsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const toastsHights = toasts.map(
    (t) => toastsRef.current[t.id]?.offsetHeight ?? 0
  );
  function getTop(index: number) {
    return toastsHights
      .slice(0, index)
      .reduce((sum = 0, h = 0) => sum + h + 12, 0);
  }
  return (
    <div className="size-0 fixed top-3 left-3 bg-amber-400/50">
      <AnimatePresence>
        {toasts.map((toast, i) => (
          <Toast
            {...toast}
            key={toast.id}
            ref={(el) => (toastsRef.current[toast.id] = el)}
            index={i}
            getTop={getTop}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Toast = ({
  id,
  message,
  type,
  ref,
  index,
  getTop,
}: ToastType & {
  ref: (el: any) => any;
  index: number;
  getTop: (index: number) => number;
}) => {
  const types = {
    error: {
      style: "before:bg-red-500",
      icon: {
        JSX: CircleAlert,
        style: "text-red-500",
      },
    },
    success: {
      style: "before:bg-green-500",
      icon: {
        JSX: CheckLine,
        style: "text-green-500",
      },
    },
    info: {
      style: "before:bg-green-500",
      icon: {
        JSX: CheckLine,
        style: "text-green-500",
      },
    },
  };
  const Icon = types[type].icon.JSX;
  return (
    <motion.div
      className={twMerge(
        "bg-white w-70 rounded-sm p-2 pl-4 shadow-[0_2px_20px_-0px_#00000044] absolute flex before:w-0.5 before:h-[calc(100%-10px)] before:absolute before:left-1.75 before:top-1.25",
        types[type].style
      )}
      initial={{ opacity: 1, left: -300, top: getTop(index) ?? 0 }}
      animate={{ opacity: 1, left: 0, top: getTop(index) }}
      exit={{ opacity: 1, left: -300 }}
      transition={{ duration: 0.16 }}
      ref={ref}
    >
      <span
        className={twMerge(
          "h-5 grid place-items-center mr-1.5",
          types[type].icon.style
        )}
      >
        <Icon size={16} />
      </span>
      <p className="text-sm text-gray-700 flex-1">{message}</p>
    </motion.div>
  );
};

export default ToastContainer;
