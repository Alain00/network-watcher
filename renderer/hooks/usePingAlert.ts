import { useEffect, useRef, useState } from "react";
import { UsePingResult } from "./usePing";


export type AlertStatus = 'alert' | 'normal'

export const usePingAlert = (pingResult: UsePingResult, maxTime: number) => {
  const playing = useRef(false);
  const interval = useRef(null)
  const sound = useRef<HTMLAudioElement>(null)
  const [status, setStatus] = useState<AlertStatus>('normal')
  const [paused, setPaused] = useState(false)
  
  const playSirene = () => {
    if (paused) return;

    console.log('play sirene with duration', sound.current.duration)
    setStatus('alert')
    playing.current = true;
    sound.current.play();
    sound.current.volume = 1;
    sound.current.loop = true
  }
  
  const stopSirene = () => {
    console.log('stop sirene')
    setStatus('normal')
    playing.current = false;
    sound.current.pause()
    clearInterval(interval.current)
  }

  const pauseAlert = () =>{
    setPaused(true)
    stopSirene()
  }

  const resumeAlert = () => {
    setPaused(false)
  }

  useEffect(() => {
    if (!sound.current)
      sound.current = new Audio('silo-alarm.ogg');

    if (playing.current) {
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
      if (!pingResult.pingResult){
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

  }, [pingResult])

  return {
    status,
    pauseAlert,
    resumeAlert,
    paused
  }
}