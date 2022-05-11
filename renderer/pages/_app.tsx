import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import { ConfigProvider } from '../hooks/useConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
