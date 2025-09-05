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
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.9 }} 
          className="col-span-8 place-self-center text-center sm:text-left"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-secondary-300 to-tertiary-500">
                Hello, I&apos;m{" "}
            </span>
            <br></br>
            <span className="inline-block min-w-[280px] text-left">
              <TypeAnimation
                sequence={[
                  'Jakob',
                  4000,
                  'a CS Student',
                  1000,
                  'a Developer',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-[#ADB7BE]  text-base sm:text-lg mb-6 lg:text-xl">
            Hi, I&apos;m Jakob. I&apos;m a third year student studying computer science at the University of Ottawa.
          </p>
          <div>
          <Link href="https://github.com/jakobdubeau" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-200 via-secondary-400 to-tertiary-700 hover:from-primary-100 hover:via-secondary-300 hover:to-tertiary-600 text-white transition-all duration-300 hover:brightness-105 hover:saturate-110 hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.35)]">
                Github
            </button>
          </Link>
          <Link href="images/F25_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-200 via-secondary-400 to-tertiary-700 hover:from-primary-100 hover:via-secondary-300 hover:to-tertiary-600 text-white mt-3 transition-all duration-300 hover:brightness-105 hover:saturate-110 hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.35)]">
                <span className="block bg-[#121212] hover:bg-[#121212] rounded-full px-5 py-2">
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