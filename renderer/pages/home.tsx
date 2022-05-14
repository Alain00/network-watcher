import classNames from 'classnames';
import Head from 'next/head';
import React, { useMemo } from 'react';
import { Host } from '../../types/config';
import { openAddHostModal } from '../components/AddHostModal/AddHostModal';
import { Header } from '../components/Header';
import { HostInfo } from '../components/HostInfo';
import { useConfig } from '../hooks/useConfig';

function Home() {
  const config = useConfig();
  const [search, setSearch] = React.useState('');

  const handleRemoveHost = (host: Host) => {
    config.removeHost(host)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
  }

  const handleEdit = async (host: Host) => {
    const newHost = await openAddHostModal({
      defaultValues: host,
      title: 'Edit host',
      confirmButtonText: 'Confirm'
    })
    if (!newHost) return;
    config.updateHost(newHost);
  }

  const filteredHosts = useMemo(() => {
    if (!search) return config?.config?.hosts ?? [];
    return config.config.hosts.filter(host => {
      return host.address.includes(search) || host.displayName?.includes(search);
    });
  }, [config, search]);

  return (
    <React.Fragment>
      <Head>
        <title>Network Watcher</title>
      </Head>
      <Header 
        onSearchChange={handleSearchChange} 
      />
      <div
        className={classNames(
          "flex max-w-full grid justify-center pb-10 overflow-y-auto styled-scrollbar",
          {
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4": !config.config.compact,
            "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8": config.config.compact
          }
        )}
      >
        {filteredHosts.map((h, index) => (
          <HostInfo 
            key={`index-${h.address}`}
            className="justify-self-center" 
            onRemove={() => handleRemoveHost(h)}
            enable={h.enable}
            compact={config.config.compact}
            onDisable={() => config.updateHost({...h, enable: false})}
            onEnable={() => config.updateHost({...h, enable: true})}
            onEdit={() => handleEdit(h)}
            host={h} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
