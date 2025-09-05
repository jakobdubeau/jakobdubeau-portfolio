"use client";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import MinecraftSnow from "./components/MinecraftSnow";
import { useState } from "react";

export default function Home() {
  const [snowEnabled, setSnowEnabled] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-[#121212] relative">
      {snowEnabled && <MinecraftSnow />}
      <div className="relative z-20">
        <Navbar snowEnabled={snowEnabled} setSnowEnabled={setSnowEnabled} />
      </div>
      <div className="container mt-24 mx-auto px-12 py-4 relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
