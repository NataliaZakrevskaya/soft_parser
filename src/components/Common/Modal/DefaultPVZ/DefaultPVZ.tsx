import React from 'react'
import styles from '../DefaultCity/DefaultCity.module.scss'
import {Button} from '../../Button/Button'

interface ModalPropsType{
  closeModal: () => void
}

const DefaultPvz = ({closeModal}: ModalPropsType) => {
  return (
    <div className={styles.modalContent}>
      <p className={styles.text}>Вы уверены, что хотите вернуть список ПВЗ, который был установлен по умолчанию? Вы не
        сможете потом отменить
        это действие</p>
      <div className={styles.buttonsWrapper}>
        <Button text="Восстановить" primary/>
        <Button
          text="Отмена"
          onClick={closeModal}
          alternative
        />
      </div>
    </div>
  )
}

export default DefaultPvz