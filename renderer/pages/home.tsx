import classNames from 'classnames';
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
        className={classNames(
          "flex max-w-full grid justify-center pb-10 overflow-y-auto styled-scrollbar",
          {
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4": !config.config.compact,
            "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8": config.config.compact
          }
        )}
      >
        {config?.config?.hosts.map((h, index) => (
          <HostInfo 
            key={`index-${h.address}`}
            className="justify-self-center" 
            onRemove={() => handleRemoveHost(h)}
            enable={h.enable}
            compact={config.config.compact}
            onDisable={() => config.updateHost({...h, enable: false})}
            onEnable={() => config.updateHost({...h, enable: true})}
            host={h} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
