import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">jcarmena.dev</div>
        <div className="footer-links">
          <a href="#home">Inicio</a>
          <a href="#about">Sobre Mí</a>
          <a href="#projects">Proyectos</a>
          <a href="#experience">Experiencia</a>
          <a href="#contact">Contacto</a>
        </div>
        <div className="social-links">
          <a href="https://github.com/jcdesignweb" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/jcarmena" target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="copyright">
          &copy; 2025 JCarmena. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
