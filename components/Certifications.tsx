"use client";

import React, { useState } from "react";
import { certifications } from "@/data";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaAward } from "react-icons/fa";
import Image from "next/image";

const Certifications = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="py-16 w-full" id="certifications">
      <div className="flex flex-col md:flex-row items-center mb-16">
        <div className="hidden md:block md:w-5/12 lg:w-5/12"></div>

        <div className="md:w-7/12 lg:w-7/12">
          <div className="flex flex-col items-center md:items-start justify-center">
            <h2 className="text-sm uppercase tracking-[0.3em] text-blue-100 font-medium mb-4">
              Professional Growth
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
                Certifications
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="md:w-8/12 md:ml-auto">
        <div className="grid md:grid-cols-1 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-black-200/60 to-black-100/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple/10 hover:border-purple/20 transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="relative group w-full h-[240px] md:h-[280px] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-black-300/30 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple/90 hover:bg-purple px-4 py-2 rounded-full text-white flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
                    >
                      <span>View Certificate</span>
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                  <div className="absolute inset-0 w-full h-full p-2">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
                      {cert.title}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-white-100/60 w-24">Issuer:</span>
                        <span className="text-white">{cert.issuer}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-white-100/60 w-24">Year:</span>
                        <span className="text-white">{cert.year}</span>
                      </div>

                      <div className="flex items-center mt-2">
                        <span className="text-white-100/60 w-24">Skills:</span>
                        <div className="flex flex-wrap gap-2">
                          {cert.id === 1 ? (
                            [
                              "Project Management",
                              "Software Development",
                              "UX Design",
                            ].map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs rounded-full bg-black-300/40 text-white-100"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1 text-xs rounded-full bg-black-300/40 text-white-100">
                              {cert.id === 2
                                ? "Project Management"
                                : "UX Design"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
