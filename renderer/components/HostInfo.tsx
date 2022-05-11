import classNames from "classnames"
import { Host } from "../../types/config"
import { usePing } from "../hooks/usePing"
import { usePingAlert } from "../hooks/usePingAlert"
import { Button } from "./Button"

export interface HostInfoProps {
  host: Host;
  className?: string;
  enable?: boolean;
  onEnable?: () => void;
  onDisable?: () => void;
  onRemove?: () => void;
}

export const HostInfo : React.FC<HostInfoProps> = (props) => {
  const ping = usePing(props.host.address)
  const status = usePingAlert(ping, {
    maxTime: 100,
    paused: !props.enable,
  })

  const handleEnable = () => {
    props.onEnable?.()
  }

  const handleDisable = () => {
    status.stopSirene()
    props.onDisable?.()
  }

  return (
    <div className={classNames(
      "flex flex-col mt-8 font-bold justify-center items-center p-4",
      props.className
    )}>
      <div className="text-6xl mb-10 hover:scale-150 transition">
        {status.status === 'normal' ?
          "😁"
        : 
          "😡"
        }
      </div>
      <span className="text-lg text-gray-800">
        {ping?.pingResult?.host}
      </span>
      <h1 className="text-8xl flex">
        {ping?.pingResult?.time ?? '9999+'}
        <div className="flex flex-col justify-end items-start">
          <span className="text-6xl text-gray-600">
            ms
          </span>
        </div>
      </h1>
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
        <div className="grid grid-cols-2 gap-2 justify-center items-center px-4 mt-5">
          {!props.enable ?
            <Button title="Enable Alarm" onClick={handleEnable}>
              <span className="">Enable</span>
            </Button>
          : 
          <Button title="Disable Alarm" onClick={handleDisable} className="opacity-40 hover:opacity-80">
              <span className="">Disable</span>
            </Button>
          }
          <Button className="text-red-500" onClick={props.onRemove}>
            Remove
          </Button>
        </div>
    </div>
  )
}