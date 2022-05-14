import EventEmitter from "events";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Host } from "../../types/config";
import { HostInfoContext, useHostInfo } from "../components/HostInfo";
import { UsePingResult } from "./usePing";

export enum HostEvent {
  Online = 'online',
  Offline = 'offline',
  MaxTimeReached = 'max-time-reached'
}

export type HostEventCallback = () => void

export const useHostEventEmmiter = (ping: UsePingResult) => {
  const eventEmmiter = useRef(new EventEmitter())

  const on = useCallback((event: HostEvent, callback: HostEventCallback) => {
    eventEmmiter.current.on(event, callback);
  }, [])

  const off = useCallback((event: HostEvent, callback: HostEventCallback) => {
    eventEmmiter.current.off(event, callback);
  }, [])

  useEffect(() => {
    if (ping.pingResult?.alive){
      eventEmmiter.current.emit(HostEvent.Online);
    }else {
      eventEmmiter.current.emit(HostEvent.Offline);
    }
  }, [ping.pingResult?.alive])

  return {
    on,
    off
  }
}

export const useHostEvent = (event: HostEvent, callback: HostEventCallback) => {
  const {emmiter: {on, off}} = useHostInfo()

  useEffect(() => {
    on(event, callback);
    return () => {
      off(event, callback)
    }
  }, [on])
}