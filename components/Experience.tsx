"use client";
import React from "react";
import { workExperience } from "@/data";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

const Experience = () => {
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
    hidden: { y: 30, opacity: 0 },
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
      className="w-full px-4 sm:pl-6 md:pl-10 overflow-hidden"
      id="experience"
    >
      <div className="flex flex-col w-full mr-auto ml-0 sm:pr-6 md:pr-[15%] lg:pr-[25%]">
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="sm:pl-6 md:pl-10 mb-6 sm:mb-8"
        >
          <h1 className="heading mb-2 sm:mb-3 text-white text-left text-3xl sm:text-4xl md:text-5xl font-bold">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
              Experience
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {workExperience.map((job, index) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="w-full relative bg-black-200/20 backdrop-blur-md p-3 sm:p-5 hover:bg-black-200/30 transition-all duration-300"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative z-10">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={job.thumbnail}
                      alt={job.title}
                      width={56}
                      height={56}
                      className="w-10 h-10 sm:w-14 sm:h-14 object-contain p-1 sm:p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">
                      {job.duration || "2022 - Present"}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mt-1 text-white">
                      {job.title}
                    </h3>
                    <h4 className="text-xs sm:text-sm text-purple mb-1 sm:mb-2">
                      {job.company || "Company Name"}
                    </h4>
                    <p className="text-white text-xs sm:text-sm leading-relaxed">
                      {job.desc}
                    </p>

                    {/* Technologies/Skills Used */}
                    {job.skills && (
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                        {job.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-[10px] sm:text-xs bg-black-300/20 text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View Details Link */}
                    {job.link && (
                      <a
                        href={job.link}
                        className="mt-2 sm:mt-3 inline-flex items-center text-xs sm:text-sm text-purple hover:text-white transition-colors duration-300 group"
                      >
                        <span>View Details</span>
                        <BsArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
