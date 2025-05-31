import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "../globals.css";
import Loader from "../components/loader/Loader";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

import "@/app/page.module.css";

import "@/app/Resonsive.css";
import BackTop from "../components/back-top/BackTop";

import "./blog.css";
import { SideMenu } from "./components/side-menu";
import { SideBar } from "./components/side-bar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  

  return (
    <div>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Loader />

        <Header isMain={false} />

        <SideBar />


    
        <div className="blog-container">
          <SideMenu />

          <main className="main-content">
            {children}

          </main>


        </div>
    
        <Footer />
        <BackTop />
      </NextIntlClientProvider>
    </div>
  );
}
