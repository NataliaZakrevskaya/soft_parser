import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './EditCityList.module.scss'
import {ICity, IJustCity, justCities} from '../../../../utils/mocks'
import {Button} from '../../Button/Button'

interface ModalPropsType{
  closeModal: () => void
  openDefaultCityModal: () => void
}

const EditCityList = ({closeModal, openDefaultCityModal}: ModalPropsType) => {

  const [activeCityResult, setActiveCityResult] = useState<IJustCity[]>([])
  const [searchCity, setSearchCity] = useState<string>('')
  const [cities, setCities] = useState<IJustCity[]>(justCities)
  const [disabledSaveBtn, setDisabledSaveBtn] = useState<boolean>(true)

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }
  const chooseCity = (city: IJustCity) => {
    setActiveCityResult([city, ...activeCityResult])
  }
  const onDefaultClick = () => {
    closeModal()
    openDefaultCityModal()
  }
  const onLeftMoveClick = (city: IJustCity) => {
    setActiveCityResult(activeCityResult.filter((activeCity: IJustCity) => activeCity.id !== city.id))
    setCities([...cities, city])
  }

  useEffect(() => {
    const filteredArr1 = cities.filter(obj1 => !activeCityResult.some(obj2 => obj1.id === obj2.id))
    setCities(filteredArr1)
  }, [cities, activeCityResult])
  useEffect(() => {
    const res = justCities.filter((city: IJustCity) => city.name.toLowerCase().includes(searchCity.toLowerCase()))
    setCities(res)
  }, [searchCity])
  useEffect(() => {
    if(activeCityResult.length){
      setDisabledSaveBtn(false)
    } else{
      setDisabledSaveBtn(true)
    }
  }, [activeCityResult])

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.cityBlock}>
        <div className={styles.citySearch}>
          <div className={styles.searchTitle}>Поиск города</div>
          <div className={styles.listCityWrapper}>
            <input
              type="text"
              placeholder="Введите город"
              value={searchCity}
              className={styles.searchInput}
              onChange={onSearchInputChange}
            />
            <div className={styles.scroll}>
              <ul className={styles.searchCityList}>
                {cities.map((city: IJustCity) => {
                  return (
                    <>
                      <li
                        key={city.id}
                        className={styles.cityItem}
                      >
                        <p className={styles.itemText}>{city.name}</p>
                        <div
                          className={styles.moveRightIcon}
                          onClick={() => chooseCity(city)}
                        />
                      </li>
                      <div className={styles.separator}/>
                    </>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.cityResult}>
          <div className={styles.resultTitle}>Мои города</div>
          <div className={styles.scrollResult}>
            {activeCityResult.length ? (
              <ul className={styles.searchCityResultList}>
                {activeCityResult.map(city => {
                  return (
                    <>
                      <li
                        key={city.id}
                        className={styles.cityItemResult}
                      >
                        <div
                          className={styles.moveLeftIcon}
                          onClick={() => onLeftMoveClick(city)}
                        />
                        <p className={styles.itemText}>{city.name}</p>
                      </li>

                      <div className={styles.separator}/>
                    </>
                  )
                })}
              </ul>
            ) : (
              <p className={styles.countNotify}>Чтобы продолжить, необходимо выбрать хотя бы один город</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.controlsWrapper}>
        <Button
          text="Восстановить по умолчанию"
          alternative
          onClick={onDefaultClick}
        />
        <div className={styles.buttonsWrapper}>
          <Button
            text="Отмена"
            onClick={closeModal}
            alternative/>
          <Button
            text="Сохранить"
            primary
            disabled={disabledSaveBtn}
          />
        </div>
      </div>
    </div>
  )
}

export default EditCityList