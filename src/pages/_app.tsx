import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalLayout from '@/component/Global-layout';
import GlobalInput from '@/component/Global-input';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <GlobalInput />
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
