import React from "react";
import { workExperience } from "@/data";
import { BsArrowRight } from "react-icons/bs";

const Experience = () => {
  return (
    <div className="py-12 w-full">
      <div className="flex flex-col items-center justify-center mb-16">
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

      {/* Timeline Design */}
      <div className="relative flex flex-col space-y-8 w-full max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute top-0 left-8 md:left-1/2 md:-ml-1 h-full w-[2px] bg-gradient-to-b from-purple/80 via-white-100/20 to-transparent"></div>

        {workExperience.map((job, index) => (
          <div
            key={job.id}
            className={`relative flex items-center w-full ${
              index % 2 === 0 ? "md:justify-start" : "md:justify-end"
            } group`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-purple border-4 border-black-100 z-10"></div>

            {/* Experience Card */}
            <div
              className={`relative w-full md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:ml-16" : "md:mr-16"
              } 
                         p-6 rounded-xl bg-gradient-to-br from-black-200/60 to-black-100/95 
                         backdrop-blur-md border border-white/10 shadow-lg 
                         hover:shadow-purple/20 hover:border-purple/30 transition-all duration-300
                         group-hover:translate-y-[-4px]`}
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
