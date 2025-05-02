"use client";

import React, { useState } from "react";
import { publications } from "@/data";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaBookOpen, FaUniversity } from "react-icons/fa";

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
  isFeatured = false,
}: {
  publication: Publication;
  isFeatured?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-black-200/60 to-black-100/95 backdrop-blur-md border border-white/10 ${
        isFeatured ? "p-8" : "p-6"
      } hover:shadow-purple/10 hover:border-purple/30 transition-all duration-300`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple/5 rounded-full filter blur-3xl -mr-10 -mt-10 z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`${
              isFeatured ? "w-12 h-12 rounded-xl" : "w-8 h-8 rounded-full mt-1"
            } bg-purple/10 flex items-center justify-center flex-shrink-0`}
          >
            <FaBookOpen className="text-purple" size={isFeatured ? 24 : 14} />
          </div>
          <h3
            className={`${
              isFeatured ? "text-2xl" : "text-lg"
            } font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple`}
          >
            {publication.title}
          </h3>
        </div>

        {/* Content */}
        <div className={`${isFeatured ? "" : "pl-11"} space-y-3`}>
          <div className="space-y-2">
            <div className="flex items-start">
              <span
                className={`text-white-100/60 ${isFeatured ? "w-24" : "w-20"} ${
                  isFeatured ? "text-base" : "text-sm"
                } flex-shrink-0`}
              >
                Authors:
              </span>
              <span
                className={`text-white ${
                  isFeatured ? "font-medium" : "text-sm"
                }`}
              >
                {publication.authors}
              </span>
            </div>
            <div className="flex items-start">
              <span
                className={`text-white-100/60 ${isFeatured ? "w-24" : "w-20"} ${
                  isFeatured ? "text-base" : "text-sm"
                } flex-shrink-0`}
              >
                Venue:
              </span>
              <span className={`text-white ${isFeatured ? "" : "text-sm"}`}>
                {publication.venue}
              </span>
            </div>
            <div className="flex items-start">
              <span
                className={`text-white-100/60 ${isFeatured ? "w-24" : "w-20"} ${
                  isFeatured ? "text-base" : "text-sm"
                } flex-shrink-0`}
              >
                Published:
              </span>
              <span className={`text-white ${isFeatured ? "" : "text-sm"}`}>
                {publication.year}
              </span>
            </div>
            <div className="flex items-start">
              <span
                className={`text-white-100/60 ${isFeatured ? "w-24" : "w-20"} ${
                  isFeatured ? "text-base" : "text-sm"
                } flex-shrink-0`}
              >
                Available:
              </span>
              <span className={`text-white ${isFeatured ? "" : "text-sm"}`}>
                {publication.available}
              </span>
            </div>
          </div>

          {/* Abstract */}
          <div className="mt-3 pt-3 border-t border-white/5">
            <h4
              className={`${
                isFeatured ? "text-lg" : "text-sm"
              } font-medium mb-2`}
            >
              Abstract:
            </h4>
            <p
              className={`text-white-100/${isFeatured ? "90" : "80"} ${
                isFeatured ? "text-base" : "text-sm"
              } leading-relaxed ${
                !isFeatured && !expanded ? "line-clamp-4" : ""
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
            {!isFeatured && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm text-purple mt-2 hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {/* View Publication Button */}
          {publication.link !== "#" && (
            <motion.div whileHover={{ y: -2 }} className="mt-4">
              <a
                href={publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple/90 to-blue-100/70 rounded-full text-white hover:from-purple hover:to-blue-100 transition-all duration-300"
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
  return (
    <div className="w-full py-16" id="publications">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
            Research Publications
          </span>
        </h1>
        <p className="mt-6 text-center text-white-100/90 max-w-3xl mx-auto">
          Contributing to the academic community through research on Computer
          Vision, Machine Learning, and AI applications.
        </p>
      </div>

      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {publications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              isFeatured={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
