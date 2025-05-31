"use client";

import "./page.module.css";
import { useEffect } from "react";
import { Header } from "./components/header/Header";
import { HeroSection } from "./sections/hero/Hero";
import { AboutMeSection } from "./sections/about-me/AboutMe";
import { ProjectsSection } from "./sections/projects/Projects";
import { ExperienceSection } from "./sections/experience/Experience";
import { ContactSection } from "./sections/contact/Contact";
import { Footer } from "./components/footer/Footer";
import { Loader } from "./components/loader/Loader";

import "./Resonsive.css";

export default function Page() {
  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        (preloader as HTMLElement).style.display = "none";
      }, 2500);
    }
  }, []);

  useEffect(() => {
    const backToTopButton = document.querySelector(".back-to-top");
    if (!backToTopButton) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    const handleClick = (e: any) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    backToTopButton.addEventListener("click", (e) => handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Loader />

      <Header isMain={true} />
      <div id="sections">
        <HeroSection />
        <AboutMeSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>

      <Footer />
      <div>
        <a href="#" className="back-to-top">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </>
  );
}
