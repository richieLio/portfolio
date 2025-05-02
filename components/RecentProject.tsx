"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef } from "react";
import { projects } from "@/data";
import { PinContainer } from "@/components/ui/3d-pin";

const RecentProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full py-20" id="projects">
      <div className="flex flex-col w-full">
        <div>
          <h1 className="heading mb-4">
            A small selection of{" "}
            <span className="text-purple">recent projects</span>
          </h1>
          <p className="text-center md:text-left text-white-100/70 mb-6">
            Showing all {projects.length} projects (scroll to see more)
          </p>
        </div>

        <div className="relative w-full mt-6">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black-300/80 p-3 rounded-full text-white hover:bg-purple/80 transition-all"
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black-300/80 p-3 rounded-full text-white hover:bg-purple/80 transition-all"
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-8 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-10 px-6">
              {projects.map((item) => (
                <div
                  className="flex-shrink-0 lg:min-h-[32.5rem] h-[32rem] sm:h-[41rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
                  key={item.id}
                >
                  <PinContainer title={item.title}>
                    <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                      <div
                        className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                        style={{ backgroundColor: "#13162D" }}
                      >
                        <img src="/bg.png" alt="bgimg" />
                      </div>
                      <img
                        src={item.img}
                        alt="cover"
                        className="z-10 absolute bottom-0"
                      />
                    </div>

                    <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                      {item.title}
                    </h1>

                    <p
                      className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                      style={{
                        color: "#BEC1DD",
                        margin: "1vh 0",
                      }}
                    >
                      {item.des}
                    </p>

                    <div className="flex items-center justify-between mt-7 mb-3">
                      <div className="flex items-center">
                        {item.iconLists.map((icon, index) => (
                          <div
                            key={index}
                            className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                            style={{
                              transform: `translateX(-${5 * index + 2}px)`,
                            }}
                          >
                            <img
                              src={icon}
                              alt={`icon-${index}`}
                              className="p-2"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </PinContainer>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/30 hover:bg-purple/70 cursor-pointer"
                onClick={() => {
                  if (scrollRef.current) {
                    const { clientWidth } = scrollRef.current;
                    scrollRef.current.scrollTo({
                      left: clientWidth * index,
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RecentProjects;
