import { ipcRenderer, IpcRendererEvent } from "electron"
import { useCallback, useEffect, useState } from "react"
import {IConfig} from './../../types/config'

export const useConfig = () => {
  const [config, setConfig] = useState<IConfig>(undefined)
  
  const loadConfig = useCallback((event: IpcRendererEvent, config: IConfig) => {
    setConfig(config);
  }, [])

  useEffect(() => {
    ipcRenderer.send('request-config')
    ipcRenderer.on('load-config', loadConfig)
    return () => {
      ipcRenderer.removeListener('load-config', loadConfig);
    }
  }, [loadConfig])

  return config;
}