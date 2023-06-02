import cn from 'classnames'
import {FC, useEffect, useMemo, useRef, useState} from 'react'
import utils from '../../styles/utils.module.scss'

import styles from './TopNavLarge.module.scss'
import React from 'react'
import {useOnClickOutside, useOnEscape} from "../../utils/hook";
import {Button} from '../Button/Button'
import {hrefEnum} from '../../mock'
import tgImage from '../../assets/images/header/telegram-bot-icon.png'
import tracker from '../../assets/images/header/tracker.png'

import mainService1 from '../../assets/images/header/main-services-1-icon.png'
import mainService2 from '../../assets/images/header/main-services-2-icon.png'
import '../../styles/breakpoints.scss'
import { ITopNavCatalog } from '../Header/Header'
import { layoutApi } from '../../api'
import {BOT_URL} from "../../utils/constant";
const mainServices = [
    {
        image: mainService1,
        title: 'Мониторинг позиций',
        subtitle: 'Сравнение позиций по ПВЗ + расширенный отчет',
        link: '/',
        isDraft: false,
    },
    {
        image: mainService2,
        title: 'Поиск и подбор ключевых слов',
        subtitle: 'Для SEO-оптимизации карточек товаров',
        link: '',
        isDraft: true,
    },
]

const telegramBots = [
    {
        name: 'Мониторинг позиций по ПВЗ',
        link: BOT_URL,
    },
    /*{
        name: 'СПП калькулятор',
        link: '',
        isDraft: true,
    },
    {
        name: 'Шпион за чужими артикулами',
        link: '',
    },*/
]

const mainHubs = [
    {
        image: mainService1,
        title: 'Фулфилмент',
        subtitle: 'Расширенный с сравнением позиций по ПВЗ',
        link: '',
        isDraft: false,
    },
    {
        image: mainService1,
        title: 'Финансы',
        subtitle: 'Расширенный поиск ключевых слов',
        link: '',
        isDraft: false,
    },
    {
        image: mainService1,
        title: 'Дизайнеры',
        subtitle: 'Расширенный поиск ключевых слов',
        link: '',
        isDraft: false,
    },
    {
        image: mainService1,
        title: 'Менеджеры маркетплейсов',
        subtitle: 'Расширенный с сравнением позиций по ПВЗ',
        link: '',
        isDraft: true,
    },
    {
        image: mainService1,
        title: 'SEO-Хаб',
        subtitle: 'Расширенный поиск ключевых слов',
        link: '',
        isDraft: false,
    },
]

const mainCatalog = [
    {
        id: '1',
        name: 'Специалисты',
        link: '',
        services: [
            {
                image: mainService1,
                title: 'Дизайнеры карточек товара',
                subtitle: 'Закажите карточки товаров с высокой конверсией и узнаваемостью',
                link: '',
                isDraft: false,
            },
            {
                image: mainService1,
                title: 'Менеджеры личного кабинета',
                subtitle: 'Сотрудничайте с опытными специалистами для роста продаж и масштабирования',
                link: '',
                isDraft: false,
            },
            {
                image: mainService1,
                title: 'SEO-специалисты',
                subtitle: 'Выводите карточки в топ выдачи вместе с профессионалами',
                link: '',
                isDraft: false,
            },
        ],
        otherServices: [
            {
                name: 'Фотографы товаров',
                link: '',
            },
            {
                name: 'Организаторы фотосетов товаров под ключ',
                link: '',
            },
            {
                name: 'Дизайнеры упаковки',
                link: '',
            },
            {
                name: 'Таргетологи для маркетплейсов',
                link: '',
            },
            {
                name: 'Фотомодели для товаров',
                link: '',
            },
            {
                name: 'Специалисты видео продакшна товаров',
                link: '',
            },
        ]
    },
    {
        id: '2',
        name: 'Услуги',
        link: '',
        services: [
            {
                image: mainService1,
                title: 'Фулфилменты',
                subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
                link: '',
                isDraft: false,
            },
            {
                image: mainService1,
                title: 'Финансовые организации',
                subtitle: 'Сделают ваши карточку товара узнаваемой и более конверсионной',
                link: '',
                isDraft: true,
            },
        ]
    },
    {
        id: '3',
        name: 'Товары',
        link: '',
        services: [
            {
                image: mainService1,
                title: 'Фулфилменты',
                subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
                link: '',
                isDraft: false,
            },
        ]
    },
    {
        id: '4',
        name: 'Инструменты',
        link: '',
        services: [
            {
                image: mainService1,
                title: 'Фулфилменты',
                subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
                link: '',
                isDraft: false,
            },
            {
                image: mainService1,
                title: 'Финансовые организации',
                subtitle: 'Сделают ваши карточку товара узнаваемой и более конверсионной',
                link: '',
                isDraft: true,
            },
        ]
    },
    {
        id: '5',
        name: 'Информация',
        link: '',
        services: [
            {
                image: mainService1,
                title: 'Фулфилменты',
                subtitle: 'Лучшие компании для партнерства с честным прайсом и рейтингом',
                link: '',
                isDraft: false,
            },
        ]
    },
]

