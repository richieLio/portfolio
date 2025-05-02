"use client";

import React, { useState } from "react";
import { technicalSkills, softSkills } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    <div className="w-full px-4 sm:px-6 md:pr-10 overflow-hidden" id="skills">
      <div className="flex flex-col w-full mx-auto sm:ml-auto sm:mr-0 sm:pl-[10%] md:pl-[15%] lg:pl-[25%]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <motion.h1
            className="heading text-white text-3xl sm:text-4xl md:text-5xl font-bold"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
              Skills
            </span>
          </motion.h1>

          <div className="bg-black-200/30 backdrop-blur-md p-1 self-start sm:self-auto rounded">
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-sm
                      ${
                        activeTab === "technical"
                          ? "bg-purple/90 text-white"
                          : "text-white hover:text-purple"
                      }`}
            >
              Technical Skills
            </button>
            <button
              onClick={() => setActiveTab("soft")}
              className={`px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-sm
                      ${
                        activeTab === "soft"
                          ? "bg-purple/90 text-white"
                          : "text-white hover:text-purple"
                      }`}
            >
              Soft Skills
            </button>
          </div>
        </div>

        <div className="w-full">
          {activeTab === "technical" ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {technicalSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  category={skill.category}
                  skills={skill.skills}
                  icon={skill.icon}
                  variants={itemVariants}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {softSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  category={skill.category}
                  skills={skill.skills}
                  icon={skill.icon}
                  variants={itemVariants}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({
  category,
  skills,
  icon,
  variants,
  index,
}: {
  category: string;
  skills: string;
  icon: string;
  variants: any;
  index: number;
}) => {
  // Chuyển đổi chuỗi kỹ năng thành mảng và chia nhỏ
  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Hiển thị card ngay cả khi không có kỹ năng (bỏ phần filter)
  return (
    <motion.div
      variants={variants}
      custom={index}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden bg-black-200/20 backdrop-blur-md p-4 sm:p-5 h-full rounded-lg"
    >
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3 bg-black-300/30 p-1.5 sm:p-2 flex items-center justify-center rounded-md">
            <Image
              src={icon}
              alt={category}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {category}
          </h3>
        </div>

        <div className="text-white text-xs sm:text-sm space-y-1.5 sm:space-y-2">
          {skillList.length > 0 ? (
            <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
              {skillList.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple/70 mr-2 rounded-full"></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/60 italic text-xs">No skills listed</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
