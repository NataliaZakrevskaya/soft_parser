import {BackgroundColorsType, INavItem} from '../../../types'

export interface IProps{
  nav?: INavItem[] | any
  onClick?: (color: BackgroundColorsType) => void
}