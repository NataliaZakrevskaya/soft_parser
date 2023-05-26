import {forwardRef} from 'react'
import styles from './Button.module.scss'
import {IProps} from './types'
import cn from 'classnames'
import {Icon} from "@components/Common/Icon/Icon";

export const Button: React.FC<IProps> = forwardRef(
  (
    {
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
      ariaLabel,
      title,
      text,
      children,
      href,
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
        {(text || children) && <span>{text || children}</span>}
        {icon && <Icon className={cn(styles.icon, classNameIcon)} icon={icon}/>}
      </Tag>
    )
  },
)
