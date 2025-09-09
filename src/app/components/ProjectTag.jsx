import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-400 bg-primary-400/10"
    : "text-[#ADB7BE] border-slate-600 hover:border-primary-400 hover:text-primary-400 hover:bg-primary-400/5";
  return (
    <button
      className={`${buttonStyles} rounded-full border-[3px] px-4 py-2 text-base sm:px-8 sm:py-3 sm:text-xl cursor-pointer font-semibold transition-all duration-300 shadow-lg`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
