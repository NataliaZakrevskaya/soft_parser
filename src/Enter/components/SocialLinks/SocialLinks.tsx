import styles from './SocialLinks.module.scss'
import cn from 'classnames'
import { Icon } from '../Icon/Icon'
interface IProps {
    align?: 'left' | 'center' | 'right'
}
const SocialLinks = ({ align = 'left' }: IProps) => {
    return (
        <div
            className={cn(styles.social, {
                [styles.socialAlignCenter]: align === 'center',
                [styles.socialAlignRight]: align === 'right',
            })}
        >
            <div className={styles.socialLabel}>Будьте в курсе новостей!</div>
            <div className={styles.socialList}>
                <a
                    href= 'https://vk.com/sellershub'
                    title="VK"
                    className={cn(styles.socialBtn, styles.socialBtnVk)}
                    target='_blank'
                    rel={ 'nofollow noreferrer' }
                >
                    <Icon className={styles.socialBtnIcon} icon="vk" />
                </a>
                <a
                    href='https://t.me/sellershubwow'
                    title="Telegram"
                    className={cn(styles.socialBtn, styles.socialBtnTelegram)}
                    target='_blank'
                    rel={ 'nofollow noreferrer' }
                >
                    <Icon className={styles.socialBtnIcon} icon="telegram" />
                </a>
                <a
                    href='https://www.youtube.com/@sellershub'
                    title="Youtube"
                    className={cn(styles.socialBtn, styles.socialBtnYoutube)}
                    target='_blank'
                    rel={ 'nofollow noreferrer' }
                >
                    <Icon className={styles.socialBtnIcon} icon="youtube" />
                </a>
            </div>
        </div>
    )
}

export default SocialLinks