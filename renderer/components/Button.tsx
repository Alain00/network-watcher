import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

export type ButtonVariant = 'transparent' | 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
}

export const Button : React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex items-center justify-center relative overflow-hidden group hover:scale-105 transition-all duration-100",
        "font-bold rounded opacity-60 hover:opacity-100",
        {
          "bg-gray-800 hover:shadow-lg text-white py-2 px-4": variant === 'primary',
          "bg-transparent text-white p-1": variant === 'transparent',
          'bg-gray-800 hover:bg-gray-800 text-white p-2': variant === 'secondary',
        },
        className
      )}
    >
      <div className="z-10 opacity-70 group-hover:opacity-100 flex">
        {children}
      </div>
      {variant === 'primary' && (
        <>
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
        </>
      )}
    </button>
  )
}