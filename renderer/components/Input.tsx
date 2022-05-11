import classNames from "classnames"
import { HTMLAttributes, InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input : React.FC<InputProps> = (props) => {
  return (
    <input 
      {...props}
      className={
        classNames(
          "bg-gray-100  py-2 px-3 focus:outline-none focus:bg-gray-200 placeholder:font-normal text-gray-900 font-normal",
          "transition-all rounded shadow-md",
          props.className
        )
      }
    />
  )
}