"use client";

import { useState, useRef, useEffect } from "react";
import { projects } from "@/data";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const RecentProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Set up resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        if (!isMobile) {
          startAutoScroll();
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, isMobile]);

  const startAutoScroll = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      // Create a continuous auto-scroll animation
      const animate = async () => {
        await controls.start({
          x: -(scrollWidth - clientWidth),
          transition: {
            duration: scrollWidth / 100, // Adjust speed
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      };

      animate();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div
      className="w-full px-4 sm:pr-10 text-white overflow-hidden rounded-xl"
      id="projects"
    >
      <div className="flex flex-col w-full mx-auto sm:ml-auto sm:mr-0 sm:pl-[10%] md:pl-[15%] lg:pl-[25%]">
        <motion.div
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="sm:pr-10 mb-6 sm:mb-10"
        >
          <h1 className="heading mb-2 sm:mb-3 text-white text-center sm:text-right text-3xl sm:text-4xl md:text-5xl font-bold">
            A small selection of{" "}
            <span className="text-white font-bold">recent projects</span>
          </h1>
          <p className="text-center sm:text-right text-white text-sm sm:text-base mb-2 sm:mb-4">
            Showing all {projects.length} projects
          </p>
        </motion.div>

        {isMobile ? (
          // Mobile Layout - Grid
          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative bg-black-200/20 backdrop-blur-md p-3 rounded-lg"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="relative w-full h-[180px] mb-3 overflow-hidden rounded">
                  <Image
                    src="/bg.png"
                    alt="bgimg"
                    className="absolute w-full h-full object-cover"
                    width={300}
                    height={180}
                  />
                  <Image
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0 object-contain"
                    width={300}
                    height={180}
                  />
                </div>

                <h1 className="font-bold text-lg mb-1 text-white">
                  {item.title}
                </h1>

                <p className="font-light text-sm text-white mb-3 line-clamp-2">
                  {item.des}
                </p>

                <div className="flex items-center flex-wrap">
                  {item.iconLists.map((icon, index) => (
                    <motion.div
                      key={index}
                      className="bg-transparent w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${2 * index}px)`,
                        zIndex: item.iconLists.length - index,
                      }}
                      whileHover={{ y: -5, scale: 1.1 }}
                    >
                      <Image
                        src={icon}
                        alt={`icon-${index}`}
                        className="p-1"
                        width={24}
                        height={24}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Desktop Layout - Horizontal Scroll
          <div className="relative w-full mt-4 overflow-hidden">
            <div ref={scrollRef} className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-10 px-6"
                animate={controls}
                initial={{ x: 0 }}
              >
                {projects.map((item, index) => (
                  <motion.div
                    className="flex-shrink-0 lg:min-h-[28rem] h-[28rem] sm:h-[36rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
                    key={item.id}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex flex-col w-full">
                      <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[32vh] h-[25vh] mb-6">
                        <div
                          className="relative w-full h-full overflow-hidden"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Image
                            src="/bg.png"
                            alt="bgimg"
                            className="w-full h-full object-cover"
                            width={570}
                            height={320}
                          />
                        </div>
                        <Image
                          src={item.img}
                          alt="cover"
                          className="z-10 absolute bottom-0"
                          width={570}
                          height={320}
                        />
                      </div>

                      <h1 className="font-bold lg:text-2xl md:text-xl text-base text-white">
                        {item.title}
                      </h1>

                      <p
                        className="lg:text-lg lg:font-normal font-light text-sm text-white"
                        style={{
                          margin: "0.5vh 0 1vh 0",
                          maxHeight: "3rem",
                          overflow: "hidden",
                        }}
                      >
                        {item.des}
                      </p>

                      <div className="flex items-center mt-4 mb-3">
                        <div className="flex items-center">
                          {item.iconLists.map((icon, index) => (
                            <motion.div
                              key={index}
                              className="bg-transparent lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                              style={{
                                transform: `translateX(-${3 * index}px)`,
                                zIndex: item.iconLists.length - index,
                              }}
                              whileHover={{ y: -5, scale: 1.1 }}
                            >
                              <Image
                                src={icon}
                                alt={`icon-${index}`}
                                className="p-1"
                                width={32}
                                height={32}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentProjects;
