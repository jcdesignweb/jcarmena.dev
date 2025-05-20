import Image from "next/image";
import "./Contact.css";
import { useTranslations } from "next-intl";
import { useReCaptcha } from "next-recaptcha-v3";

export const ContactSection = () => {
  const { executeRecaptcha } = useReCaptcha();

  const t = useTranslations();
  return (
    <section className="section contact" id="contact">
      <div className="contact-container">
        <h2 className="section-title fade-in">{t("contact.title")}</h2>
        <div className="contact-wrapper">
          <div className="contact-info fade-in">
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <span>juan14nob@email.com</span>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Rosario, Santa Fe, Argentina</span>
              <Image src="/arg.png" alt="arg" width={32} height={32}></Image>
            </div>
            <div className="contact-info-item">
              <i className="fab fa-github"></i>
              <span>github.com/jcdesignweb</span>
            </div>
            <div className="contact-info-item">
              <i className="fab fa-linkedin"></i>
              <span>https://www.linkedin.com/in/jcarmena</span>
            </div>
          </div>
          <form className="contact-form fade-in">
            <div className="form-group">
              <input type="text" placeholder="Nombre" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Asunto" />
            </div>
            <div className="form-group">
              <textarea placeholder="Mensaje" required></textarea>
            </div>

            

            <button type="submit" className="form-submit">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
