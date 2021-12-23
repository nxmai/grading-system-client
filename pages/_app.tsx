/* eslint-disable react-hooks/exhaustive-deps */
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import '../styles/globals.css';

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

  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>;
}
export default MyApp;
