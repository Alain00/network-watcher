import React, { PropsWithChildren } from "react"
import classNames from "classnames";

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
  )
}