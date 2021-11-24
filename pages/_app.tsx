/* eslint-disable react-hooks/exhaustive-deps */
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const listAllowUrl = [
        "/auth/login",
        "/auth/register",
      ];
      const url = router.asPath;
      console.log(url);
      listAllowUrl.forEach(e => {
        if (url.indexOf(e) === -1) {
          return;
        }
      });
      router.push('/auth/login');
    }
  }, []);

  return <Component {...pageProps} />;
}
export default MyApp;
