
import Image from 'next/image'
import './Header.css'
import { useTranslations } from 'next-intl';
import { getCookie } from '@/app/utils';

export const Header = () => {
  const t = useTranslations();
  const selectedLang = getCookie('lang') || 'es';
 
  const langOnClick = async (lang: 'es'|'en') => {
    document.cookie = `lang=${lang}`
    location.reload()
  }

  return (
    <header>
      <nav className="navbar scrolled">
        <div className="navbar-container">
            <a href="#" className="logo"><Image src={"/logo.png"} alt="Logo" height={40} width={40}/></a>
            <ul className="nav-links">
                <li><a href="#about">{t('menu.about_me')}</a></li>
                <li><a href="#projects">{t('menu.projects')}</a></li>
                <li><a href="#experience">{t('menu.experience')}</a></li>
                <li><a href="#contact">{t('menu.contact')}</a></li>
            </ul>
            <div className='langs'>
              <a href="#" className={selectedLang === 'es'? 'active': ''} onClick={() => {langOnClick('es')}}>es</a>
              <span> / </span>
              <a href="#" className={selectedLang === 'en'? 'active': ''} onClick={() => {langOnClick('en')}}>en</a>
              
            </div>
            <div className="hamburger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </div>
    </nav>
    </header>
  )
}