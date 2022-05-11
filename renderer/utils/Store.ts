import { ipcRenderer } from "electron";
import { IConfig } from "../../types/config";


export interface IStore {
  update(value: IConfig): void;
  get(): IConfig;
  
  load(storeValue?: unknown): Promise<IConfig>;
}

export class LocalStorageStore implements IStore {
  constructor (
    public config : IConfig = {hosts: []}
  ) {}

  update(value: IConfig): void {
    this.config = value;
    localStorage.setItem('config', JSON.stringify(value));
  }

  get(): IConfig {
    const value = localStorage.getItem('config');
    if (!value) return undefined;
    return JSON.parse(value);
  }

  async load(storeValue?: IConfig) {
    if (storeValue) {
      this.update(storeValue);
      return storeValue;
    }

    const value = this.get();
    if (value) return value;
    
    this.update(this.config);
    return this.config;
  }
}


export class FileStore implements IStore {
  constructor (
    public config : IConfig = {hosts: []}
  ) {

  }

  update(value: IConfig): void {
    this.config = value;
    ipcRenderer.send('update-config', this.config)
  }

  get(): IConfig {
    return this.config
  }

  async load(value?: IConfig) {
    if (value) {
      this.update(value);
      return value;
    }

    ipcRenderer.send('request-config')
    const newConfig : IConfig = await new Promise((resolve) => {
      ipcRenderer.once('load-config', (event, data) => {
        resolve(data)
      })
    })
    this.config = newConfig

    return newConfig;
  }
}