import { useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import "./Contact.css";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ContactSection = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [statusCaptcha, setStatusCaptcha] = useState("xxx");

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    

    e.preventDefault();
    if (!executeRecaptcha) {
      setStatusCaptcha("reCAPTCHA not yet available");
      return;
    }

    const token = await executeRecaptcha("submit_form");

    console.log("Token obtenido:", token);
    const res = await fetch("/api/verify-recaptcha", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatusCaptcha("Formulario enviado correctamente.");
    } else {
      setStatusCaptcha("Fallo en validación de reCAPTCHA.");
    }
  };

  const t = useTranslations();
  return (
    <section className="section contact" id="contact">
      <div className="contact-container">
        <h2 className="section-title fade-in">{t("contact.title")}</h2>
        <div className="contact-wrapper">
          <div className="contact-info fade-in">
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <span>juan14nob@gmail.com</span>
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
          <form className="contact-form fade-in" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Nombre" value={"Juan"} required />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={"juan14nob@gmail.com"}
                required
              />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Asunto" value={"test"} />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Mensaje"
                value={"Test message"}
                required
              ></textarea>
            </div>

            {statusCaptcha && <p>{statusCaptcha}</p>}

            <button type="submit" className="form-submit">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
