"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default async function NotFound() {
  const t = useTranslations();

  return (
    <div id="not-found">
      <h2>{t("not_found.title")}</h2>

      <Image alt="jcarmena.dev" src={"/logo.png"} height={100} width={100} />

      <p>
        {t("not_found.return_to")} <Link href="/">{t("generics.home")}</Link>
      </p>
    </div>
  );
}
