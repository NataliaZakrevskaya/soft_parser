import React, {useContext} from 'react'
import {Button} from '../../Button/Button'
import styles from './DefaultCity.module.scss'
import {userApi} from '@api/user/user-api'
import {ChosenCityContext, UserContext} from "../../../../App";
import {ChosenCityContextType, UserContextType} from "../../../../types";

interface ModalPropsType{
  closeModal: () => void
}

const DefaultCity = ({closeModal}: ModalPropsType) => {

  const {chooseCity} = useContext(ChosenCityContext) as ChosenCityContextType
  const {addUser} = useContext(UserContext) as UserContextType
  const setDefault = async () => {
    await userApi.setDefaultCitySettings()
    await userApi.fetchUser().then(res => {
      addUser(res.data)
      const data = res.data.towns.find(town => town.city_id === "6478fd9630e79c580489ba43")
      if(data){
        chooseCity(data)
      } else {
        if(res.data?.towns?.length > 0)
          chooseCity(res.data.towns[0])
      }
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