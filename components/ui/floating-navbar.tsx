"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const scrollToElement = (targetId: string, duration = 1000) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className={cn(
          "flex fixed top-6 inset-x-0 mx-auto z-[5000] justify-between items-center",
          className
        )}
      >
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-5 py-3 backdrop-blur-lg bg-black-100/80 border border-white/10 rounded-full shadow-lg">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="font-bold text-xl mr-6 bg-clip-text text-transparent bg-gradient-to-r from-purple to-blue-100"
            >
              LHH
            </a>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((navItem, idx: number) => (
                <a
                  key={`link=${idx}`}
                  href={navItem.link}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement(navItem.link.substring(1)); // Remove the "#" from the link
                  }}
                  className="relative px-4 py-2 text-sm font-medium text-white-100 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  {navItem.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-black-200/50 hover:bg-black-200/70 transition-colors border border-white/10"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-slate-400" />
                )}
              </button>
            )}

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-full bg-gradient-to-r from-purple/20 to-blue-100/20 backdrop-blur-md border border-white/10"
                aria-label="Open mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
