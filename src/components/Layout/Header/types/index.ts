import {HTMLAttributeAnchorTarget} from 'react'

export type BackgroundColorsType = 'white' | 'gray' | 'blue'

export interface INavItem {
  banners?: INavBanner[]
  href?: string
  icon?: string
  id: number
  items: INavSubItem[]
  note?: string
  title?: string
}

export interface INavSubItem {
  fullPath?: string
  href: string
  icon?: string
  id: number
  title?: string
}

export interface INavBanner {
  href: string
  id: number
  image?: string
  target: HTMLAttributeAnchorTarget | undefined
  title?: string
}
