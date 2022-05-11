import Head from 'next/head';
import React from 'react';
import { Host } from '../../types/config';
import { Header } from '../components/Header';
import { HostInfo } from '../components/HostInfo';
import { useConfig } from '../hooks/useConfig';

function Home() {
  const config = useConfig();

  const handleRemoveHost = (host: Host) => {
    config.removeHost(host)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Network Watcher</title>
      </Head>
      <Header />
      <div
        className="flex max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center pb-10 overflow-y-auto styled-scrollbar"
      >
        {config?.config?.hosts.map((h, index) => (
          <HostInfo 
            key={index}
            className="mx-10 justify-self-center" 
            onRemove={() => handleRemoveHost(h)}
            enable={h.enable}
            onDisable={() => config.updateHost({...h, enable: false})}
            onEnable={() => config.updateHost({...h, enable: true})}
            host={h} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
