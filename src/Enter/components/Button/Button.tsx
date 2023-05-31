import cn from 'classnames'
import { CSSProperties, forwardRef, ReactNode } from 'react'
import { Oval } from 'react-loader-spinner'

import styles from './Button.module.scss'
import { Icon } from '../Icon/Icon'

interface IProps {
    alternative?: boolean
    ariaLabel?: string
    block?: boolean
    children?: ReactNode
    className?: string
    classNameIcon?: string
    danger?: boolean
    disabled?: boolean
    ghost?: boolean,
    href?: string | URL,
    icon?: string,
    iconLeft?: string,
    leftIcon?: string,
    loading?: boolean,
    onClick?: (e: React.MouseEvent<any>) => void,
    primary?: boolean,
    rel?: string,
    size?: string,
    square?: boolean,
    style?: CSSProperties,
    target?: '_blank',
    text?: string,
    title?: string,
    type?: 'button' | 'submit' | 'reset' | undefined
}

export const Button: React.FC<IProps> = forwardRef(
    (
        {
            // styling
            className,
            classNameIcon,
            style,
            size = 'm',
            primary,
            danger = false,
            alternative,
            square,
            block,
            type = 'button',
            icon,
            leftIcon,
            // accessibility
            ariaLabel,
            title,
            // value
            text,
            children,
            href,
            // state
            disabled,
            onClick,
            loading,
            target,
            rel,
            ghost,
            iconLeft
        },
        ref,
    ) => {
        const Tag = href ? 'a' : 'button'

        return (
            <Tag
                className={cn(className, styles.btn, 'button', {
                    [styles.btnPrimary]: primary,
                    [styles.btnDanger]: danger,
                    [styles.btnGhost]: ghost,
                    [styles.btnAlternative]: alternative,
                    [styles.btnDefault]: !primary && !alternative,
                    [styles.btnSquare]: square,
                    [styles.disabled]: disabled,
                    [styles.block]: block,
                    [styles.btnL]: size === 'l',
                    [styles.btnM]: size === 'm',
                    [styles.btnS]: size === 's',
                })}
                // @ts-ignore
                href={href}
                style={style}
                disabled={disabled}
                aria-label={ariaLabel}
                title={title}
                type={type}
                //ref={ref}
                onClick={onClick}
                target={target}
                rel={rel}
            >
                {leftIcon && <Icon className={cn(styles.icon, classNameIcon)} icon={leftIcon}/>}
                {(text || children) && <span>{text || children}</span>}
                {icon && <Icon className={cn(styles.icon, classNameIcon)} icon={icon}/>}
                {loading && (
                    <div className={styles.loader}>
                        <Oval
                            color={'#357efe'}
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor={'#bcd4ff'}
                            strokeWidth={5}
                            strokeWidthSecondary={5}

                        />
                    </div>
                )}
            </Tag>
        )
    },
)