let openTimeout: ReturnType<typeof setTimeout>
let closeTimeout: ReturnType<typeof setTimeout>
let openTimeoutL2: ReturnType<typeof setTimeout>

interface ITopNavLarge {
    nav: ITopNavCatalog[]
}
export const TopNavLarge = (props: ITopNavLarge) => {
    const { nav } = props
    const [open, setOpen] = useState<string | boolean>(false)
    const [touch, setTouch] = useState(false)

    const dropdownRef = useRef(null)
    const triggerRef = useRef(null)

    useEffect(() => {
        if (open) {
            document.body.classList.add('state--top-nav-open')
        } else {
            document.body.classList.remove('state--top-nav-open')
        }
    }, [open])

    useEffect(() => {
        setTouch(!(window && window.matchMedia('(any-hover: hover)').matches))
    }, [])

    const handleMouseMove = (navItem: string | boolean) => {
        if (touch) {
            return
        }
        clearTimeout(openTimeout)
        openTimeout = setTimeout(() => {
            setOpen(navItem)
        }, 0)
    }

    const handleMouseEnter = () => {
        if (touch) {
            return
        }
        clearTimeout(closeTimeout)
    }

    const handleMouseLeave = () => {
        if (touch) {
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
        window.location.href = hrefEnum.catalog
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navList}>
                <div className={styles.navItem}>
                    <button
                        type='button'
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
                {/*<div className={styles.navItem}>
                    <button
                        type='button'
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
                </div>*/}
                <div className={styles.navItem}>
                    <button
                        type='button'
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
                    <a href={layoutApi.createLink('/blog')} className={styles.navLink}>
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
                        {open === '1' && <ServicesDropdown />}
                        {open === '2' && <HubsDropdown />}
                        {open === '3' && <CatalogDropdown touch={touch} nav={nav} />}
                    </div>
                </div>
            </div>
        </nav>
    )
}

interface IServicesDropdownProps {}

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
                                        className={styles.layoutAsideServices_item_image}
                                        src={item?.image}
                                        width={32}
                                        height={32}
                                        alt=''
                                    />
                                ) : (
                                    <div className={styles.layoutAsideServices_item_emptyImgBlock} />
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
                            <Button className={styles.layoutAsideServices_item_arrow} icon='arrowRight' />
                        </a>
                    ))}
                </div>
            </div>
            <div className={styles.layoutMainServices}>
                <div className={styles.layoutMainServices_titleWrapper}>
                    <div className={styles.layoutMainServices_title}>Телеграм-боты</div>
                    <img
                        className={styles.layoutMainServices_telegramBotIcon}
                        src={tgImage}
                        width={16}
                        height={16}
                        alt=''
                    />
                </div>
                <div className={styles.layoutMainServices_itemsWrapper}>
                    {telegramBots?.map((item) => (
                        <a key={item?.name} target='_blank' className={styles.layoutMainServices_item} href={item?.link} rel="noreferrer">{item?.name}</a>
                    ))}
                </div>
            </div>
            <div className={styles.mainBlockAsideServices}>
                <div className={styles.mainBlockAsideServices_banner}>
                    <div className={styles.mainBlockAsideServices_banner_title}>
                        Мониторинг позиций
                        <br />
                        <span className={styles.text_blue}>бесплатно</span> 1 месяц
                    </div>
                    <img
                        className={styles.mainBlockAsideServices_banner_image}
                        src={tracker}
                        width={309}
                        height={140}
                        alt=''
                    />
                    <Button primary>Попробовать сейчас</Button>
                </div>
            </div>
        </>
    )
}

