import { useTranslations } from "next-intl";
import "./Projects.css";
import Image from "next/image";

export const ProjectsSection = () => {
  const t = useTranslations();
  const projects = t.raw('projects.projects') as { name: string; techs: string[]; image: string; description: string; github: string; url: string }[];
  return (
    <section className="section projects" id="projects">
      <div className="projects-container">
        <h2 className="section-title fade-in">{t('projects.title')}</h2>
        <div className="project-grid">
          
          {projects.map((project, idx) => (
          <div className="project-card fade-in" key={idx}>
            <div className="project-image">
              <Image src={project.image} alt="Jukeis project" height={60} width={290} unoptimized />
            </div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>
                {project.description}
              </p>
              <div className="project-tags">
                {
                  project.techs.map((tech, idx) => (
                    <span className="project-tag" key={idx}>{tech}</span>
                  ))
                }
                
              </div>
              <div className="project-links">
                <a href={project.url} target="_blank">
                  <i className="fas fa-external-link-alt"></i> {t('projects.see_project')}
                </a>
                <a href={project.github} target="_blank">
                  <i className="fab fa-github"></i> {t('projects.see_code')}
                </a>
              </div>
            </div>
          </div>
          ))}

        </div>
      </div>
    </section>
  );
};
