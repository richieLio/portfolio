import React from "react";
import { workExperience } from "@/data";
import { BsArrowRight } from "react-icons/bs";

const Experience = () => {
  return (
    <div className="py-12 w-full">
      <div className="flex flex-col md:flex-row items-center mb-16">
        <div className="md:w-7/12 lg:w-7/12">
          <div className="flex flex-col items-center md:items-start justify-center">
            <h2 className="text-sm uppercase tracking-[0.3em] text-blue-100 font-medium mb-4">
              Career Path
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
                Experience
              </span>
            </h1>
          </div>
        </div>

        <div className="hidden md:block md:w-5/12 lg:w-5/12"></div>
      </div>

      {/* Timeline Design */}
      <div className="relative flex flex-col space-y-8 w-full max-w-4xl mx-auto md:mr-auto md:ml-0 md:pr-16">
        {/* Vertical Line - Shifted to left */}
        <div className="absolute top-0 left-8 md:left-1/4 h-full w-[2px] bg-gradient-to-b from-purple/80 via-white-100/20 to-transparent"></div>

        {workExperience.map((job, index) => (
          <div
            key={job.id}
            className={`flex flex-col md:flex-row relative items-center md:items-start ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row"
            }`}
          >
            {/* Marker/Dot */}
            <div
              className={`absolute z-10 left-8 md:left-1/4 w-6 h-6 rounded-full bg-purple shadow-lg shadow-purple/30 transform -translate-x-1/2`}
            ></div>

            {/* Content - All items on the left side of timeline */}
            <div
              className={`relative bg-gradient-to-br from-black-200/60 to-black-100/95 backdrop-blur-md border border-white/10 rounded-xl p-6 md:max-w-xl w-full ml-16 md:ml-0 md:mr-auto
               ${
                 index % 2 === 0 ? "md:mr-auto md:ml-0" : "md:mr-auto md:ml-0"
               }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={job.thumbnail}
                    alt={job.title}
                    className="w-16 h-16 object-contain rounded-lg bg-black-300/50 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white-100/70">
                    {job.duration || "2022 - Present"}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{job.title}</h3>
                  <h4 className="text-sm text-purple mb-3">
                    {job.company || "Company Name"}
                  </h4>
                  <p className="text-white-100 text-sm leading-relaxed">
                    {job.desc}
                  </p>

                  {/* Technologies/Skills Used */}
                  {job.skills && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-black-300/40 text-white-100"
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
                      className="mt-4 inline-flex items-center text-sm text-purple hover:text-white-100 transition-colors duration-300 group"
                    >
                      <span>View Details</span>
                      <BsArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
