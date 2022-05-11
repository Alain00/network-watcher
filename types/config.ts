export interface IConfig {
  hosts: Host[]
}

export interface Host {
  address: string;
  enable?: boolean;
}