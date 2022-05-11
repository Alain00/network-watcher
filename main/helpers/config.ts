import fs from 'fs'
import { Host, IConfig } from '../../types/config';

const replaceConfigFile = (config: IConfig) => {
  const strConfig = JSON.stringify(config);
  fs.writeFileSync('./config.json', strConfig);
}

const loadConfigFile = () : IConfig => {
  if (!fs.existsSync('./config.json')) {
    const config: IConfig = {
      hosts: [{
        address: 'localhost'
      }]
    }
    replaceConfigFile(config);
    return;
  }
  const configFile = fs.readFileSync('./config.json', 'utf8');
  const config = JSON.parse(configFile);
  return config;
}

export class Config {
  constructor(
    public config: IConfig = loadConfigFile()
  ) {}

  public updateConfig(newConfig: IConfig) {
    this.config = newConfig;
    replaceConfigFile(this.config);
  }

  public addHost(host: Host) {
    this.config.hosts.push(host);
    replaceConfigFile(this.config);
  }

  public removeHost(host: Host) {
    const index = this.config.hosts.indexOf(host);
    if (index === -1) return;
    this.config.hosts.splice(index, 1);
    replaceConfigFile(this.config);
  }
}