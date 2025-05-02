import React from "react";
import { workExperience } from "@/data";
import { BsArrowRight } from "react-icons/bs";

const Experience = () => {
  return (
    <div className="w-full py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Professional{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
            Experience
          </span>
        </h1>
      </div>

      <div className="w-full relative grid md:grid-cols-2 gap-8">
        {workExperience.map((job, index) => (
          <div
            key={job.id}
            className="w-full relative bg-gradient-to-br from-black-200/60 to-black-100/95 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:shadow-purple/10 hover:border-purple/20 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 rounded-full filter blur-3xl -mr-10 -mt-10 z-0"></div>

            <div className="relative z-10">
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
