import cn from 'classnames'

import {FC, useEffect, useRef, useState} from 'react'
import utils from '../../../static/css/utils.module.scss'
import logo from '../../../static/images/logo/logo.svg'

import styles from './Header.module.scss'
import {useOnClickOutside} from '../../../utils/hooks/useOnClickOutside'
import {Button} from '../../Common/Button/Button'
import {TopNavMobile} from './modules/TopNavMobile/TopNavMobile'
import {TopNavLarge} from './modules/TopNavLarge/TopNavLarge'

const user = {
  name: 'Example'
}

const menuButtons = [
  {
    title: 'Поддержка',
    icon: '/assets/icons/help.svg',
    iconHover: '/assets/icons/helpHover.svg',
    href: '/support',
  },
]

const nav = [
  {
    id: '1',
    icon: '/images/header/mobnav-1.png',
    iconActive: '/images/header/mobnav-1-active.png',
    title: 'Сервисы',
    items: [
      {
        id: '1',
        title: 'Мониторинг позиций',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '2',
        title: 'Поиск и подбор ключевых слов',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '3',
        title: 'Мониторинг позиций по ПВЗ',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '4',
        title: 'СПП калькулятор',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '5',
        title: 'Шпион за чужими артикулами',
        fullPath: '',
        isDraft: false,
      },
    ]
  },
  {
    id: '2',
    icon: '/images/header/mobnav-2.png',
    iconActive: '/images/header/mobnav-2-active.png',
    title: 'Хабы',
    items: [
      {
        id: '1',
        title: 'Фулфилмент',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '2',
        title: 'Финансы и кредитование',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '3',
        title: 'Дизайнеры',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '4',
        title: 'Менеджеры маркетплейсами',
        fullPath: '',
        isDraft: true,
      },
      {
        id: '5',
        title: 'SEO',
        fullPath: '',
        isDraft: false,
      },
    ]
  },
  {
    id: '3',
    icon: '/images/header/mobnav-3.png',
    title: 'Специалисты',
    items: [
      {
        id: '1',
        title: 'Фулфилмент',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '2',
        title: 'Финансы и кредитование',
        fullPath: '',
        isDraft: false,
      },
    ]
  },
  {
    id: '4',
    icon: '',
    title: 'Товары',
    items: [
      {
        id: '1',
        title: 'Фулфилмент',
        fullPath: '',
        isDraft: false,
      },
      {
        id: '2',
        title: 'Финансы и кредитование',
        fullPath: '',
        isDraft: false,
      },
    ]
  },
  {
    id: '5',
    icon: '',
    title: 'Услуги',
    items: [
      {
        id: '1',
        title: 'Менеджеры маркетплейсами',
        fullPath: '',
        isDraft: true,
      },
      {
        id: '2',
        title: 'SEO',
        fullPath: '',
        isDraft: false,
      },
    ]
  },
  {
    id: '6',
    icon: '',
    title: 'Инструменты',
    items: [
      {
        id: '1',
        title: '',
        fullPath: '',
        isDraft: false,
      }
    ]
  },
  {
    id: '7',
    icon: '',
    title: 'Информация',
    items: [
      {
        id: '1',
        title: '',
        fullPath: '',
        isDraft: false,
      }
    ]
  },
  {
    id: '8',
    icon: '',
    title: 'Блог',
    items: [
      {
        id: '1',
        title: '',
        fullPath: '',
        isDraft: false,
      }
    ]
  },
]

export const Header = (props: { fullWidth?: boolean }) => {
  const [profile, setProfile] = useState<{name: string} | null>(null)
  const [navMob, setNavMob] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }
  const menuRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(navMob){
      document.body.classList.add('state--top-nav-open')
      document.body.classList.add('state--top-navMob-open')
    } else{
      document.body.classList.remove('state--top-nav-open')
      document.body.classList.remove('state--top-navMob-open')
    }
  }, [navMob])

  useOnClickOutside([menuRef, panelRef], () => {
    setMenuOpen(false)
  })

  const handleLogout = () => {
    setProfile(null)
  }

  const registration = () => {

  }

  const login = () => {
    setProfile(user)
  }

  return (
    <header className={styles.header}>
      <div className={cn(utils.container, styles.mainHeader)}>
        <div className={styles.layout}>
          <div className={styles.layoutLogo}>
            <img
              className={styles.logoImage}
              src={logo}
              alt="sellershub"/>
          </div>
          <div className={styles.layoutTrigger}>
            <Button
              square
              alternative
              icon={navMob ? 'close-alt' : 'nav'}
              onClick={() => {
                navMob ? setNavMob(false) : setNavMob(true)
              }}
            />
          </div>
          <div className={styles.layoutNav}>
            <TopNavLarge/>
          </div>
          <div className={styles.layoutActions}>
            {profile && (
              <>
                <Button primary text="Добавить услугу" href={''}/>
                <div className={styles.profile} onClick={toggleMenu} ref={menuRef}>
                  <div className={styles.profile_avatar}>
                    <img
                      src={/*profile?.avatar?.url ? profile.avatar.url : */'/assets/no-avatar.svg'}
                      alt="avatar default"
                    />
                    <div className={cn(styles.profile_arrow, {
                      [styles.profile_arrow_open]: menuOpen,
                    })}/>
                    <div
                      ref={panelRef}
                      className={cn(styles.profile_menu, {
                        [styles.profile_menu_open]: menuOpen,
                      })}
                    >
                      <PanelHeader navMob={navMob}/>
                      <div className={styles.profile_menu_buttons}>
                        {menuButtons.map(b => {
                          return (
                            <a key={b.href} href={b.href || ''} className={styles.profile_menu_button}>
                              <div className={styles.mobileNavBtnIcon} style={{backgroundImage: `url(${b.icon})`}}/>
                              <div className={styles.mobileNavBtnIconHover}
                                   style={{backgroundImage: `url(${b.iconHover})`}}/>
                              <span>{b.title}</span>
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
                </div>
              </>
            )}
            {!profile && (
              <>
                <Button
                  text="Регистрация"
                  alternative
                  onClick={registration}
                />
                <Button
                  text="Войти"
                  primary
                  onClick={login}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <TopNavMobile
        nav={nav}
        profile={profile}
        setProfile={setProfile}
        open={navMob}
        onClose={() => setNavMob(false)}
        login={login}
        registration={registration}
      />
    </header>
  )
}

interface PanelHeaderProps{
  className?: string
  navMob?: boolean
  onClose?: () => void
}

export const PanelHeader: FC<PanelHeaderProps> = ({className, navMob, onClose}) => {
  const profile = {}
  const nameDisplayed = () => {
    return 'Нет имени'
  }

  return (
    <div className={cn(className, styles.profile_menu_header)}>
      <div className={styles.profile_menu_header_avatar}>
        {/*
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore */}
        <img src={profile?.avatar?.url ? profile.avatar.url : '/assets/no-avatar.svg'} alt="avatar default"/>
      </div>

      <div className={styles.profile_menu_header_info}>
        <div className={styles.profile_menu_header_info_name}>{nameDisplayed()}</div>
        <a href={'hrefEnum.me'} onClick={onClose} className={styles.profile_menu_header_info_link}>
          Перейти в профиль
        </a>
      </div>
    </div>
  )
}
