"use client";
import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaCode, FaServer, FaDatabase } from "react-icons/fa";
import { SiDotnet, SiReact, SiMicrosoftazure } from "react-icons/si";
import AnimatedButton from "./ui/AnimatedButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };

  const gradientVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.1, 0.2, 0.1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 5,
      },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* Animated Gradient Accent - White Themed */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-white/5 to-transparent"
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

      <motion.div
        className="absolute top-0 left-0 w-[40%] h-[200px] bg-gradient-to-br from-white/5 to-transparent"
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

      {/* Hero Content - Left Aligned */}
      <div className="relative z-20 flex h-full w-full px-4 sm:px-6 md:px-12 py-8 md:py-0">
        {/* Text Content - Left Side */}
        <motion.div
          className="flex flex-col justify-center w-full lg:w-2/3 items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Spotlight
            className="-top-40 left-0 hidden sm:block"
            fill="rgba(255, 255, 255, 0.15)"
          />

          <motion.h2
            className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white font-medium mb-2 sm:mb-3 w-fit px-3 py-1 sm:px-4 sm:py-1 rounded-full"
            variants={slideFromLeft}
          >
            Software Engineer
          </motion.h2>

          <TextGenerateEffect
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
            words="LE HUY HOANG"
          />

          <motion.p
            className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg max-w-2xl text-white leading-relaxed p-2 sm:p-3 rounded-lg"
            variants={itemVariants}
          >
            I am a passionate backend developer with expertise in .NET Core, C#,
            SQL Server, and Entity Framework. I have experience in designing and
            optimizing RESTful APIs, microservices architecture, and database
            management.
          </motion.p>

          {/* Tech Skills Badges */}
          <motion.div
            className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6"
            variants={itemVariants}
          >
            {[
              { name: ".NET Core", icon: <SiDotnet /> },
              { name: "React.js", icon: <SiReact /> },
              { name: "SQL Server", icon: <FaDatabase /> },
              { name: "RESTful APIs", icon: <FaServer /> },
              { name: "Azure", icon: <SiMicrosoftazure /> },
              { name: "Microservices", icon: <FaCode /> },
            ].map((skill, index) => (
              <motion.span
                key={skill.name}
                className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm"
                variants={skillVariants}
                custom={index}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transition: { duration: 0.2 },
                }}
              >
                {skill.icon}
                <span className="hidden xs:inline">{skill.name}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Key Projects Section */}
          <motion.div
            className="mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg border border-white/20 max-w-2xl w-full backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.h3
              className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2"
              variants={itemVariants}
            >
              Featured Projects
            </motion.h3>
            <motion.ul className="list-disc list-inside space-y-1 text-xs sm:text-sm md:text-base">
              {[
                "Sports Schedule Booking Web Application (Next.js, SignalR, MySQL,...)",
                "Room Management System (WPF, .NET, SQL Server,...)",
                "AI Assistant - AI Chatbot with RAG (Python, FastAPI, MongoDB,...)",
              ].map((project, index) => (
                <motion.li
                  key={index}
                  className="line-clamp-1 sm:line-clamp-none text-white"
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  {project}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4"
            variants={itemVariants}
          >
            <AnimatedButton
              title="View My Work"
              icon={<FaLocationArrow />}
              href="#intro"
            />
            <AnimatedButton
              title="Contact Me"
              icon={<IoMail />}
              href="#contact"
            />
          </motion.div>

          {/* Contact and Social Links in a Row */}
          <motion.div
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-start sm:items-center"
            variants={itemVariants}
          >
            {/* Contact Info */}
            <motion.div
              className="rounded-lg"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm mb-1"
                whileHover={{ x: 2, transition: { duration: 0.2 } }}
              >
                <IoMail className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                <span className="truncate">lhuyhoang18903@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm"
                whileHover={{ x: 2, transition: { duration: 0.2 } }}
              >
                <span className="text-white">www.hoanglh.id.vn</span>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex gap-3 sm:gap-4 mt-2 sm:mt-0">
              <motion.a
                href="https://github.com/richieLio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300 p-1 sm:p-2 rounded-full border border-white/20"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  transition: { duration: 0.2 },
                }}
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/huy-hoang-le-03b57b353"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300 p-1 sm:p-2 rounded-full border border-white/20"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  transition: { duration: 0.2 },
                }}
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
