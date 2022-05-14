import classNames from 'classnames';
import React from 'react'
import { useEffect } from 'react';

export interface AnimationPresenceProps {
  children?: React.ReactNode
  className?: string
  mountClassName?: string
  unmountClassName?: string
}

export const AnimationPresence = ({
  children,
  className,
  unmountClassName,
  mountClassName,
}: AnimationPresenceProps) => { 
  const element = children as React.ReactElement;
  const [animClassName, setAnimClassName] = React.useState(unmountClassName);

  useEffect(() =>{
    setAnimClassName(mountClassName);

    return () => {
      setAnimClassName(unmountClassName);
    }
  }, [mountClassName])

  return React.cloneElement(element, {
    className: classNames(element.props.className, className, animClassName),
  });
}