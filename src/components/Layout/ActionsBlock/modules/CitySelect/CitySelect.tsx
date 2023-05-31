import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from './CitySelect.module.scss'
import cn from 'classnames'
import {useOnClickOutside} from '@utils/hooks/useOnClickOutside'
import utils from '../../../../../static/css/utils.module.scss'
import {Town} from '@api/user/types'
import {ChosenCityContext, UserContext} from "../../../../../App";
import {ChosenCityContextType, UserContextType} from "../../../../../types";

const CitySelect = () => {

  const {user} = useContext(UserContext) as UserContextType

  const {chosenCity, chooseCity} = useContext(ChosenCityContext) as ChosenCityContextType
  const [cities, setCities] = useState<Town[]>([])
  const [openCitySelect, setOpenCitySelect] = useState<boolean>(false)

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    setOpenCitySelect(false)
  })
  const onCityOptionClick = (city: Town) => {
    chooseCity(city)
    setOpenCitySelect(false)
  }

  useEffect(() => {
    setCities(user.towns)
  }, [user.towns])

  return (
    <div className={styles.cityWrapper} ref={parentEl}>
      <div
        className={cn(styles.citySelect, {
          [styles.citySelect_chosen]: chosenCity._id !== '',
          [styles.citySelect_open]: openCitySelect
        })}
        onClick={() => setOpenCitySelect(!openCitySelect)}
      >
        <p className={utils.textEllipsis1}>
          {chosenCity._id !== '' ? chosenCity.city : 'Выберите город'}
        </p>
      </div>
      {openCitySelect && (
        <div className={styles.scroll}>
          <ul className={styles.cityList}>
            {cities.map((city: Town) =>
              <div
                key={city._id}
                className={cn(styles.cityItem, {
                  [styles.cityItem_active]: chosenCity._id === city._id
                })}
                onClick={() => onCityOptionClick(city)}
              >
                <div className={styles.cityInfo}>
                  <p className={styles.cityName}>{city.city}</p>
                  <p className={styles.pvzCount}>{city.pwz.length} ПВЗ</p>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={chosenCity._id === city._id}
                    value={city.city}
                    className={styles.input}
                  />
                  <div className={cn(styles.customRadio, {
                    [styles.customRadio_active]: chosenCity._id === city._id
                  })}/>
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CitySelect