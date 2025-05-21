import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import "./globals.css";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const metadata: Metadata = {
  title: "jcarmena.dev | Web developer",
  description: "Portfolio multilingüe",
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
            
            {children}
          </ReCaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
