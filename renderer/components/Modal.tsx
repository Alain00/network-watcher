import React, { PropsWithChildren } from "react"
import classNames from "classnames";
import ReactDOM from 'react-dom';
import { AnimationPresence } from "./AnimationPresence";

export interface ModalProps {
  open?: boolean
  onClose?: () => void;
  width?: number;
  className?: string;
}

export const Modal : React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
  className
}) => {
  if (!open) return null;

  return (
    <AnimationPresence
      className="transition duration-400"
      mountClassName={'opacity-100 scale-1'}
      unmountClassName={'opacity-0 scale-125'} 
    >
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-10">
        <div className={"fixed inset-0 bg-gray-900 opacity-80"}/>
        <div className={classNames(
          "w-[400px] bg-gray-900 shadow-lg rounded-lg p-5 z-20",
          "border border-gray-800",
          className
        )}>
          {children}
        </div>
      </div>
    </AnimationPresence>
  )
}

export async function openModal<P, T extends ModalProps = {}>(modalElement: React.ComponentType<T>, props?: T) {
  const host = await new Promise<P | undefined>((resolve) => {
    const container = document.createElement('div')
    container.setAttribute('id', 'notification-container')
    document.body.appendChild(container)
  
    const handleClose = () => {
      ReactDOM.unmountComponentAtNode(container)
      container.remove()
      resolve(undefined);
    }
  
    const handleSubmit = (value: P) => {
      resolve(value);
    }

    const element = React.createElement(modalElement, { 
      open: true,
      onClose: handleClose,
      onSubmit: handleSubmit,
      ...props
    })

    ReactDOM.render(
      element,
      container
    )
  })
  return host;
}