import cn from 'classnames'
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import styles from './TopNavMobile.module.scss'
import { PanelHeader } from '../Header/Header'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { hrefEnum } from '../../mock'
import { useOnEscape, useOnResize } from '../../utils/hook'
import { breakpoints } from '../../utils/breakpoints'
import logo from '../../assets/logo.svg'
import exit from '../../assets/icons/exit.svg'
interface IProps {
    nav: any
    profile: any
    setProfile: Dispatch<SetStateAction<null>>
    onClose?: () => void
    open: boolean
    login: () => void
    registration: () => void
}

export const TopNavMobile: FC<IProps> = ({ nav, profile, setProfile, open, onClose, login, registration }) => {
    const [openNavItem, setOpenNavItem] = useState<number | null>(null)
    const scrollContainer = useRef<HTMLDivElement>(null)
    const topDivRef = useRef<HTMLDivElement>(null)

    useOnResize(() => {
        if (window.innerWidth >= breakpoints['md-min']) {
            if (typeof onClose === 'function') {
                onClose()
            }
        }
    })

    useOnEscape(() => {
        if (typeof onClose === 'function') {
            onClose()
        }
    })


    return (
        <div className={cn(styles.mobileNavWrapper, { [styles.mobileNavOpen]: open })} ref={scrollContainer}>
            <div className={cn(styles.mobileNav, { [styles.mobileNavOpen]: open })} >
                <div className={styles.mobileNavHeader}>
                    <img
                        className={styles.logoImage}
                        src={logo}
                        alt="sellershub"
                        width={125}
                        height={24}
                    />
                    <Button
                        square
                        alternative
                        icon={'close-alt'}
                        onClick={onClose}
                    />
                </div>
                <div className={styles.mobileNavContainer} ref={topDivRef}>
                    {profile && (
                        <>
                            {/*// @ts-ignore*/}
                            <PanelHeader className={styles.panel} onClose={onClose} />
                        </>
                    )}
                    <div className={styles.mobileNavList}>
                        {nav?.map((item: any) => (
                            <div
                                key={item.id}
                                className={cn(styles.mobileNavItem, {
                                    [styles.mobileNavItemOpen]: openNavItem === item.id,
                                })}
                            >
                                <button
                                    className={styles.mobileNavBtn}
                                    type="button"
                                    onClick={() => {
                                        setOpenNavItem(openNavItem === item.id || !item?.items?.length ? null : item.id)
                                    }}
                                >
                                    {openNavItem !== item.id && item.icon && <img className={styles.mobileNavBtnIcon} src={item.icon} width={24} height={24} alt='' />}
                                    {openNavItem === item.id && item.icon && !item.iconActive && <img className={styles.mobileNavBtnIcon} src={item.icon} width={24} height={24} alt='' />}
                                    {openNavItem === item.id && item.iconActive && <img className={styles.mobileNavBtnIcon} src={item.iconActive} width={24} height={24} alt='' />}
                                    <span className={styles.mobileNavBtnText}>{item.title}</span>
                                    {item.items?.length > 0 && (
                                        <Icon className={styles.mobileNavBtnArrow} icon="chevron-down-sm" />
                                    )}
                                </button>
                                <div className={styles.mobileNavSubList}>
                                    {item?.items?.map((subItem: any) => (
                                        <a
                                            key={subItem.id}
                                            className={cn(styles.mobileNavBtn, styles.mobileNavBtnSub)}
                                            href={`${hrefEnum.catalog}/${subItem.fullPath}`}
                                        >
                                            {!subItem?.isDraft && <span className={styles.mobileNavBtnText} onClick={onClose}>{subItem.title}</span>}
                                            {subItem?.isDraft && <div>
                                                <span className={cn(styles.mobileNavBtnText, styles.mobileNavBtnText_draft)} onClick={onClose}>{subItem.title}</span>
                                                <div className={styles.mobileNavBtnText_draftIcon}>В разработке</div>
                                            </div>}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className={styles.mobileNavSeparator} />

                    <div className={styles.mobileNavActions}>
                        {profile ? (
                            <div className={styles.profile_menu_footer}>
                                <div
                                    className={cn(styles.profile_menu_button, styles.profile_menu_button_danger)}
                                    onClick={() => setProfile(null)}
                                >
                                    <img src={exit} alt="exit" />
                                    <span>Выйти</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Button
                                    text="Войти"
                                    primary
                                    block
                                    onClick={login}
                                />
                                <Button
                                    text="Регистрация"
                                    block
                                    onClick={registration}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}