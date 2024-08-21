import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero = () => {
  return (
    <section className="relative pb-20 pt-36">
      {/* Spotlight Effects */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="top-28 left-80 h-[80vh] w-[50vw]"
          fill="blue"
        />
      </div>

      {/* Background with Radial Gradient */}
      <div className="absolute inset-0 flex items-center justify-center h-screen w-full bg-white dark:bg-black-100 dark:bg-grid-white/[0.05] bg-grid-black/[0.2]">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-white dark:bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex justify-center my-20">
        <div className="flex flex-col items-center justify-center max-w-[89vw] md:max-w-2xl lg:max-w-[60vw]">
          <h2 className="text-center text-xs uppercase tracking-widest text-blue-100 max-w-80">
            Dynamic web magic with Next.js
          </h2>
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Transforming concepts into Seamless User Experiences"
          />
          <p className="mb-4 text-center text-sm md:text-lg lg:text-2xl md:tracking-wider">
            Hi, I&apos;m Hoang, a full-stack developer based in Vietnam.
          </p>
          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
