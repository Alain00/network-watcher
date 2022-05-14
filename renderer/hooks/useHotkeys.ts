import { useEffect, useMemo, useRef } from "react"

export const useHotkeys = (
  hotkey : string,
  callback : (event: KeyboardEvent) => void
) => {
  const keychain = useMemo(() => hotkey.split("+").map(h => h.toLowerCase()), [hotkey])
  const step = useRef<string[]>()


  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    const isIncluded = keychain.includes(key)
    if (!isIncluded) {
      step.current = [];
      return;
    }

    const isFirst = step.current === undefined || step.current.length == 0;
    const isNext = step.current !== undefined && keychain[step.current.length] === key

    if (isFirst || isNext) {
      step.current = step.current || []
      step.current.push(key)
      if (step.current.length === keychain.length) {
        callback(e)
      }
    } else {
      step.current = []
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    const { key } = e
    if (step.current && step.current.includes(key.toLowerCase())) {
      step.current = step.current.filter(k => k !== key.toLowerCase())
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  })
}