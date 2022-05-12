export interface IConfig {
  hosts: Host[],
  compact?: boolean,
}

export interface Host {
  address: string;
  enable?: boolean;
  maxTime?: number;
}