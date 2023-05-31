import {CSSProperties, ReactNode} from 'react'

export interface IProps{
  alternative?: boolean
  ariaLabel?: string
  block?: boolean
  children?: ReactNode
  className?: string
  classNameIcon?: string
  danger?: boolean
  disabled?: boolean
  ghost?: boolean,
  href?: string | URL,
  icon?: string,
  iconLeft?: string,
  leftIcon?: string,
  loading?: boolean,
  onClick?: (e: React.MouseEvent<any>) => void,
  primary?: boolean,
  rel?: string,
  size?: string,
  square?: boolean,
  style?: CSSProperties,
  target?: '_blank',
  text?: string,
  title?: string,
  type?: 'button' | 'submit' | 'reset' | undefined
}