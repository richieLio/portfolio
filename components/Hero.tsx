import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaCode, FaServer, FaDatabase } from "react-icons/fa";
import { SiDotnet, SiReact, SiMicrosoftazure } from "react-icons/si";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/624.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50 z-10"></div>
      </div>

      {/* Animated Gradient Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-blue-700/20 to-transparent z-10"></div>
      <div className="absolute top-0 left-0 w-[40%] h-[300px] bg-gradient-to-br from-blue-900/20 to-transparent z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex min-h-screen w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Text Content - Left Side Only */}
        <div className="flex flex-col justify-center w-full lg:w-3/4 py-8 md:py-0">
          <Spotlight
            className="-top-40 left-0"
            fill="rgba(59, 130, 246, 0.15)"
          />
          <h2 className="text-sm uppercase tracking-[0.3em] text-blue-300 font-medium mb-4 backdrop-blur-sm bg-black/10 w-fit px-4 py-1 rounded-full">
            Software Engineer
          </h2>

          <TextGenerateEffect
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 mb-6"
            words="LE HUY HOANG"
          />

          <p className="mb-8 text-lg md:text-xl lg:text-2xl max-w-3xl text-white leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg">
            I am a passionate backend developer with expertise in .NET Core, C#,
            SQL Server, and Entity Framework. I have experience in designing and
            optimizing RESTful APIs, microservices architecture, and database
            management.
          </p>

          {/* Tech Skills Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
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
                className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm"
              >
                {skill.icon}
                {skill.name}
              </span>
            ))}
          </div>

          {/* Key Projects Section */}
          <div className="mb-8 backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-blue-500/20 max-w-2xl">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              Featured Projects
            </h3>
            <ul className="list-disc list-inside text-white space-y-2">
              <li>
                Sports Schedule Booking Web Application (Next.js, SignalR,
                MySQL,...)
              </li>
              <li>Room Management System (WPF, .NET, SQL Server,...)</li>
              <li>
                AI Assistant - AI Chatbot with RAG (Python, FastAPI,
                MongoDB,...)
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="#work">
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

          {/* Contact Info */}
          <div className="backdrop-blur-sm bg-black/10 p-4 rounded-lg max-w-md">
            <div className="flex items-center gap-2 text-white mb-2">
              <IoMail className="w-5 h-5 text-blue-300" />
              <span>huyhoangl9903@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-white mb-2">
              <span className="text-blue-300">+84</span>
              <span>813 021 124</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="text-blue-300">www.hoanglh.id.vn</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            <a
              href="https://github.com/richieLio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-300 backdrop-blur-sm bg-black/20 p-3 rounded-full"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/huy-hoang-le-03b57b353"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-300 backdrop-blur-sm bg-black/20 p-3 rounded-full"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-white text-sm mb-2 backdrop-blur-sm bg-black/10 px-4 py-1 rounded-full">
          Scroll to explore
        </span>
        <div className="w-[2px] h-14 bg-gradient-to-b from-blue-500 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
