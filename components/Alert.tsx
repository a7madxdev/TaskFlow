"use client";

import { MouseEvent, startTransition, useEffect, useRef } from "react";
import Button from "./Button";
import { motion } from "motion/react";

interface AlertProps {
  title: string;
  message: string;
  btnText: string;
  btnStyle: "default" | "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const Alert = ({
  title,
  message,
  btnText,
  btnStyle = "primary",
  onConfirm,
  onCancel,
  loading,
}: AlertProps) => {
  const alertRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (alertRef.current && !alertRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <motion.div
      className="fixed top-5 z-10 max-w-[calc(100%-40px)] w-75 bg-white p-3 rounded-md"
      initial={{ left: -20, opacity: 0 }}
      animate={{ left: 20, opacity: 1 }}
      exit={{ left: -20, opacity: 0 }}
      transition={{ duration: 0.16 }}
      ref={alertRef}
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-sm mt-1">{message}</p>
      <div className="flex justify-end gap-2 mt-5">
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button style={btnStyle} onClick={() => onConfirm()} disabled={loading}>
          {btnText}
        </Button>
      </div>
    </motion.div>
  );
};

export default Alert;
