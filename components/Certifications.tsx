"use client";

import React from "react";
import { certifications } from "@/data";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaAward } from "react-icons/fa";
import Image from "next/image";

const Certifications = () => {
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
    <div className="w-full pr-10 overflow-hidden" id="certifications">
      <div className="flex flex-col w-full ml-auto mr-0 pl-[25%]">
        <motion.div
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="pr-10 mb-8"
        >
          <h1 className="heading mb-3 text-white text-right text-4xl md:text-5xl font-bold">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
              Certifications
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-black-200/20 backdrop-blur-md overflow-hidden transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="relative group w-full h-[200px] overflow-hidden">
                  <div className="absolute inset-0 bg-black-300/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple/90 hover:bg-purple px-4 py-2 text-white flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
                    >
                      <span>View Certificate</span>
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                  <div className="absolute inset-0 w-full h-full p-2">
                    <div className="w-full h-full overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {cert.title}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-white w-20 text-sm">Issuer:</span>
                      <span className="text-white">{cert.issuer}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-white w-20 text-sm">Year:</span>
                      <span className="text-white">{cert.year}</span>
                    </div>

                    <div className="flex items-start mt-2">
                      <span className="text-white w-20 text-sm">Skills:</span>
                      <div className="flex flex-wrap gap-2">
                        {cert.id === 1 ? (
                          [
                            "Project Management",
                            "Software Development",
                            "UX Design",
                          ].map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs bg-black-300/20 text-white"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="px-3 py-1 text-xs bg-black-300/20 text-white">
                            {cert.id === 2 ? "Project Management" : "UX Design"}
                          </span>
                        )}
                      </div>
                    </div>
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

export default Certifications;
