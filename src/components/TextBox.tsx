import React, {FunctionComponent} from 'react'
import './TextBox.scss'

export const TextBox: FunctionComponent<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({...props}) => {
  return <input className='text-box' {...props} type='text' />
}
