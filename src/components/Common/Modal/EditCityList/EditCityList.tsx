import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './EditCityList.module.scss'
import {Button} from '../../Button/Button'
import {nanoid} from "nanoid";
import {geoIpi} from "../../../../api/geo/geo-api";
import {ResponseCity} from "../../../../api/geo/types";

interface ModalPropsType{
  closeModal: () => void
  openDefaultCityModal: () => void
}

const EditCityList = ({closeModal, openDefaultCityModal}: ModalPropsType) => {

  const [activeCityResult, setActiveCityResult] = useState<ResponseCity[]>([])
  const [searchCity, setSearchCity] = useState<string>('')
  const [cities, setCities] = useState<ResponseCity[]>([])
  const [shownCities, setShownCities] = useState<ResponseCity[]>([])
  const [disabledSaveBtn, setDisabledSaveBtn] = useState<boolean>(true)

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }
  const chooseCity = (city: ResponseCity) => {
    setActiveCityResult([city, ...activeCityResult])
    const shownCityWithoutChosen = shownCities.filter((mappedCity: ResponseCity) => mappedCity._id !== city._id)
    setShownCities(shownCityWithoutChosen)
  }
  const onDefaultClick = () => {
    closeModal()
    openDefaultCityModal()
  }
  const onLeftMoveClick = (city: ResponseCity) => {
    setActiveCityResult(activeCityResult.filter((activeCity: ResponseCity) => activeCity._id !== city._id))
    setShownCities([...shownCities, city])
  }

  useEffect(() => {
    geoIpi.fetchCities().then(res => {
      setCities(res.data)
      setShownCities(res.data)
    })
  }, [])
  useEffect(() => {
    const res = cities.filter((city: ResponseCity) => city.city.toLowerCase().includes(searchCity.toLowerCase())).filter(obj1 => !activeCityResult.some(obj2 => obj1._id === obj2._id))
    setShownCities(res)
  }, [searchCity, activeCityResult])
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
                {shownCities.map((city: ResponseCity) => {
                  return (
                    <>
                      <li
                        key={`${city._id}${nanoid()}`}
                        className={styles.cityItem}
                      >
                        <p className={styles.itemText}>{city.city}</p>
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
                {activeCityResult.map((city: ResponseCity) => {
                  return (
                    <>
                      <li
                        key={`${city._id}${nanoid()}`}
                        className={styles.cityItemResult}
                      >
                        <div
                          className={styles.moveLeftIcon}
                          onClick={() => onLeftMoveClick(city)}
                        />
                        <p className={styles.itemText}>{city.city}</p>
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