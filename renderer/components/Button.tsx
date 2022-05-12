import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button : React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex items-center justify-center relative overflow-hidden group hover:shadow-lg hover:scale-105 transition-all duration-100",
        "bg-gray-800 text-white font-bold py-2 px-4 rounded opacity-60 hover:opacity-100",
        props.className
      )}
    >
      <div className="z-10 opacity-70 group-hover:opacity-100 flex">
        {props.children}
      </div>
      <div 
        className={classNames(
          "absolute transition-all h-[600%] w-[40%] bg-gray-700 rotate-45 left-0 group-hover:left-[50%] group-hover:translate-x-[-50%]",
          "group-hover:scale-[1.1] opacity-0 group-hover:opacity-50"
        )}
      />
      <div 
        className={classNames(
          "absolute transition-all h-[600%] w-[40%] bg-gray-700 rotate-45 right-0 group-hover:right-[40%] group-hover:translate-x-[-40%]",
          "group-hover:scale-[1.1] opacity-0 group-hover:opacity-20"
        )}
      />
    </button>
  )
}