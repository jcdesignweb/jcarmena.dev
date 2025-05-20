import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import "./globals.css";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const metadata: Metadata = {
  title: "jcarmena.dev | Web developer",
  description: "Portfolio multilingüe",
};

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { children, params } = props;
  console.log("Params", params);
  const locale = params.locale;
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
          <ReCaptchaProvider useEnterprise>
            {children}
          </ReCaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
