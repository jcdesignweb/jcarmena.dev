import { useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import "./Contact.css";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ContactSection = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [statusCaptcha, setStatusCaptcha] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const cleanForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    setStatusCaptcha("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusCaptcha("");
    setIsProcessing(true);
    
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not yet available");
      return;
    }

    const token = await executeRecaptcha("submit_form");
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ token, name, email, message, subject }),
      headers: { "Content-Type": "application/json" },
    });

    setIsProcessing(false);

    if (res.ok) {
      cleanForm();
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
              <input
                type="text"
                placeholder={t("contact.form.placeholders.name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder={t("contact.form.placeholders.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder={t("contact.form.placeholders.subject")}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder={t("contact.form.placeholders.message")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            {statusCaptcha && <p>{statusCaptcha}</p>}

            <button
              type="submit"
              className="form-submit"
              disabled={isProcessing}
            >
              {t("contact.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
