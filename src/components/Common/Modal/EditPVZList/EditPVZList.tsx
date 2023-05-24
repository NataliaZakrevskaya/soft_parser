import React, {ChangeEvent, useEffect, useMemo, useState} from 'react'
import styles from './EditPVZList.module.scss'
import cn from 'classnames'
import {Button} from '../../Button/Button'
import {ResponseAddress, ResponseCity} from "../../../../api/geo/types";
import {geoApi} from "../../../../api/geo/geo-api";
import {ChangeType, ModalPropsType} from "./types";

const EditPvzList = ({closeModal, openCityModal, openDefaultPVZModal}: ModalPropsType) => {

  const [cities, setCities] = useState<ResponseCity[]>([])
  const [activeCity, setActiveCity] = useState<string>('')
  const [activePVZList, setActivePVZList] = useState<ResponseAddress[]>([])
  const [searchPVZ, setSearchPVZ] = useState<string>('')
  const [sessionChanges, setSessionChanges] = useState<ChangeType[]>([])
  const [disabledSaveBtn, setDisabledSaveBtn] = useState<boolean>(false)

  const chooseCity = (cityName: string) => {
    setActiveCity(cityName)
    setSearchPVZ('')
  }
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchPVZ(e.target.value)
  const choosePVZ = (newPvz: ResponseAddress) => {
    setSessionChanges((prev: ChangeType[]) => {
        const existingChange = prev.find(item => item.city === activeCity)
        if(!existingChange){
          return [...prev, {city: activeCity, pwz: [newPvz]}]
        } else{
          return [...prev.filter(item => item.city !== activeCity), {
            city: existingChange.city,
            pwz: [...existingChange.pwz, newPvz]
          }]
        }
      }
    )
  }
  const onEditCityClick = () => {
    closeModal()
    openCityModal()
  }
  const onDefaultClick = () => {
    closeModal()
    openDefaultPVZModal()
  }
  const deletePVZ = (pvz: ResponseAddress) => {
    setSessionChanges((prev: ChangeType[]) => {
      const existingChange = prev.find(item => item.pwz.includes(pvz))
      if(existingChange){
        return [...prev.filter(item => !item.pwz.includes(pvz)), {
          city: existingChange.city,
          pwz: existingChange.pwz.filter(item => item._id !== pvz._id)
        }]
      } else{
        return prev
      }
    })
  }

  useEffect(() => {
    geoApi.fetchCities().then(res => {
      setCities(res.data.towns)
    })
  }, [])
  useEffect(() => {
    const fetchData = async() => {
      if(activeCity){
        geoApi.fetchAddressesByTown(activeCity).then(res => {
          setActivePVZList(res.data.addresses)
        })
      }
    }
    fetchData()
  }, [activeCity])
  useEffect(() => {
    const changes = !!sessionChanges.length
    const emptyPVZ = sessionChanges.some((change: ChangeType) => !change.pwz.length)
    setDisabledSaveBtn(!changes || emptyPVZ)
  }, [sessionChanges])

  const filteredPvzList = useMemo(() => {
    return activePVZList
      .filter(activeItem => activeItem.address
        .toLowerCase()
        .includes(searchPVZ.toLowerCase()))
      .filter(activeItem => !sessionChanges
        .find(sessionItem => sessionItem.city === activeCity)?.pwz?.find(item => item._id === activeItem._id))
  }, [activePVZList, searchPVZ, sessionChanges, activeCity])
  const sessionList = useMemo(() => {
    return sessionChanges.find(item => item.city === activeCity)?.pwz || []
  }, [sessionChanges, activeCity])

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.mainBlock}>
        <div className={styles.cityBlock}>
          <div
            className={styles.editCity}
            onClick={onEditCityClick}
          >
            <div className={styles.editIcon}/>
            <p className={styles.editText}>Редактировать города</p>
          </div>
          <div className={styles.scrollCity}>
            <ul className={styles.cityList}>
              {cities.map((city: ResponseCity) => {
                return (
                  <li
                    key={city._id}
                    className={cn(styles.cityItem, {
                      [styles.cityItem_active]: activeCity === city.city
                    })}
                    onClick={() => chooseCity(city.city)}
                  >
                    {city.city}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className={styles.pvzBlock}>
          <div className={styles.pvzSearch}>
            <div className={styles.searchTitle}>Поиск ПВЗ</div>
            <div className={styles.listPVZWrapper}>
              <input
                type="text"
                placeholder="Введите адрес"
                value={searchPVZ}
                className={styles.searchInput}
                onChange={onSearchInputChange}
              />
              <div className={styles.scroll}>
                <ul className={styles.searchPVZList}>
                  {filteredPvzList.map((pvz) => {
                    return (
                      <>
                        <li
                          key={pvz._id}
                          className={styles.pvzItem}
                        >
                          <p className={styles.itemText}>{pvz.address}</p>
                          <div
                            className={styles.moveRightIcon}
                            onClick={() => choosePVZ(pvz)}
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
          <div className={styles.pvzResult}>
            <div className={styles.resultTitle}>Мои ПВЗ</div>
            <div className={styles.scrollResult}>
              {sessionList.length ? (
                <ul className={styles.searchPVZResultList}>
                  {sessionList.map(pvz => {
                    return (
                      <>
                        <li
                          key={pvz._id}
                          className={styles.pvzItemResult}
                          onClick={() => deletePVZ(pvz)}
                        >
                          <div className={styles.moveLeftIcon}/>
                          <p className={styles.itemText}>{pvz.address}</p>
                        </li>
                        <div className={styles.separator}/>
                      </>
                    )
                  })}
                </ul>
              ) : (
                <p className={styles.countNotify}>Вы не выбрали ни одного ПВЗ</p>
              )}
            </div>
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
          <Button text="Сохранить" primary disabled={disabledSaveBtn}/>
        </div>
      </div>
    </div>
  )
}

export default EditPvzList