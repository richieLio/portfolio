"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { FiSun, FiMoon, FiX } from "react-icons/fi";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // Close mobile menu after clicking a link
    setMobileMenuOpen(false);
  };

  return (
    <>
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
          <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 sm:px-5 py-2 sm:py-3 backdrop-blur-lg bg-black-100/80 border border-white/10 rounded-full shadow-lg">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="#"
                className="font-bold text-lg sm:text-xl mr-4 sm:mr-6 bg-clip-text text-transparent bg-gradient-to-r from-purple to-blue-100"
              >
                LHH
              </a>

              {/* Navigation Items - Desktop Only */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((navItem, idx: number) => (
                  <a
                    key={`link=${idx}`}
                    href={navItem.link}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToElement(navItem.link.substring(1)); // Remove the "#" from the link
                    }}
                    className="relative px-3 py-2 text-sm font-medium text-white-100 hover:text-white transition-colors rounded-full hover:bg-white/5"
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
                    <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                  ) : (
                    <FiMoon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  )}
                </button>
              )}

              {/* Mobile Navigation Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-full bg-gradient-to-r from-purple/20 to-blue-100/20 backdrop-blur-md border border-white/10"
                  aria-label="Open mobile menu"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black-300/70 backdrop-blur-sm z-[5001]"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[75%] max-w-[320px] bg-black-200/90 backdrop-blur-lg z-[5002] border-l border-white/10 shadow-xl"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header with close button */}
                <div className="flex justify-between items-center mb-8">
                  <a
                    href="#"
                    className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple to-blue-100"
                  >
                    LHH
                  </a>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-black-100/50"
                  >
                    <FiX className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Nav Items */}
                <nav className="flex flex-col space-y-3">
                  {navItems.map((navItem, idx) => (
                    <a
                      key={`mobile-link-${idx}`}
                      href={navItem.link}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToElement(navItem.link.substring(1));
                      }}
                      className="py-3 px-4 text-base font-medium text-white border-b border-white/10 hover:bg-white/5 transition-all"
                    >
                      {navItem.name}
                    </a>
                  ))}
                </nav>

                {/* Footer */}
                <div className="mt-auto pt-6 flex flex-col gap-4">
                  <div className="text-xs text-white/60">
                    <div>huyhoangl9903@gmail.com</div>
                    <div>www.hoanglh.id.vn</div>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/richieLio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/huy-hoang-le-03b57b353"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
