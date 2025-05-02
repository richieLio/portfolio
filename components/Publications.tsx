"use client";

import React, { useState } from "react";
import { publications } from "@/data";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import Image from "next/image";

// Define the Publication type
interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  available: string;
  link: string;
}

const PublicationCard = ({
  publication,
  variants,
  index,
}: {
  publication: Publication;
  variants: any;
  index: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={variants}
      custom={index}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden bg-black-200/20 backdrop-blur-md p-6 transition-all duration-300"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-purple/10 flex items-center justify-center flex-shrink-0">
            <FaBookOpen className="text-purple" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">{publication.title}</h3>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-white w-20 text-sm flex-shrink-0">
                Authors:
              </span>
              <span className="text-white text-sm">{publication.authors}</span>
            </div>
            <div className="flex items-start">
              <span className="text-white w-20 text-sm flex-shrink-0">
                Venue:
              </span>
              <span className="text-white text-sm">{publication.venue}</span>
            </div>
            <div className="flex items-start">
              <span className="text-white w-20 text-sm flex-shrink-0">
                Published:
              </span>
              <span className="text-white text-sm">{publication.year}</span>
            </div>
            <div className="flex items-start">
              <span className="text-white w-20 text-sm flex-shrink-0">
                Available:
              </span>
              <span className="text-white text-sm">
                {publication.available}
              </span>
            </div>
          </div>

          {/* Abstract */}
          <div className="mt-3 pt-3 border-t border-white/5">
            <h4 className="text-sm font-medium mb-2 text-white">Abstract:</h4>
            <p
              className={`text-white text-sm leading-relaxed ${
                !expanded ? "line-clamp-3" : ""
              }`}
            >
              {publication.id === 1 ? (
                <>
                  Facial recognition systems often face challenges in balancing
                  accuracy and computational efficiency, particularly in
                  real-world environments with varying lighting conditions and
                  image quality. This research addresses these limitations by
                  implementing and comparing several machine learning
                  algorithms—K-Nearest Neighbors (KNN), Random Forest, and
                  Support Vector Machine (SVM)—and improving their performance
                  through ensemble techniques such as Voting and Stacking. The
                  process includes key steps like image preprocessing, facial
                  detection using &ldquo;hog&rdquo; and &ldquo;cnn&rdquo;
                  models, and feature extraction with facial encodings and Local
                  Binary Pattern (LBP). Our proposed method achieved a facial
                  recognition accuracy of 99.22%, exceeding the results of the
                  SVM (95.34%), demonstrating the effectiveness of integrating
                  machine learning models and applying ensemble methods.
                </>
              ) : (
                <>
                  Since the COVID-19 pandemic, wearing masks has become a common
                  practice worldwide. This study focuses on improving the
                  performance of existing masked facial recognition systems. The
                  approach integrates Mediapipe for reliable face detection,
                  combined with ResNet50 for feature extraction and a novel
                  Feature Concatenation technique. Our optimizations resulted in
                  a significant performance improvement, achieving a precision
                  of 99.47% on the Celebrity dataset, contributing to more
                  reliable applications in security, healthcare, and other
                  sectors.
                </>
              )}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-purple mt-2 hover:text-white transition-colors duration-300"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </div>

          {/* View Publication Button */}
          {publication.link !== "#" && (
            <motion.div whileHover={{ y: -2 }} className="mt-4">
              <a
                href={publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple/90 text-white hover:bg-purple transition-all duration-300"
              >
                <span>View Publication</span>
                <FaExternalLinkAlt className="ml-2" size={14} />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Publications = () => {
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
    <div className="w-full pl-10 overflow-hidden" id="publications">
      <div className="flex flex-col w-full mr-auto ml-0 pr-[25%]">
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="pl-10 mb-8"
        >
          <h1 className="heading mb-3 text-white text-left text-4xl md:text-5xl font-bold">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
              Research Publications
            </span>
          </h1>
          <p className="mt-4 text-left text-white max-w-3xl">
            Contributing to the academic community through research on Computer
            Vision, Machine Learning, and AI applications.
          </p>
        </motion.div>

        <motion.div
          className="w-full grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {publications.map((publication, index) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              variants={itemVariants}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Publications;
