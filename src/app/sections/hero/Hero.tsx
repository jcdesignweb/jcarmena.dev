"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import "./Hero.css";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (): any => {
    
  };

  const t = useTranslations();

  return (
    <>
      <section className="hero" id="home">
        <div className="particles-wrapper">
          {init && (
            <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              options={{
                background: {
                  color: {
                    value: "#34495e",
                  },
                },
                fpsLimit: 120,
                interactivity: {
                  events: {
                    onClick: {
                      enable: true,
                      mode: "push",
                    },
                    onHover: {
                      enable: true,
                      mode: "repulse",
                    },
                  },
                  modes: {
                    push: {
                      quantity: 4,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                    },
                  },
                },
                particles: {
                  color: {
                    value: "#ffffff",
                  },
                  links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                      default: "bounce",
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                    },
                    value: 80,
                  },
                  opacity: {
                    value: 0.5,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 5 },
                  },
                },
                detectRetina: true,
              }}
            />
          )}
        </div>

        <div className="hero-content">
          <h1 id="iam">
            {t("hero.title")} <span>Juan Andrés Carmena</span>
          </h1>
          <p>{t("hero.description")}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn">
              {t("hero.btn_see_projects")}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t("hero.btn_contact_me")}
            </a>
          </div>
        </div>
        <a href="#about" className="scroll-down">
          <span>{t("generics.scroll_down")}</span>
          <i className="fas fa-chevron-down"></i>
        </a>
      </section>
    </>
  );
};
