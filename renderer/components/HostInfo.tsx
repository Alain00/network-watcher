import classNames from "classnames"
import { Host } from "../../types/config"
import { usePing, UsePingResult } from "../hooks/usePing"
import { usePingAlert } from "../hooks/usePingAlert"
import { HostEvent, useHostEvent, useHostEventEmmiter } from "../hooks/useHostEvents"
import { Button } from "./Button"
import { Icon } from "./Icon"
import React from 'react';
import { useContext } from "react"

export interface HostInfoProps {
  host: Host;
  className?: string;
  enable?: boolean;
  compact?: boolean;
  onEnable?: () => void;
  onDisable?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
  pingResult?: UsePingResult;
}

export interface HostInfoContextValue {
  ping: UsePingResult,
  emmiter: ReturnType<typeof useHostEventEmmiter>
}

export const HostInfoContext = React.createContext<HostInfoContextValue>({
  ping: null,
  emmiter: null
})

export const HostInfo = ({
  ...props
}: HostInfoProps) => {
  const ping = usePing(props.host.address);
  const emmiter = useHostEventEmmiter(ping);

  return (
    <HostInfoContext.Provider value={{
      ping,
      emmiter
    }}>
      <HostInfoDetail 
        {...props}
      />
    </HostInfoContext.Provider>
  )
}

export const useHostInfo = () => {
  return useContext(HostInfoContext);
}

export const HostInfoDetail : React.FC<HostInfoProps> = (props) => {
  const {ping} = useHostInfo()

  const status = usePingAlert(ping, {
    maxTime: props.host.maxTime ?? 100,
    paused: !props.enable,
  })

  const handleEnable = () => {
    props.onEnable?.()
  }

  const handleDisable = () => {
    status.stopSirene()
    props.onDisable?.()
  }

  // useHostEvent(HostEvent.Online, () => {
  //   new Notification(`Host ${props.host.displayName || props.host.address} is online`);
  // })

  // useHostEvent(HostEvent.Offline, () => {
  //   new Notification(`Host ${props.host.displayName || props.host.address} is offline`);
  // })

  return (
    <div className={classNames(
      "flex flex-col mt-8 font-bold justify-center items-center",
      {
        "p-4": !props.compact,
        "p-2": props.compact
      },
      props.className
    )}>
      <div className={classNames(
        "hover:scale-150 transition",
        {
          "text-4xl mb-4": props.compact,
          "text-6xl mb-10": !props.compact,
          "text-red-900": status.status === 'alert',
          "text-gray-400": status.status === 'normal'
        }
      )}>
        {status.status === 'normal' ?
          props.host.onlineDisplay || "😁"
        : 
          props.host.offlineDisplay || "😡"
        }
      </div>
      <span className={classNames(
        "text-lg text-gray-800",
      )}>
        {props.host.displayName || ping?.pingResult?.host}
      </span>
      <h1 className={classNames(
        "flex",
        {
          "text-4xl": props.compact,
          "text-8xl": !props.compact
        }
      )}>
        <span className={classNames(
          {
            "text-red-800": status.status === 'alert',
            "text-gray-600": status.status === 'normal',
          }
        )}>
          {ping?.pingResult?.time ?? '999'}
        </span>
        <div className="flex flex-col justify-end items-start">
          <span className={classNames(
            "text-gray-600",
            {
              "text-2xl": props.compact,
              "text-6xl": !props.compact,
            }
          )}>
            ms
          </span>
        </div>
      </h1>
      {!props.compact && (
        <table className="mt-4">
          <tbody>
            <tr>
              <td className="flex justify-end text-gray-800 mr-4">
                Average
              </td>
              <td>
                {ping?.status.avg}
                <span className="text-gray-600">
                  ms
                </span>
              </td>
            </tr>
            <tr>
              <td className="flex justify-end text-gray-800 mr-4">
                Max
              </td>
              <td>
                {ping?.status.max}
                <span className="text-gray-600">
                  ms
                </span>
              </td>
            </tr>
            <tr>
              <td className="flex justify-end text-gray-800 mr-4">
                Min
              </td>
              <td>
                {ping?.status.min}
                <span className="text-gray-600">
                  ms
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
        <div className="grid grid-cols-3 gap-2 justify-center items-center px-4 mt-5">
          {!props.enable ?
            <Button title="Enable Alarm" onClick={handleEnable} variant='secondary'>
              <Icon name="play" className={!props.compact && "mr-2"}/>
              {!props.compact && " On"}
            </Button>
          : 
            <Button title="Disable Alarm" onClick={handleDisable} className="opacity-20" variant='secondary'>
              <Icon name="pause" className={!props.compact && "mr-2"} />
              {!props.compact && " Off"}
            </Button>
          }
          <Button className="text-red-500" onClick={props.onRemove} variant='secondary'>
            <Icon name="trash" className={!props.compact && "mr-2"} />
            {!props.compact && " Bye"}
          </Button>
          <Button className="" onClick={props.onEdit} variant='secondary'>
            <Icon name="pencil" className={!props.compact && "mr-2"} />
            {!props.compact && " Edit"}
          </Button>
        </div>
    </div>
  )
}