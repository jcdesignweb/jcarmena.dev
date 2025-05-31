"use client";

import Image from "next/image";
import "./Header.css";
import { useTranslations } from "next-intl";
import { getCookie } from "@/app/utils";
import { useEffect, useRef, useState } from "react";

export type props = {
  isMain: boolean
}

export const Header = ({isMain}: props) => {
  const t = useTranslations();
  const [lang, setLang] = useState("es");

  const logoHref = (isMain)? '/#' : '/'

  const navLinksRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLang(getCookie("lang") || "es");

    const hamburger = hamburgerRef.current;
    const navLinks = navLinksRef.current;

    if (!hamburger || !navLinks) return;

    const toggleMenu = () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    };

    const closeMenu = () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    };

    const handleClick = toggleMenu;
    hamburger.addEventListener("click", handleClick);

    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    return () => {
      hamburger.removeEventListener("click", handleClick);
      links.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, []);

  const langOnClick = async (lang: "es" | "en") => {
    document.cookie = `lang=${lang}`;
    location.reload();
  };

  return (
    <header>
      <nav className="navbar scrolled">
        <div className="navbar-container">
          <a href={logoHref} className="logo">
            <Image src={"/logo.png"} alt="Logo" height={40} width={40} />
          </a>
          <ul className="nav-links" id="navLinks" ref={navLinksRef}>
            <li>
              <a href="/#about">{t("menu.about_me")}</a>
            </li>
            <li>
              <a href="/#projects">{t("menu.projects")}</a>
            </li>
            <li>
              <a href="/#experience">{t("menu.experience")}</a>
            </li>
            <li>
              <a href="/#contact">{t("menu.contact")}</a>
            </li>
          </ul>
          <ul className="nav-links">
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
          <div className="langs">
            <a
              href="#"
              className={lang === "es" ? "active" : ""}
              onClick={() => {
                langOnClick("es");
              }}
            >
              es
            </a>
            <span> / </span>
            <a
              href="#"
              className={lang === "en" ? "active" : ""}
              onClick={() => {
                langOnClick("en");
              }}
            >
              en
            </a>
          </div>
          <div className="hamburger" ref={hamburgerRef}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </nav>
    </header>
  );
};
