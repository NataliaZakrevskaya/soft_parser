import cn from 'classnames'

import styles from './Loading.module.scss'

interface IProps {
  active?: boolean
  whiteOverlay?: boolean
}

const Loading: React.FC<IProps> = ({ active, whiteOverlay = false }) => {
  return (
    <div className={cn(styles.overlay, {
      [styles.overlayActive]: active,
      [styles.overlay_white]: whiteOverlay,
    })}>
      <div className={styles.container}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 40 40">
          <g vectorEffect="non-scaling-stroke" fill="none" strokeWidth="2px">
            <circle cx="19" cy="19" r="18" stroke="#c7c7cc"></circle>
            <path d="M37,19c0-9.9-8.1-18-18-18" stroke="currentColor" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Loading
