import { useTranslations } from "next-intl";
import "./Experience.css";

export const ExperienceSection = () => {
  const t = useTranslations();

  const jobs = t.raw("experience.jobs") as {
    company: string;
    dates: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="section" id="experience">
      <h2 className="section-title fade-in">{t("experience.title")}</h2>
      <div className="timeline">
        {/* <!-- Experiencia 1 --> */}

        {jobs.map((job, idx) => (
          <div className="timeline-item fade-in" key={idx}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">{job.dates}</div>
              <h3>{job.title}</h3>
              <h4>{job.company}</h4>
              <p>{job.description}</p>
            </div>
          </div>
        ))}

        {/* <!-- Experiencia 3 --> */}
        {/* <div className="timeline-item fade-in">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-date">2018 - 2020</div>
            <h3>Desarrollador Frontend</h3>
            <h4>Nombre de la Empresa</h4>
            <p>
              Descripción de tus responsabilidades y logros en este puesto.
              Menciona las tecnologías que utilizas y los proyectos en los que
              has trabajado.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
