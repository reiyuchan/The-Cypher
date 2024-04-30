import React, {FunctionComponent} from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode
}

export const Button: FunctionComponent<
  React.HTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({children, ...props}) => {
  return (
    <button className='btn' {...props}>
      {children}
    </button>
  )
}
