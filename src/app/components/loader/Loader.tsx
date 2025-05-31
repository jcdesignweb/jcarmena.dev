"use client"

import { useEffect } from "react";
import "./Loader.css";

export const Loader = () => {
  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        (preloader as HTMLElement).style.display = "none";
      }, 2500);
    }
  }, []);
  
  return (
    <div className="preloader">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
