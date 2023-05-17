import {ModalPropsType} from './types'
import {ReactElement, useRef} from 'react'
import styles from './Modal.module.scss'
import {useOnClickOutside} from '../../../utils/hooks/useOnClickOutside'

const Modal = ({closeModal, children, title}: ModalPropsType): ReactElement => {

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    closeModal()
  })

  return (
    <div className={styles.callbackModals}>
      <div
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
        ref={parentEl}
      >
        <div className={styles.modalControls}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.closeIcon} onClick={closeModal}/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal