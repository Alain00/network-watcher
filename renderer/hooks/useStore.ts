import { useRef } from "react"
import { LocalStorageStore } from "../utils/Store";

export const useStore = () => {
  const store = useRef(new LocalStorageStore());
  
  return store.current;
}