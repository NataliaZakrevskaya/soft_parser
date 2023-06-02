import React, {useContext} from 'react'
import {Button} from '../../Button/Button'
import styles from './DefaultCity.module.scss'
import {userApi} from '@api/user/user-api'
import {UserContext} from "../../../../App";
import {UserContextType} from "../../../../types";

interface ModalPropsType{
  closeModal: () => void
}

const DefaultCity = ({closeModal}: ModalPropsType) => {
  const {addUser} = useContext(UserContext) as UserContextType
  const setDefault = async () => {
    await userApi.setDefaultCitySettings()
    await userApi.fetchUser().then(res => {
      addUser(res.data)
    })
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