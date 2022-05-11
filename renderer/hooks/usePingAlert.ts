import { useEffect, useRef, useState } from "react";
import { UsePingResult } from "./usePing";


export type AlertStatus = 'alert' | 'normal'

export interface UsePingAlertOptions {
  paused?: boolean;
  maxTime?: number;
}

export const usePingAlert = (pingResult: UsePingResult, {
  maxTime = 100,
  paused = false
}: UsePingAlertOptions) => {
  const playing = useRef(false);
  const interval = useRef(null)
  const sound = useRef<HTMLAudioElement>(null)
  const [status, setStatus] = useState<AlertStatus>('normal')
  
  const playSirene = () => {
    if (paused) return;

    setStatus('alert')
    playing.current = true;
    sound.current.play();
    sound.current.volume = 1;
    sound.current.loop = true
  }
  
  const stopSirene = () => {
    setStatus('normal')
    playing.current = false;
    sound.current.pause()
    clearInterval(interval.current)
  }

  useEffect(() => {
    if (!sound.current)
      sound.current = new Audio('silo-alarm.ogg');

    if (playing.current) {
      if (paused) {
        stopSirene()
        return;
      }
      
      if (!pingResult.pingResult) return;

      let condition = true;
      condition &&= pingResult.pingResult.alive == true;
      condition &&= pingResult.pingResult.time !== 'unknown';
      condition &&= pingResult.pingResult.time < maxTime;
      if (condition){
        stopSirene()
        return;
      }
    } else {
      if (!pingResult?.pingResult){
        playSirene()
        return;
      }

      if (!pingResult.pingResult.alive){
        playSirene()
        return;
      }

      if (pingResult.pingResult.time === 'unknown'){
        playSirene()
        return;
      }
  
      if (pingResult.pingResult.time >= maxTime) {
        playSirene();
        return;
      }
    }

  }, [pingResult, paused])

  return {
    status,
    stopSirene,
    playSirene,
    paused
  }
}