interface IHubsDropdownProps {}

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
                                        className={styles.layoutAsideHubs_item_image}
                                        src={item?.image}
                                        width={32}
                                        height={32}
                                        alt=''
                                    />
                                ) : (
                                    <div className={styles.layoutAsideHubs_item_emptyImgBlock} />
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
                            <Button className={styles.layoutAsideHubs_item_arrow} icon='arrowRight' />
                        </a>
                    ))}
                </div>
            </div>
            <div className={styles.mainBlockAsideHubs}>
                <div className={styles.mainBlockAsideHubs_banner}>
                    <div className={styles.mainBlockAsideHubs_banner_title}>
                        Мониторинг позиций
                        <br />
                        <span className={styles.text_blue}>бесплатно</span> 1 месяц
                    </div>
                    <img
                        className={styles.mainBlockAsideHubs_banner_image}
                        src={tracker}
                        width={309}
                        height={140}
                        alt=''
                    />
                    <Button primary>Попробовать сейчас</Button>
                </div>
            </div>
        </>
    )
}

interface ICatalogDropdownProps {
    touch: boolean
    nav: ITopNavCatalog[]
}

const CatalogDropdown: FC<ICatalogDropdownProps> = ({ touch, nav }) => {
    const [openNavItem, setOpenNavItem] = useState<number | null | string>(1)

    const handleMouseMoveL2 = (itemId: any) => {
        if (touch) {
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
        window.location.href = hrefEnum.catalog
    }

    const handleClickParentElement = (slug: string, href: string) => {
        window.location.href = href
        setOpenNavItem(slug)
    }

    const mainServices = useMemo(() => nav?.filter((item) => openNavItem === item.id)?.[0]?.['services']?.filter(item => item.isPrimary), [openNavItem, nav])
    const otherServices = useMemo(() => nav?.filter((item) => openNavItem === item.id)?.[0]?.['services']?.filter(item => !item.isPrimary), [openNavItem, nav])
    const activeService = useMemo(() => nav?.filter((item) => openNavItem === item.id)?.[0], [openNavItem])

    return (
        <>
            <div className={styles.layoutAsideCatalog}>
                {nav?.map((item) => (
                    <button
                        type='button'
                        key={item.name}
                        className={cn(styles.layoutAsideCatalog_item, {
                            [styles.layoutAsideCatalog_itemActive]: openNavItem === item.id,
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
                <div className={styles.layoutMainCatalog_title}>{activeService?.name}</div>
                <div className={styles.layoutMainCatalog_itemsWrapper}>
                    {mainServices?.map((item) => (
                        <a key={item?.title} className={styles.layoutMainCatalog_item} href={item?.link}>
                            <div className={styles.layoutMainCatalog_itemMain}>
                                {item?.image ? (
                                    <img
                                        className={styles.layoutMainCatalog_item_image}
                                        src={item?.image}
                                        width={32}
                                        height={32}
                                        alt=''
                                    />
                                ) : (
                                    <div className={styles.layoutMainCatalog_item_emptyImgBlock} />
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
                            <Button className={styles.layoutMainCatalog_item_arrow} icon='arrowRight' />
                        </a>
                    ))}
                </div>
            </div>
            <div className={styles.mainBlockAsideCatalog}>
                {otherServices && otherServices.length > 0 && (
                    <>
                        <div className={styles.mainBlockAsideCatalog_title}>Остальное в разделе</div>
                        <div className={styles.mainBlockAsideCatalog_itemsWrapper}>
                            {otherServices?.map((item) => (
                                <a key={item?.title} href={item?.link} style={{textDecoration: 'none'}} className={styles.mainBlockAsideCatalog_item}>{item?.title}</a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
