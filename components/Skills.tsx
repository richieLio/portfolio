"use client";

import React, { useState } from "react";
import { technicalSkills, softSkills } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("technical");

  return (
    <div className="py-16 w-full" id="skills">
      <div className="flex flex-col items-center justify-center mb-16">
        <h2 className="text-sm uppercase tracking-[0.3em] text-blue-100 font-medium mb-4">
          Professional Expertise
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
            Skills
          </span>
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-black-200/50 backdrop-blur-md p-1 rounded-full">
          <button
            onClick={() => setActiveTab("technical")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 
                      ${
                        activeTab === "technical"
                          ? "bg-gradient-to-r from-purple/90 to-blue-100/70 text-white shadow-lg"
                          : "text-white-100 hover:text-white"
                      }`}
          >
            Technical Skills
          </button>
          <button
            onClick={() => setActiveTab("soft")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 
                      ${
                        activeTab === "soft"
                          ? "bg-gradient-to-r from-purple/90 to-blue-100/70 text-white shadow-lg"
                          : "text-white-100 hover:text-white"
                      }`}
          >
            Soft Skills
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto">
        {activeTab === "technical" ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {technicalSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                category={skill.category}
                skills={skill.skills}
                icon={skill.icon}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {softSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                category={skill.category}
                skills={skill.skills}
                icon={skill.icon}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SkillCard = ({
  category,
  skills,
  icon,
}: {
  category: string;
  skills: string;
  icon: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(203, 172, 249, 0.1)" }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black-200/70 to-black-100/90 backdrop-blur-md border border-white/10 p-5 h-full"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 rounded-full filter blur-3xl -mr-10 -mt-10 z-0"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 mr-3 bg-black-300/40 rounded-lg p-2 flex items-center justify-center">
            <Image
              src={icon}
              alt={category}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple">
            {category}
          </h3>
        </div>

        <div className="text-white-100 text-sm space-y-2">
          {skills.split(",").map((skill, index) => (
            <div key={index} className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-purple/70 mr-2"></div>
              <span>{skill.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
