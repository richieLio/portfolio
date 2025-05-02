"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  title: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
}

const AnimatedButton = ({
  title,
  icon,
  href,
  onClick,
}: AnimatedButtonProps) => {
  const buttonContent = (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white flex items-center gap-2 group"
      initial={{ opacity: 0.9 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      onClick={onClick}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
      />

      {/* Text with animation */}
      <motion.span
        className="relative z-10 font-medium"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {title}
      </motion.span>

      {/* Icon with animation */}
      {icon && (
        <motion.span
          className="relative z-10"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {icon}
        </motion.span>
      )}

      {/* White line animation from left */}
      <motion.div
        className="absolute left-0 bottom-0 h-[2px] bg-white"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );

  if (href) {
    return <a href={href}>{buttonContent}</a>;
  }

  return buttonContent;
};

export default AnimatedButton;
