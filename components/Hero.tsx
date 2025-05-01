import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Modern Gradient Background */}
      <BackgroundGradientAnimation
        containerClassName="min-h-screen w-full"
        className="z-[-1]"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Text Content - Left Side */}
        <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-7/12 py-8 md:py-0">
          <h2 className="text-sm uppercase tracking-[0.3em] text-blue-100 font-medium mb-4">
            Full-Stack Developer
          </h2>

          <TextGenerateEffect
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple mb-6"
            words="Transforming Ideas into Exceptional Digital Experiences"
          />

          <p className="mb-8 text-lg md:text-xl lg:text-2xl max-w-xl text-white-100 leading-relaxed">
            Hi, I&apos;m Hoang, a passionate full-stack developer creating
            impactful web applications with modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
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

          {/* Social Links */}
          <div className="flex gap-6 mt-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-100 hover:text-purple transition-colors duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-100 hover:text-purple transition-colors duration-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Side - Space for 3D Model */}
        <div className="hidden md:block md:w-1/2 lg:w-5/12">
          {/* Không cần thêm nội dung ở đây vì trực thăng sẽ hiển thị ở vị trí này */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white-100 text-sm mb-2">Scroll to explore</span>
        <div className="w-[2px] h-14 bg-gradient-to-b from-purple to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
