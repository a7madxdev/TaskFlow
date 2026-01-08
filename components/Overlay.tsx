import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

const Overlay = ({ theme }: { theme: "dark" | "light" }) => {
  return (
    <motion.div
      className={twMerge(
        "w-dvw h-dvh fixed top-0 left-0 backdrop-blur-xs z-5",
        theme === "light" ? "bg-white/15" : "bg-black/15"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    ></motion.div>
  );
};

export default Overlay;
