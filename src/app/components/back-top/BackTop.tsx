"use client";

import { useEffect } from "react";

export const BackTop = () => {
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
    <div>
      <a href="#" className="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </div>
  );
};

export default BackTop;
