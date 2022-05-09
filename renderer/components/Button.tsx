import classNames from "classnames"
import { HTMLAttributes } from "react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button : React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex items-center justify-center",
        "bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
        props.className
      )}
    >
      {props.children}
    </button>
  )
}