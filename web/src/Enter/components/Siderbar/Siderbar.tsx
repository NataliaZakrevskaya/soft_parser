import cn from 'classnames'


import styles from './Sidebar.module.scss'
import { Icon } from '../Icon/Icon'
import { FC, useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../utils/hook'

const sidebar: IMenuOneItem[] = [
    {
        id: '1',
        icon: 'sidebar-icon-1',
        name: 'Трекер позиций',
        href: '/',
        list: []
    },
    {
        id: '2',
        icon: 'sidebar-icon-2',
        name: 'Телеграм бот',
        target: '__blank',
        list: [],
        href: 'https://t.me/seoremica_sellershub_pvz_bot'
    },
    {
        id: '3',
        icon: 'sidebar-icon-3',
        name: 'Тарифы',
        target: '__blank',
        list: [],
        href: 'https://sellershub.ru/tariff'
    },
]

let openTimeout: ReturnType<typeof setTimeout>
let closeTimeout: ReturnType<typeof setTimeout>

export const Sidebar = (props: {fullWidth?: boolean}) => {
    const [open, setOpen] = useState(false)
    const sidebarRef = useRef(null)
    const [touch, setTouch] = useState(false)

    useEffect(() => {
        setTouch(!(window && window.matchMedia('(any-hover: hover)').matches))
    }, [])

    useOnClickOutside([sidebarRef], () => {
        setOpen(false)
    })

    const handleMouseEnter = () => {
        if (touch) {
            return
        }
        clearTimeout(closeTimeout)
    }

    const handleMouseMove = () => {
        if (touch) {
            return
        }
        clearTimeout(openTimeout)
        openTimeout = setTimeout(() => {
            setOpen(true)
        }, 0)
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

    return (
        <nav className={styles.sidebarWrapper}>
            <button className={cn(styles.sidebar, {
                [styles.sidebar_open]: open,
            })}
                    ref={sidebarRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
            >
                {sidebar?.map((item) => (
                    <MenuItem key={item?.id} open={open} item={item} />
                ))}
            </button>
        </nav>
    )
}

interface IMenuOneItem {
    id: string | number,
    icon: string,
    name: string,
    href: string,
    target?: '__blank' | undefined
    list: []
}
interface IMenuItemProps {
    open: boolean
    item: IMenuOneItem
}

const MenuItem: FC<IMenuItemProps> = ({ open, item }) => {
    const { id, icon, name, list, href, target } = item
    const isItemChecked = window.location.pathname === href
    const isItemInListCheched = false
    const [itemList, setItemList] = useState([])
    const [openItemList, setOpenItemList] = useState<boolean>(false)

    useEffect(() => {
        if (list.length > 5) {
            setItemList(list.slice(0, 5))
        } else {
            setItemList(list)
        }
    }, [])

    useEffect(() => {
        if (!open) {
            setOpenItemList(false)
        }
    }, [open])

    const showMore = () => {
        setItemList(list)
    }

    const showLess = () => {
        setItemList(list.slice(0, 5))
    }

    return (
        <a href={href} target={target} style={{textDecoration: 'none'}}>
            <button className={cn(styles.sidebar_item, {
                [styles.sidebar_item_active]: isItemChecked
            })} onClick={() => setOpenItemList(!openItemList)}>
                <div className={styles.sidebar_item_iconWrapper}>
                    <Icon className={styles.sidebar_item_icon} icon={icon} />
                </div>
                <div className={styles.sidebar_item_text}>{name}</div>
                <button className={cn(styles.sidebar_item_arrowWrapper, {
                    [styles.sidebar_item_arrowWrapper_open]: openItemList
                })}>
                    {list?.length > 0 && <Icon className={styles.sidebar_item_arrow} icon={'singleArrowTop'} />}
                </button>
            </button>
            {openItemList && (itemList?.length > 0) &&
                <div className={styles.sidebar_subitems}>
                    {itemList?.map((item: any) => (
                        <div key={item?.name} className={cn(styles.sidebar_subitems_item, {
                            [styles.sidebar_subitems_item_active]: isItemInListCheched
                        })}>{item?.name}</div>
                    ))}
                    {itemList?.length <= 5 && list.length > 5 &&
                        <button className={styles.sidebar_subitems_moreBtn} onClick={showMore}>
                            Смотреть все
                        </button>
                    }
                    {itemList?.length > 5 &&
                        <button className={styles.sidebar_subitems_moreBtn} onClick={showLess}>
                            Скрыть
                        </button>
                    }
                </div>
            }
        </a>
    )
}
