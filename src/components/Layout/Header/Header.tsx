import React, {useRef, useState} from 'react'
import styles from './Header.module.scss'
import {Button} from '../../Common/Button/Button'
import utils from '../../../static/css/utils.module.scss'
import LogoIcon from './modules/LogoIcon'
import {TopNavLarge} from './modules/TopNavLarge/TopNavLarge'
import cn from 'classnames'
import {menuButtons} from '../../../utils/mocks'

const Header = () => {

  let isAuthorized = true

  const menuRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }
  const handleLogout = () => {
    // dispatch(logout())
    // if (router.asPath.includes(hrefEnum.me)) {
    //   router.push(hrefEnum.main)
    // }
  }

  return (
    <header>
      <div className={utils.container}>
        <div className={styles.layout}>
          <div className={styles.layoutLogo}>
            <LogoIcon/>
          </div>
          <div className={styles.layoutTrigger}>
            <Button
              square
              alternative
              onClick={() => false}
            />
          </div>
          <div className={styles.layoutNav}>
            <TopNavLarge/>
          </div>
          <div className={styles.layoutActions}>
            {isAuthorized && (
              <>
                <Button primary text="Добавить услугу" onClick={() => false}/>
                <div className={styles.profile} onClick={toggleMenu} ref={menuRef}>
                  <div className={styles.profile_avatar}>
                    <img
                      // src={user?.avatar?.url ? user.avatar.url : '/assets/no-avatar.svg'}
                      src={'../../../static/images/no-avatar.svg'}
                      alt="avatar default"
                    />
                  </div>
                  <div className={cn(styles.profile_arrow, {
                    [styles.profile_arrow_open]: menuOpen,
                  })}/>
                  <div
                    ref={panelRef}
                    className={cn(styles.profile_menu, {
                      [styles.profile_menu_open]: menuOpen,
                    })}
                  >
                    {/*<PanelHeader/>*/}
                    <div className={styles.profile_menu_buttons}>
                      {menuButtons.map(button => {
                        return (
                          <a key={button.href} href={button.href || ''} className={styles.profile_menu_button}>
                            <div className={styles.mobileNavBtnIcon} style={{backgroundImage: `url(${button.icon})`}}/>
                            <div className={styles.mobileNavBtnIconHover}
                                 style={{backgroundImage: `url(${button.iconHover})`}}/>
                            <span>{button.title}</span>
                          </a>
                        )
                      })}
                    </div>
                    <div className={styles.profile_menu_footer}>
                      <div
                        onClick={handleLogout}
                        className={cn(
                          styles.profile_menu_button,
                          styles.profile_menu_button_danger,
                        )}
                      >
                        <img src="/assets/icons/exit.svg" alt="exit"/>
                        <span>Выйти</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {!isAuthorized && (
              <>
                <Button
                  text="Регистрация"
                  alternative
                  className={styles.mainRouteBtn}
                  onClick={() => false}
                />
                <Button
                  text="Войти"
                  primary
                  onClick={() => false}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/*<TopNavMobile*/}
      {/*  nav={crutch}*/}
      {/*  open={navMob}*/}
      {/*  onClose={() => {*/}
      {/*    dispatch(closeMobMenu())*/}
      {/*  }}*/}
      {/*/>*/}
    </header>
  )
}

export default Header