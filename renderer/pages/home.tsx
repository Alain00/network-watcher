import classNames from 'classnames';
import Head from 'next/head';
import React from 'react';
import { Header } from '../components/Header';
import { HostInfo } from '../components/HostInfo';
import { useConfig } from '../hooks/useConfig';
import { usePing } from '../hooks/usePing';
import { usePingAlert } from '../hooks/usePingAlert';

function Home() {
  const config = useConfig();

  return (
    <React.Fragment>
      <Head>
        <title>Network Watcher</title>
      </Head>
      <Header />
      <div
        className="flex max-w-full overflow-x-auto justify-start snap-x pb-10 styled-scrollbar"
      >
        {config?.hosts.map(h => (
          <HostInfo className="w-[200px] mx-10 snap-center" host={h} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
