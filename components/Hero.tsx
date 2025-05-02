import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaCode, FaServer, FaDatabase } from "react-icons/fa";
import { SiDotnet, SiReact, SiMicrosoftazure } from "react-icons/si";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* Animated Gradient Accent - White Themed */}
      <div className="absolute bottom-0 left-0 w-full h-[100px]"></div>
      <div className="absolute top-0 left-0 w-[40%] h-[200px]"></div>

      {/* Hero Content - Left Aligned */}
      <div className="relative z-20 flex h-full w-full px-4 sm:px-6 md:px-12 py-8 md:py-0">
        {/* Text Content - Left Side */}
        <div className="flex flex-col justify-center w-full lg:w-2/3 items-start text-left">
          <Spotlight
            className="-top-40 left-0 hidden sm:block"
            fill="rgba(255, 255, 255, 0.15)"
          />
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white font-medium mb-2 sm:mb-3 w-fit px-3 py-1 sm:px-4 sm:py-1 rounded-full">
            Software Engineer
          </h2>

          <TextGenerateEffect
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
            words="LE HUY HOANG"
          />

          <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg max-w-2xl text-white leading-relaxed p-2 sm:p-3 rounded-lg">
            I am a passionate backend developer with expertise in .NET Core, C#,
            SQL Server, and Entity Framework. I have experience in designing and
            optimizing RESTful APIs, microservices architecture, and database
            management.
          </p>

          {/* Tech Skills Badges */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
            {[
              { name: ".NET Core", icon: <SiDotnet /> },
              { name: "React.js", icon: <SiReact /> },
              { name: "SQL Server", icon: <FaDatabase /> },
              { name: "RESTful APIs", icon: <FaServer /> },
              { name: "Azure", icon: <SiMicrosoftazure /> },
              { name: "Microservices", icon: <FaCode /> },
            ].map((skill) => (
              <span
                key={skill.name}
                className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm"
              >
                {skill.icon}
                <span className="hidden xs:inline">{skill.name}</span>
              </span>
            ))}
          </div>

          {/* Key Projects Section */}
          <div className="mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg border border-white/20 max-w-2xl w-full">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
              Featured Projects
            </h3>
            <ul className="list-disc list-inside text-white space-y-1 text-xs sm:text-sm md:text-base">
              <li className="line-clamp-1 sm:line-clamp-none">
                Sports Schedule Booking Web Application (Next.js, SignalR,
                MySQL,...)
              </li>
              <li className="line-clamp-1 sm:line-clamp-none">
                Room Management System (WPF, .NET, SQL Server,...)
              </li>
              <li className="line-clamp-1 sm:line-clamp-none">
                AI Assistant - AI Chatbot with RAG (Python, FastAPI,
                MongoDB,...)
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
            <a href="#intro">
              <MagicButton
                title="View My Work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a href="#contact">
              <MagicButton
                title="Contact Me"
                icon={<IoMail />}
                position="right"
              />
            </a>
          </div>

          {/* Contact and Social Links in a Row */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
            {/* Contact Info */}
            <div className="rounded-lg">
              <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm mb-1">
                <IoMail className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                <span className="truncate">huyhoangl9903@gmail.com</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                <span className="text-white">www.hoanglh.id.vn</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 mt-2 sm:mt-0">
              <a
                href="https://github.com/richieLio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300 p-1 sm:p-2 rounded-full"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/huy-hoang-le-03b57b353"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300 p-1 sm:p-2 rounded-full"
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Removed the scroll indicator for reduced height */}
    </section>
  );
};

export default Hero;
