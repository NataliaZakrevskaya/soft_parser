import cn from 'classnames'

import styles from './Icon.module.scss'

export const Icon = ({ icon, className }) => {
  const sprite = '/assets/sprite.svg'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn(className, styles.icon)}>
      <use xlinkHref={`${sprite}#${icon}`}></use>
    </svg>
  )
}
