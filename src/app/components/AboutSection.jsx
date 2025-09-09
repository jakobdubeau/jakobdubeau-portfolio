"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion, AnimatePresence } from "framer-motion";

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [showHeraImage, setShowHeraImage] = useState(false);

  const TAB_DATA = [
    {
      title: "Skills",
      id: "skills",
      content: (
        <div className="flex flex-wrap gap-2">
          {[
            "Object Oriented Programming",
            "Data Structures & Algorithms",
            "Java",
            "Python",
            "C#",
            "JavaScript",
            "HTML/CSS",
            "React",
            "Tailwind",
            "Node.js",
            "Git"
          ].map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-primary-200/10 to-tertiary-500/15 border border-primary-300/40 rounded-full text-sm text-white hover:border-primary-200/70 hover:from-primary-200/15 hover:to-tertiary-500/20 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <div className="flex items-center gap-4">
          <div className="w-1 h-12 bg-gradient-to-b from-primary-200 to-tertiary-500 rounded-full"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0">
              <Image src="/images/uottawalogo.png" alt="uOttawa" width={44} height={44} />
            </div>
            <span className="text-white text-base">uOttawa, Honours BSc Computer Science</span>
          </div>
        </div>
      ),
    },
    {
      title: "Extras",
      id: "extras",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-primary-400 text-sm font-bold">›</span>
            <span className="text-white text-sm">likes games, gym, music, anime, and physical media</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-secondary-400 text-sm font-bold">›</span>
            <span className="text-white text-sm">i've had way too many hobbies to count</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-primary-300 text-sm font-bold">›</span>
            <span className="text-white text-sm">i have a cat named <button onClick={() => setShowHeraImage(!showHeraImage)} className="text-white underline hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer relative">
              hera
              {/* Chat Bubble */}
              <AnimatePresence>
                {showHeraImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50"
                  >
                    {/* Chat bubble with tail */}
                    <div className="relative bg-[#1f1f1f] border border-[#404040]/50 rounded-lg shadow-xl p-2 w-[250px]">
                      {/* Left pointing triangle tail - centered with image */}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#1f1f1f]"></div>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 translate-x-px border-8 border-transparent border-r-[#404040]"></div>
                      
                      <div className="flex justify-end mb-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowHeraImage(false);
                          }}
                          className="w-4 h-4 text-gray-500 hover:text-white transition-colors text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <Image
                        src="/images/Hera3.jpg"
                        alt="Hera the cat"
                        width={250}
                        height={250}
                        className="rounded"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button></span>
          </div>
        </div>
      ),
    },
  ];

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="about" className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-start py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/images/giphy.gif"
            alt="snowy"
            width={575}
            height={575}
            className="w-full max-w-[575px] h-auto"
            unoptimized
            priority
          />
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I&apos;m a passionate computer science major that loves everything
            to do with computers. I&apos;m always trying to hone my skills and
            learn new concepts!
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("extras")}
              active={tab === "extras"}
            >
              {" "}
              Extras{" "}
            </TabButton>
          </div>
          <div className="mt-8 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {TAB_DATA.find((t) => t.id === tab).content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
