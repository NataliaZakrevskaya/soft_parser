import cn from 'classnames'

import utils from '../../styles/utils.module.scss'

import styles from './Footer.module.scss'
import {footerNav, hrefEnum} from "../../mock";
import logo from '../../assets/logo.svg'
import SocialLinks from '../SocialLinks/SocialLinks';

const Footer = () => {

    return (
        <footer
            className={styles.footer}
        >
            <div className={utils.container}>
                <div className={styles.main}>
                    <div className={styles.mainLogo}>
                        <img
                            className={styles.logoImage}
                            src={logo}
                            alt='sellershub'
                            width={158}
                            height={34}
                        />
                        <a className={styles.bottomLink} href={hrefEnum.paidOptions}>
                            Реклама на сайте
                        </a>
                    </div>
                    <div className={styles.mainSocial}>
                        <SocialLinks/>
                    </div>
                    <div className={styles.mainNav}>
                        <nav className={styles.nav}>
                            {footerNav.map(group => (
                                <div
                                    key={group.id}
                                    className={cn(styles.navGroup, {[styles.navGroupLarge]: group.large})}
                                >
                                    {group.items?.length && (
                                        <div className={styles.navList}>
                                            {group.items.map(item => (
                                                <a key={item.id} href={'https://sellershub.ru' + item.href || ''} className={styles.navLink}>
                                                    {item.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomCopy}>© 2023 Sellershub.</div>
                    <div className={styles.bottomLinks}>
                        <a className={cn(styles.bottomLink, styles.advertising)} href={'https://sellershub.ru' + hrefEnum.paidOptions}>
                            Реклама на сайте
                        </a>
                        <a className={styles.bottomLink} href={'https://sellershub.ru' + hrefEnum.privacy}>
                            Политика конфиденциальности
                        </a>
                        <a className={styles.bottomLink} href={'https://sellershub.ru' + hrefEnum.userAgreement}>
                            Пользовательское соглашение
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
