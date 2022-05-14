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
  const sound = useRef<HTMLAudioElement>(null)
  const [status, setStatus] = useState<AlertStatus>('normal')
  
  const playSirene = () => {
    if (status != 'alert')
      setStatus('alert')

    if (paused) return;
    if (playing.current) return;

    playing.current = true;
    sound.current.play();
    sound.current.volume = 1;
    sound.current.loop = true
  }
  
  const stopSirene = () => {
    if (status !== 'normal')
      setStatus('normal')    

    if (playing.current === false) return;
    playing.current = false;
    sound.current.pause()
  }

  const setupSound = () => {
    if (!sound.current)
      sound.current = new Audio('silo-alarm.ogg');
  }

  useEffect(() => {
    setupSound();

    let normalCondition = true;
    normalCondition &&= pingResult.pingResult?.alive;
    normalCondition &&= pingResult.pingResult?.time !== 'unknown'
    normalCondition &&= pingResult.pingResult?.time < maxTime;

    if (normalCondition) {
      stopSirene();
    } else {
      playSirene();
    }
  }, [pingResult.pingResult, paused])

  return {
    status,
    stopSirene,
    playSirene,
    paused
  }
}