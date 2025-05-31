"use client";
import { useEffect, useState } from "react";
import "./sidemenu.css";

import { usePathname } from "next/navigation";

export const SideMenu = () => {
  const [slug, setSlug] = useState("");

  const pathname = usePathname();
  const parts = pathname.split("/");

  function slugFromPath() {
    const slug = parts[2];

    /**
     * all posts , index
     */
    if (!slug) return "";

    return slug;
  }

  useEffect(() => {
    setSlug(slugFromPath());
  }, []);

  return (
    <nav className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Nerd Blog &#129299;</h2>
        <p className="sidebar-subtitle">Contenido y recursos</p>
      </div>

      <ul className="blog-menu">
        <li>
          <a href="/blog" className={slug === "" ? "active" : ""}>
            Todos los Posts
            {/* <span className="category-counter">24</span> */}
          </a>
        </li>

        <li>
          <a href="#">
            MongoDB
            <span className="category-counter">8</span>
          </a>
          <ul className="submenu">
            <li>
              <a
                href="/blog/mongo-sharding"
                className={slug === "mongo-sharding" ? "active" : ""}
              >
                Sharding
              </a>
            </li>
          </ul>
        </li>
        {/* 
        <li>
          <a href="#">Sobre Mí</a>
        </li> */}
      </ul>
    </nav>
  );
};
