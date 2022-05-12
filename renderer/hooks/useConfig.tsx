import { ipcRenderer, IpcRendererEvent } from "electron"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import {Host, IConfig} from '../../types/config'
import { useStore } from "./useStore";

interface ConfigContextValue {
  config: IConfig
  addHost: (host: Host) => void
  removeHost: (host: Host) => void
  updateHost: (host: Host) => void
  updateCompact: (compact: boolean) => void
}

const initialValue : ConfigContextValue = {
  config: {hosts: []},
  addHost: () => {},
  removeHost: () => {},
  updateHost: () => {},
  updateCompact: () => {},
}

const ConfigContext = React.createContext<ConfigContextValue>(initialValue);

interface ConfigProviderProps {
  children: React.ReactNode
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({children}) => {
  const store = useStore();
  const [config, setConfig] = useState<IConfig>(store.config);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = useCallback(async () => {
    const config = await store.load();
    setConfig(config);
  }, [store]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const addHost = useCallback((host: Host) => {
    const newConfig = {...config};
    newConfig.hosts.push(host);
    setConfig(newConfig);
    store.update(newConfig);
  }, [config])

  const removeHost = useCallback((host: Host) => {
    const newConfig = {...config};
    const index = newConfig.hosts.findIndex(h => h.address === host.address);
    if (index === -1) return;
    newConfig.hosts.splice(index, 1);
    setConfig(newConfig);
    store.update(newConfig);
  }, [config])

  const updateHost = useCallback((host: Host) => {
    const newConfig = {...config};
    const index = newConfig.hosts.findIndex(h => h.address === host.address);
    if (index === -1) return;
    newConfig.hosts[index] = host;
    setConfig(newConfig);
    store.update(newConfig);
  }, [config])

  const updateCompact = useCallback((value: boolean) => {
    const newConfig = {...config};
    newConfig.compact = value;
    setConfig(newConfig);
    store.update(newConfig);
  }, [config])

  const value: ConfigContextValue = useMemo(() => {
    return {  
      config,
      addHost,
      removeHost,
      updateHost,
      isLoading,
      updateCompact
    }
  }, [config, addHost, removeHost, updateHost, isLoading])
  

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => {
  return useContext(ConfigContext);
}