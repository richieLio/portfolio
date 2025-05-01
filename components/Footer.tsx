"use client";

import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { socialMedia } from "@/data";
import MagicButton from "@/components/ui/MagicButton";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({
      submitting: true,
      submitted: false,
      error: false,
      message: "",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: "Your message has been sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: true,
        error: true,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <footer className="relative pt-24 pb-10 overflow-hidden" id="contact">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <BackgroundGradientAnimation
          containerClassName="h-full w-full"
          className="opacity-40"
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        <div className="bg-gradient-to-r from-black-200/80 to-black-100/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-16 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-blue-100 font-medium mb-4">
                Let&apos;s Connect
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Bring Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-blue-100">
                  Digital Vision
                </span>{" "}
                to Life?
              </h1>
              <p className="text-white-100 mb-8 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas
                or opportunities to be part of your vision. Let&apos;s create
                something extraordinary together!
              </p>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center mr-4">
                    <HiMail className="w-5 h-5 text-purple" />
                  </div>
                  <a
                    href="mailto:lhuyhoang18903@gmail.com"
                    className="text-white-100 hover:text-purple transition-colors"
                  >
                    lhuyhoang18903@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center mr-4">
                    <FiPhone className="w-5 h-5 text-purple" />
                  </div>
                  <a
                    href="tel:+84123456789"
                    className="text-white-100 hover:text-purple transition-colors"
                  >
                    +84 813 021 124
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                {socialMedia.map((info) => (
                  <a
                    key={info.id}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex justify-center items-center backdrop-blur-lg bg-black-200/50 rounded-full border border-white/10 
                              hover:bg-purple/20 hover:border-purple/30 transition-all duration-300 group"
                  >
                    <img
                      src={info.img}
                      alt={`social-${info.id}`}
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black-100/60 p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              <p className="text-white-100/70 mb-4">
                I&apos;ll receive your message instantly via Telegram!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {status.submitted && (
                  <div
                    className={`p-3 rounded-lg ${
                      status.error
                        ? "bg-red-500/20 text-red-200"
                        : "bg-green-500/20 text-green-200"
                    } mb-4`}
                  >
                    {status.message}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-white-100 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black-200/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white-100/50 focus:outline-none focus:ring-2 focus:ring-purple/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-white-100 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black-200/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white-100/50 focus:outline-none focus:ring-2 focus:ring-purple/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-white-100 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-black-200/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white-100/50 focus:outline-none focus:ring-2 focus:ring-purple/50"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 to-purple text-black font-medium
                             transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] 
                             disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status.submitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <FaLocationArrow className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a
              href="#"
              className="text-white-100 hover:text-purple transition-colors"
            >
              Home
            </a>
            <a
              href="#work"
              className="text-white-100 hover:text-purple transition-colors"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-white-100 hover:text-purple transition-colors"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="text-white-100 hover:text-purple transition-colors"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-white-100 hover:text-purple transition-colors"
            >
              Contact
            </a>
          </div>

          <p className="text-white-100/70 text-sm">
            © {currentYear} Le Huy Hoang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
