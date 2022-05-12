import classNames from "classnames"

export interface IconProps {
  className?: string;
  name: string;
  type?: string;
}

export const Icon = ({
  className,
  name,
  type = 'rr'
}: IconProps) => {
  return (
    <i className={classNames(
      `fi fi-${type}-${name} flex items-center justify-center`,
      className
    )} />
  )
}