import React, {ChangeEvent, useContext, useEffect, useMemo, useState} from 'react'
import styles from './EditCityList.module.scss'
import {Button} from '../../Button/Button'
import {nanoid} from "nanoid";
import {geoApi} from "@api/geo/geo-api";
import {ResponseCity} from "@api/geo/types";
import {userApi} from "@api/user/user-api";
import {Town, UpdateTownBody} from "@api/user/types";
import {ChosenCityContext, UserContext} from "../../../../App";
import {ModalPropsType} from './types'
import {ChosenCityContextType, UserContextType} from "../../../../types";

const EditCityList = ({closeModal, openDefaultCityModal}: ModalPropsType) => {

  const {chooseCity} = useContext(ChosenCityContext) as ChosenCityContextType
  const {user, addUser} = useContext(UserContext) as UserContextType
  const [activeCityResult, setActiveCityResult] = useState<UpdateTownBody[]>([])
  const [searchCity, setSearchCity] = useState<string>('')
  const [cities, setCities] = useState<ResponseCity[]>([])
  const [disabledSaveBtn, setDisabledSaveBtn] = useState<boolean>(true)

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchCity(e.target.value.trimStart())
  const addCity = (city: ResponseCity) => {
    const changedCity: UpdateTownBody  = {
      city: city.city,
      addresses: city.addresses
        .filter((address, index) => index < 3)
        .map(address => address.address)
    }
    setActiveCityResult([changedCity, ...activeCityResult])
  }
  const onDefaultClick = () => {
    closeModal()
    openDefaultCityModal()
  }
  const onLeftMoveClick = (city: UpdateTownBody) => {
    setActiveCityResult(activeCityResult.filter((activeCity: UpdateTownBody) => activeCity.city !== city.city))
  }
  const updateUser = async(data: any) => {
    await userApi.updateUser(data)
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
  }
  const onSaveClick = () => {
    // const data: UpdateTownBody[] = activeCityResult.map((city: Town) => {
    //   return ({
    //     city: city.city,
    //     addresses: city.addresses.map(address => address.address)
    //   })
    // })
    let changes = {
      towns: activeCityResult
    }
    updateUser(changes)
    closeModal()
  }

  useEffect(() => {
    geoApi.fetchCities().then(res => {
      setCities(res.data.towns)
    })
    const data: UpdateTownBody[]  = user.towns
      .map((town: Town) => {
        return ({
          city: town.city,
          addresses: town.addresses
            .map(address => address.address)
        })
      })
    setActiveCityResult(data)
  }, [])
  useEffect(() => {
    if(activeCityResult.length){
      setDisabledSaveBtn(false)
    } else{
      setDisabledSaveBtn(true)
    }
  }, [activeCityResult])

  const filteredCities = useMemo(() => {
    return cities
      .filter((city: ResponseCity) => city.city
        .toLowerCase()
        .includes(searchCity.toLowerCase()))
      .filter((city: ResponseCity) => !activeCityResult
        .find((cityResult: UpdateTownBody) => cityResult.city === city.city))
  }, [cities, searchCity, activeCityResult])

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
                {filteredCities.map((city: ResponseCity) => {
                  return (
                    <>
                      <li
                        key={`${city._id}${nanoid()}`}
                        className={styles.cityItem}
                      >
                        <p className={styles.itemText}>{city.city}</p>
                        <div
                          className={styles.moveRightIcon}
                          onClick={() => addCity(city)}
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
                {activeCityResult.map((city: UpdateTownBody) => {
                  return (
                    <>
                      <li
                        key={nanoid()}
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
            onClick={onSaveClick}
          />
        </div>
      </div>
    </div>
  )
}

export default EditCityList