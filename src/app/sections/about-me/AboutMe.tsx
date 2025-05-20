"use client"

import { useTranslations } from 'next-intl';
import './AboutMe.css'
export const AboutMeSection = () => {
  const t = useTranslations();
  return (
    <section className="section" id="about">
      <h2 className="section-title fade-in">{t('about_me.title')}</h2>
      
      <div className="about-content">
        <div className="about-text fade-in">
          <h3>{t('about_me.subtitle')}</h3>
          <p>{t('about_me.description.p1')}</p>
          <p>{t('about_me.description.p2')}</p>
          <div className="skills">
            <h3>{t('about_me.skills')}</h3>
            <div className="skills-container">
              <div className="skill">
                <i className="fab fa-html5"></i>
                <span>HTML5</span>
              </div>
              <div className="skill">
                <i className="fab fa-css3-alt"></i>
                <span>CSS3</span>
              </div>
              <div className="skill">
                <i className="fab fa-js"></i>
                <span>JavaScript</span>
              </div>
              <div className="skill">
                <i className="fab fa-react"></i>
                <span>React</span>
              </div>
              <div className="skill">
                <i className="fab fa-node-js"></i>
                <span>Node.js (Nest)</span>
              </div>
              
              <div className="skill">
                <i className="fas fa-database"></i>
                <span>SQL</span>
              </div>
              <div className="skill">
                <i className="fas fa-no-database"></i>
                <span>No-SQL</span>
              </div>
              <div className="skill">
                <i className="fab fa-git-alt"></i>
                <span>Git</span>
              </div>
              <div className="skill">
                <i className="fab fa-php"></i>
                <span>PHP</span>
              </div>
              <div className="skill">
                <i className="fab fa-laravel"></i>
                <span>Laravel</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image fade-in">

        </div>
      </div>
    </section>
  );
};
