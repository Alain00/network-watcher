import { useEffect, useState } from "react"
import ping from 'ping'

interface PingReport {
  max?: number
  min?: number
  avg?: number
  count?: number,
  sum?: number
}

export interface UsePingResult {
  pingResult: ping.PingResponse,
  status: PingReport
}

export const usePing = (host: string, interval: number = 5000) : UsePingResult => {
  const [pingResult, setPingResult] = useState<ping.PingResponse>(null)
  const [status, setStatus] = useState<PingReport>({
    max: 0,
    min: Number.MAX_SAFE_INTEGER,
    avg: 0,
    sum: 0,
    count: 0
  })

  const makePing = async () => {
    const result = await ping.promise.probe(host);
    
    if (result.time != 'unknown') {
      setPingResult(result)
      setStatus(prev => {
        return {
          avg: Math.floor((prev.sum + Number(result.time)) / (prev.count + 1)),
          sum: prev.sum + Number(result.time),
          max: Math.max(prev.max, Number(result.time)),
          min: Math.min(prev.min, Number(result.time)),
          count: prev.count + 1
        }
      })
    }else {
      setPingResult({
        ...result,
        time: 999
      })
    }
  }

  useEffect(() => {
    makePing()
    const int = setInterval(makePing, interval)
    return () => clearInterval(int)
  }, [])

  return {
    pingResult,
    status
  }
}