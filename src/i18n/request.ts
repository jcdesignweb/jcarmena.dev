import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  const _cookies = await cookies()
  const locale = _cookies.get('lang')?.value ?? 'es';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
