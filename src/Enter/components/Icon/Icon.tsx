import cn from 'classnames'

import styles from './Icon.module.scss'
import sprite from '../../assets/sprite.svg'

export const Icon = ({ icon, className }: any) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn(className, styles.icon)}>
            <use xlinkHref={`${sprite}#${icon}`}></use>
        </svg>
    )
}
