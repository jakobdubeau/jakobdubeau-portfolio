"use client";
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.7 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7 }} 
          className="col-span-8 place-self-center text-center sm:text-left"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-secondary-300 to-tertiary-500">
                Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                'Jakob',
                4000, // wait 1s before switching"
                'a Student',
                1000,
                'a Web Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE]  text-base sm:text-lg mb-6 lg:text-xl">
            Hi, I&apos;m Jakob. I&apos;m a third year student studying computer science at the University of Ottawa.
          </p>
          <div>
          <Link href="https://github.com/jakobdubeau" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-200 via-secondary-400 to-tertiary-700 hover:bg-slate-200 text-white">
                Github
            </button>
          </Link>
          <Link href="images/F25_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-200 via-secondary-400 to-tertiary-700 hover:bg-slate-800 text-white mt-3">
                <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                    Download Resume
                </span>
            </button>
          </Link>
          </div>
        </motion.div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
            
        </div>
      </div>
    </section>
  )
}

export default HeroSection