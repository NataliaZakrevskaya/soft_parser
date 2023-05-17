import cn from 'classnames'
import {useEffect, useRef, useState} from 'react'
import styles from './TopNavLarge.module.scss'
import {hrefEnum} from '../../../../../utils/enums'
import {IProps} from './types'
import {useOnResize} from '../../../../../utils/hooks/useOnResize'
import {useOnEscape} from '../../../../../utils/hooks/useOnEscape'
import {useOnClickOutside} from '../../../../../utils/hooks/useOnClickOutside'
import utils from '../../../../../static/css/utils.module.scss'

let openTimeout: ReturnType<typeof setTimeout>
let closeTimeout: ReturnType<typeof setTimeout>
let openTimeoutL2: ReturnType<typeof setTimeout>

export const TopNavLarge: React.FC<IProps> = ({nav, onClick}) => {

  const [open, setOpen] = useState(false)
  const [openNavItem, setOpenNavItem] = useState<number | null | string>('1')

  const [touch, setTouch] = useState(false)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    setTouch(!(window && window.matchMedia('(any-hover: hover)').matches))
  }, [])

  useEffect(() => {
    if(open){
      setOpenNavItem('1')
      document.body.classList.add('state--top-nav-open')
    } else{
      document.body.classList.remove('state--top-nav-open')
    }
  }, [open])

  useOnResize(() => {
    if(window.innerWidth <= 639){
      setOpen(false)
    }
  })

  useOnEscape(() => {
    setOpen(false)
    setOpenNavItem('1')
  })

  useOnClickOutside([dropdownRef, triggerRef], () => {
    setOpen(false)
    setOpenNavItem('1')
  })

  const handleMouseMove = () => {
    if(touch){
      return
    }
    clearTimeout(openTimeout)
    openTimeout = setTimeout(() => {
      setOpen(true)
    }, 0)
  }

  const handleMouseEnter = () => {
    if(touch){
      return
    }
    clearTimeout(closeTimeout)
  }

  const handleMouseLeave = () => {
    if(touch){
      return
    }
    clearTimeout(openTimeout)
    clearTimeout(closeTimeout)
    closeTimeout = setTimeout(() => {
      setOpen(false)
    }, 100)
  }

  const handleMouseMoveL2 = (itemId: any) => {
    if(touch){
      return
    }
    clearTimeout(openTimeoutL2)
    openTimeoutL2 = setTimeout(() => {
      setOpenNavItem(itemId)
    }, 0)
  }

  const handleMouseLeaveL2 = () => {
    clearTimeout(openTimeoutL2)
  }
  // const handleClickRoot = () => {
  //   router.push(hrefEnum.catalog)
  // }
  //
  // const handleClickParentElement = (slug: string, href: string) => {
  //   router.push(`${hrefEnum.catalog}/${href}`)
  //   setOpenNavItem(slug)
  // }

  return (
    <nav className={styles.nav}>
      <div className={styles.navList}>
        <div className={styles.navItem}>
          <button
            type="button"
            className={cn(styles.navLink, {[styles.navLinkActive]: open})}
            ref={triggerRef}
            onClick={() => false}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            Каталог
          </button>
        </div>
        <div className={styles.navItem}>
          <a href={hrefEnum.blog} className={styles.navLink}>
            Блог
          </a>
        </div>
        <div className={styles.navItem}>
          <a href={hrefEnum.support} className={styles.navLink}>
            Поддержка
          </a>
        </div>
      </div>

      <div
        className={cn(styles.dropdown, {[styles.dropdownOpen]: open})}
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={utils.container}>
          <div className={styles.layout}>
            <div className={styles.layoutAside}>
              {nav?.map((item: any) => (
                <button
                  key={item.id}
                  className={cn(styles.asideBtn, {
                    [styles.asideBtnActive]: openNavItem === item.id.toString(),
                  })}
                  type="button"
                  onClick={() => false}
                  onMouseMove={() => {
                    handleMouseMoveL2(item.id)
                  }}
                  onMouseLeave={() => {
                    handleMouseLeaveL2()
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className={styles.layoutMain}>
              {nav?.map((item: any) => (
                <div
                  key={item.id}
                  className={cn(styles.mainBlock, {
                    [styles.mainBlockActive]: openNavItem === item.id.toString(),
                  })}
                >
                  <div className={styles.mainHead}>
                    <div className={styles.mainTitle}>{item.title}</div>
                    <div className={styles.mainNote}>{item.items?.length || 0} категорий</div>
                  </div>
                  <div className={styles.mainBlockLayout}>
                    <div className={styles.mainBlockMain}>
                      <div className={styles.mainList}>
                        {item?.items?.map((subItem: any) => {
                          return (
                            <a
                              key={subItem.id}
                              className={styles.mainLink}
                              href={`${hrefEnum.catalog}/${subItem.fullPath}`}
                              onClick={() => {
                                setOpen(false)
                              }}
                            >
                              {subItem.title}
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.mainBlockAside}>
              {nav?.length > 0 && <a
                key={nav[0]?.banners[0]?.id || ''}
                href={nav[0]?.banners[0]?.href || ''}
                className={styles.banner}
                target={nav[0]?.banners[0]?.target || '_blank'}
              >
                <div className={styles.bannerTitle}>{nav[0]?.banners[0]?.title}</div>
                {nav[0]?.banners[0]?.image && (
                  <img
                    className={styles.bannerImage}
                    src={nav[0]?.banners[0]?.image}
                    alt=""
                    width={385}
                    height={200}
                    loading="lazy"
                  />
                )}
              </a>}
              {/*{true && (*/}
              {/*  <div className={styles.note}>*/}
              {/*    <Icon className={styles.noteIcon} icon="note" />*/}
              {/*    <div className={styles.noteBody}>*/}
              {/*      /!*{item.note}*!/Пройди бесплатный курс по инфографике и узнай простые методики создания карточек товара. Удобный шаблон технического задания в подарок.*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
