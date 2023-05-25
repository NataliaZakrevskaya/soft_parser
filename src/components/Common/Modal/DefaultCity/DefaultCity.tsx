import React from 'react'
import {Button} from '../../Button/Button'
import styles from './DefaultCity.module.scss'
import {userApi} from '../../../../api/user/user-api'

interface ModalPropsType{
  closeModal: () => void
}

const DefaultCity = ({closeModal}: ModalPropsType) => {
  const setDefault = async () => {
    userApi.setDefaultSettings('test@mail.ru')
    closeModal()
  }
  return (
    <div className={styles.modalContent}>
      <p className={styles.text}>Вы уверены, что хотите вернуть список городов, который был установлен по умолчанию? Вы
        не сможете потом отменить
        это действие</p>
      <div className={styles.buttonsWrapper}>
        <Button
          text="Восстановить"
          primary
        onClick={setDefault}
        />
        <Button
          text="Отмена"
          onClick={closeModal}
          alternative
        />
      </div>
    </div>
  )
}

export default DefaultCity