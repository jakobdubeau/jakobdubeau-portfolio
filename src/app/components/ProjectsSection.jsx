"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Title",
    description: "Project description",
    image: "",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Title",
    description: "Project description",
    image: "",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Title",
    description: "Project description",
    image: "",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px 0px -100px 0px", // Trigger animation later when scrolling
  });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag),
  );

  // Handle animation trigger
  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      // First time seeing the section - animate
      setShouldAnimate(true);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Listen for navbar navigation (when user is scrolled to projects already)
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#projects" && hasAnimated) {
        // Reset and retrigger animation for navbar clicks
        setShouldAnimate(false);
        setTimeout(() => {
          setShouldAnimate(true);
        }, 100);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [hasAnimated]);

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-8 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.id}
              layout
              variants={cardVariants}
              initial="initial"
              animate={shouldAnimate ? "animate" : "initial"}
              exit="exit"
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.4,
                layout: { duration: 0.4, ease: "easeInOut" },
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};

export default ProjectsSection;
