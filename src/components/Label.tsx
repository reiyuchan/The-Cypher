import React, {FunctionComponent} from 'react'
import './Label.scss'

interface LabelProps {
  children?: React.ReactNode
}

export const Label: FunctionComponent<
  React.HTMLAttributes<HTMLLabelElement & LabelProps>
> = ({children, ...props}) => {
  return (
    <label className='label' {...props}>
      {children}
    </label>
  )
}
