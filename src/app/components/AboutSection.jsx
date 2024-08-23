"use client"
import React, { useTransition, useState } from 'react'
import Image from "next/image"
import TabButton from './TabButton'

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Data Structures & Algorithims</li>
        <li>C#</li>
        <li>Java</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>uOttawa, Honours BSc Computer Science</li>
      </ul>
    ),
  },
  {
    title: "Extras",
    id: "extras",
    content: (
      <ul className="list-disc pl-2">
        <li>Nothing to show yet</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/giphy.gif" width={575} height={575} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-base lg:text-lg">
          I'm a passionate computer science major that loves everything to do with computers. Recently I've been interested in software engineering with a focus on game development. I'm always trying to hone my skills and learn new concepts!
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>
              {" "}
              Education{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange("extras")} active={tab === "extras"}>
              {" "}
              Extras{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection