import cn from 'classnames'
import React, {FC, useEffect, useRef, useState} from 'react'
import utils from '@static/css/utils.module.scss'
import styles from './TopNavLarge.module.scss'
import {useOnClickOutside} from '@utils/hooks/useOnClickOutside'
import {Button} from '../../../../Common/Button/Button'
import {mainCatalog, mainHubs, mainServices, telegramBots} from '@mocks/index'
import {useOnEscape} from "@utils/hooks/useOnEscape";

let openTimeout: ReturnType<typeof setTimeout>
let closeTimeout: ReturnType<typeof setTimeout>
let openTimeoutL2: ReturnType<typeof setTimeout>

export const TopNavLarge = () => {
  // const router = useRouter()
  const [open, setOpen] = useState<string | boolean>('3')
  const [touch, setTouch] = useState(false)

  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if(open){
      document.body.classList.add('state--top-nav-open')
    } else{
      document.body.classList.remove('state--top-nav-open')
    }
  }, [open])

  useEffect(() => {
    setTouch(!(window && window.matchMedia('(any-hover: hover)').matches))
  }, [])

  const handleMouseMove = (navItem: string | boolean) => {
    if(touch){
      return
    }
    clearTimeout(openTimeout)
    openTimeout = setTimeout(() => {
      setOpen(navItem)
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

  useOnEscape(() => {
    setOpen(false)
  })

  useOnClickOutside([dropdownRef, triggerRef], () => {
    setOpen(false)
  })

  const handleClickRoot = () => {
    // router.push(hrefEnum.catalog)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navList}>
        <div className={styles.navItem}>
          <button
            type="button"
            className={cn(styles.navItemBtn, {
              [styles.navItemBtn_open]: open === '1'
            })}
            ref={triggerRef}
            // classNameIcon={cn(styles.navItemBtn_icon, {
            //   [styles.navItemBtn_iconOpen]: open
            // })}
            // onClick={() => setOpenServices(!openServices)}
            // icon='singleArrowTopBlue'
            onClick={handleClickRoot}
            onMouseEnter={handleMouseEnter}
            onMouseMove={() => handleMouseMove('1')}
            onMouseLeave={handleMouseLeave}
          >
            Сервисы
          </button>
        </div>
        <div className={styles.navItem}>
          <button
            type="button"
            className={cn(styles.navItemBtn, {
              [styles.navItemBtn_open]: open === '2'
            })}
            // classNameIcon={cn(styles.navItemBtn_icon, {
            //   [styles.navItemBtn_iconOpen]: openHubs
            // })}
            // onClick={() => setOpenHubs(!openHubs)}
            // icon='singleArrowTopBlue'
            onClick={handleClickRoot}
            onMouseEnter={handleMouseEnter}
            onMouseMove={() => handleMouseMove('2')}
            onMouseLeave={handleMouseLeave}
          >
            Хабы
          </button>
        </div>
        <div className={styles.navItem}>
          <button
            type="button"
            className={cn(styles.navItemBtn, {
              [styles.navItemBtn_open]: open === '3'
            })}
            // classNameIcon={cn(styles.navItemBtn_icon, {
            //   [styles.navItemBtn_iconOpen]: openCatalog
            // })}
            // onClick={() => setOpenCatalog(!openCatalog)}
            // icon='singleArrowTopBlue'
            onClick={handleClickRoot}
            onMouseEnter={handleMouseEnter}
            onMouseMove={() => handleMouseMove('3')}
            onMouseLeave={handleMouseLeave}
          >
            Каталог
          </button>
        </div>
        <div className={styles.navItemBtn}>
          <a href="" className={styles.navLink}>
            Блог
          </a>
        </div>
      </div>
      <div
        className={cn(styles.dropdown, {
          [styles.dropdownOpen]: open
        })}
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={() => handleMouseMove(open)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={utils.container}>
          <div className={styles.layout}>
            {open === '1' && <ServicesDropdown/>}
            {open === '2' && <HubsDropdown/>}
            {open === '3' && <CatalogDropdown touch={touch}/>}
          </div>
        </div>
      </div>
    </nav>
  )
}

interface IServicesDropdownProps{
}

const ServicesDropdown: FC<IServicesDropdownProps> = () => {
  return (
    <>
      <div className={styles.layoutAsideServices}>
        <div className={styles.layoutAsideServices_title}>Основные сервисы</div>
        <div className={styles.layoutAsideServices_itemsWrapper}>
          {mainServices?.map((item) => (
            <a key={item?.title} className={styles.layoutAsideServices_item} href={item?.link}>
              <div className={styles.layoutAsideServices_itemMain}>
                {item?.image ? (
                  <img
                    src={item.image}
                    className={styles.layoutAsideServices_item_image}
                    alt=""
                  />
                ) : (
                  <div className={styles.layoutAsideServices_item_emptyImgBlock}/>
                )}
                <div className={styles.layoutAsideServices_item_textWrapper}>
                  <div className={cn(styles.layoutAsideServices_item_textTitle, {
                    [styles.layoutAsideServices_item_textTitleDraft]: item?.isDraft
                  })}>{item?.title || ''}</div>
                  <div className={cn(styles.layoutAsideServices_item_textSubtitle, {
                    [styles.layoutAsideServices_item_textSubtitleDraft]: item?.isDraft
                  })}>{item?.subtitle || ''}</div>
                </div>
                {item?.isDraft && (
                  <div className={styles.layoutAsideServices_item_draft}>В разработке</div>
                )}
              </div>
              <Button className={styles.layoutAsideServices_item_arrow} icon="arrowRight"/>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.layoutMainServices}>
        <div className={styles.layoutMainServices_titleWrapper}>
          <div className={styles.layoutMainServices_title}>Телеграм-боты</div>
          {/*<img*/}
          {/*  src={telegramIcon}*/}
          {/*  className={styles.layoutMainServices_telegramBotIcon}*/}
          {/*  alt=""*/}
          {/*/>*/}
        </div>
        <div className={styles.layoutMainServices_itemsWrapper}>
          {telegramBots?.map((item) => (
            <a key={item?.name} className={styles.layoutMainServices_item} href={item?.link}>{item?.name}</a>
          ))}
        </div>
      </div>
      <div className={styles.mainBlockAsideServices}>
        <div className={styles.mainBlockAsideServices_banner}>
          <div className={styles.mainBlockAsideServices_banner_title}>
            Мониторинг позиций
            <br/>
            <span className={styles.text_blue}>бесплатно</span> 1 месяц
          </div>
          <img
            src='/images/header/tracker.png'
            className={styles.mainBlockAsideServices_banner_image}
            alt=""
          />
          <Button primary>Попробовать сейчас</Button>
        </div>
      </div>
    </>
  )
}

interface IHubsDropdownProps{
}

const HubsDropdown: FC<IHubsDropdownProps> = () => {
  return (
    <>
      <div className={styles.layoutAsideHubs}>
        <div className={styles.layoutAsideHubs_title}>Хабы</div>
        <div className={styles.layoutAsideHubs_itemsWrapper}>
          {mainHubs?.map((item) => (
            <a key={item?.title} className={styles.layoutAsideHubs_item} href={item?.link}>
              <div className={styles.layoutAsideHubs_itemMain}>
                {item?.image ? (
                  <img
                    src={item?.image}
                    className={styles.layoutAsideHubs_item_image}
                    alt=""
                  />
                ) : (
                  <div className={styles.layoutAsideHubs_item_emptyImgBlock}/>
                )}
                <div className={styles.layoutAsideHubs_item_textWrapper}>
                  <div className={cn(styles.layoutAsideHubs_item_textTitle, {
                    [styles.layoutAsideHubs_item_textTitleDraft]: item?.isDraft
                  })}>{item?.title || ''}</div>
                  <div className={cn(styles.layoutAsideHubs_item_textSubtitle, {
                    [styles.layoutAsideHubs_item_textSubtitleDraft]: item?.isDraft
                  })}>{item?.subtitle || ''}</div>
                </div>
                {item?.isDraft && (
                  <div className={styles.layoutAsideHubs_item_draft}>В разработке</div>
                )}
              </div>
              <Button className={styles.layoutAsideHubs_item_arrow} icon="arrowRight"/>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.mainBlockAsideHubs}>
        <div className={styles.mainBlockAsideHubs_banner}>
          <div className={styles.mainBlockAsideHubs_banner_title}>
            Мониторинг позиций
            <br/>
            <span className={styles.text_blue}>бесплатно</span> 1 месяц
          </div>
          <img
            src='/images/header/tracker.png'
            className={styles.mainBlockAsideHubs_banner_image}
            alt=""
          />
          <Button primary>Попробовать сейчас</Button>
        </div>
      </div>
    </>
  )
}

interface ICatalogDropdownProps{
  touch: boolean
}

const CatalogDropdown: FC<ICatalogDropdownProps> = ({touch}) => {
  // const router = useRouter()
  const [openNavItem, setOpenNavItem] = useState<number | null | string>('1')

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

  const handleClickRoot = () => {
    // router.push(hrefEnum.catalog)
  }

  const handleClickParentElement = (slug: string, href: string) => {
    // router.push(`${hrefEnum.catalog}/${href}`)
    setOpenNavItem(slug)
  }

  return (
    <>
      <div className={styles.layoutAsideCatalog}>
        {mainCatalog?.map((item: any) => (
          <button
            type="button"
            key={item.name}
            className={cn(styles.layoutAsideCatalog_item, {
              [styles.layoutAsideCatalog_itemActive]: openNavItem === item.id.toString(),
            })}
            onClick={() => {
              handleClickParentElement(item.id.toString(), item.link || '')
            }}
            onMouseMove={() => {
              handleMouseMoveL2(item.id)
            }}
            onMouseLeave={() => {
              handleMouseLeaveL2()
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.layoutMainCatalog}>
        <div className={styles.layoutMainCatalog_title}>Специалисты</div>
        <div className={styles.layoutMainCatalog_itemsWrapper}>
          {mainCatalog?.filter((item: any) => openNavItem === item.id.toString())?.[0]?.['services']?.map((item) => (
            <a key={item?.title} className={styles.layoutMainCatalog_item} href={item?.link}>
              <div className={styles.layoutMainCatalog_itemMain}>
                {item?.image ? (
                  <img
                    src={item?.image}
                    className={styles.layoutMainCatalog_item_image}
                    alt=""
                  />
                ) : (
                  <div className={styles.layoutMainCatalog_item_emptyImgBlock}/>
                )}
                <div className={styles.layoutMainCatalog_item_textWrapper}>
                  <div className={cn(styles.layoutMainCatalog_item_textTitle, {
                    [styles.layoutMainCatalog_item_textTitleDraft]: item?.isDraft
                  })}>{item?.title || ''}</div>
                  <div className={cn(styles.layoutMainCatalog_item_textSubtitle, {
                    [styles.layoutMainCatalog_item_textSubtitleDraft]: item?.isDraft
                  })}>{item?.subtitle || ''}</div>
                </div>
                {item?.isDraft && (
                  <div className={styles.layoutMainCatalog_item_draft}>В разработке</div>
                )}
              </div>
              <Button className={styles.layoutMainCatalog_item_arrow} icon="arrowRight"/>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.mainBlockAsideCatalog}>
        <div className={styles.mainBlockAsideCatalog_title}>Остальное в разделе</div>
        <div className={styles.mainBlockAsideCatalog_itemsWrapper}>
          {mainCatalog?.filter((item: any) => item?.name === 'Специалисты')?.[0]?.['otherServices']?.map((item: any) => (
            <a key={item?.name} href={item?.link} className={styles.mainBlockAsideCatalog_item}>{item?.name}</a>
          ))}
        </div>
      </div>
    </>
  )
}
