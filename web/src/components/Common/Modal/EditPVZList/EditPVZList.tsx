import React, {ChangeEvent, useContext, useEffect, useMemo, useState} from 'react'
import styles from './EditPVZList.module.scss'
import cn from 'classnames'
import {Button} from '../../Button/Button'
import {ResponseAddress} from "@api/geo/types";
import {geoApi} from "@api/geo/geo-api";
import {ModalPropsType} from "./types";
import {userApi} from "@api/user/user-api";
import {Town, UpdateTownBody, UpdateUserData} from "@api/user/types";
import {UserContext} from "../../../../App";
import {UserContextType} from "../../../../types";

const EditPvzList = ({
                       closeModal,
                       openCityModal,
                       openDefaultPVZModal
}: ModalPropsType) => {

  const {user, addUser} = useContext(UserContext) as UserContextType
  const [cities, setCities] = useState<Town[]>([])
  const [activeCity, setActiveCity] = useState<Town | null>(null)
  const [activePVZList, setActivePVZList] = useState<ResponseAddress[]>([])
  const [searchPVZ, setSearchPVZ] = useState<string>('')
  const [sessionChanges, setSessionChanges] = useState<UpdateTownBody[]>([])
  const [disabledSaveBtn, setDisabledSaveBtn] = useState<boolean>(false)
  const chooseCity = (city: Town) => {
    setActiveCity(city)
    setSearchPVZ('')
  }
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchPVZ(e.target.value.trim())
  const updatePwz = async(data: UpdateUserData) => {
    await userApi.updateUser(data)
    await userApi.fetchUser().then(res => addUser(res.data))
  }
  const onSaveClick = () => {
    // const data: UpdateTownBody[] = sessionChanges.map(change => {
    //   return ({
    //     city: change.city,
    //     addresses: change.pwz.map(pwz => pwz.name)
    //   })
    // })
    let changes = {
      towns: sessionChanges
    }
    updatePwz(changes)
    closeModal()
  }
  const choosePVZ = (newPvz: ResponseAddress) => {

    setSessionChanges((prev: UpdateTownBody[]) => {
        if(!activeCity) return prev

        const existingChange = prev.find(item => item.city === activeCity?.city)
        if(!existingChange){
          return [...prev, {
            _id: activeCity?._id,
            city: activeCity?.city,
            addresses: [newPvz.address]
          }]
        } else{
          return [...prev.filter(item => item.city !== activeCity?.city), {
            _id: activeCity?._id,
            city: existingChange.city,
            addresses: [...existingChange.addresses, newPvz.address]
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
  const deletePVZ = (pvz: string) => {
    setSessionChanges((prev: UpdateTownBody[]) => {
      if(!activeCity) return prev
      const existingChange = prev.find(item => item.addresses.includes(pvz))
      if(existingChange){
        return [...prev.filter(item => !item.addresses.includes(pvz)), {
          city: existingChange.city,
          addresses: existingChange.addresses.filter(item => item !== pvz)
        }]
      } else{
        return prev
      }
    })
  }

  useEffect(() => {
    setCities(user.towns)
    const data: UpdateTownBody[] = user.towns
      .map((town: Town) => {
        return ({
          city: town.city,
          addresses: town.addresses
            .map(address => address.address)
        })
      })
    setSessionChanges(data)
  }, [user.towns])
  useEffect(
    () => {
      const fetchData = async() => {
        if(activeCity){
          geoApi.fetchAddressesByTown(activeCity.city).then(res => {
            setActivePVZList(res.data.addresses)
          })
        }
      }
      fetchData()
    }, [activeCity])
  useEffect(() => {
    const changes = !!sessionChanges.length
    const emptyPVZ = sessionChanges.some((change: UpdateTownBody) => !change.addresses.length)
    setDisabledSaveBtn(!changes || emptyPVZ)
  }, [sessionChanges])

  const filteredPvzList = useMemo(() => {
    return activePVZList
      .filter((activeItem: ResponseAddress) => activeItem.address
        .toLowerCase()
        .includes(searchPVZ.toLowerCase()))
      .filter(activeItem => !sessionChanges
        .find(sessionItem => sessionItem.city === activeCity?.city)?.addresses?.find(item => item === activeItem.address))
  }, [activePVZList, searchPVZ, sessionChanges, activeCity])
  const sessionList = useMemo(() => {
    return sessionChanges.find(item => item.city === activeCity?.city)?.addresses || []
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
              {cities.map((city: Town, index) => {
                return (
                  <li
                    key={index}
                    className={cn(styles.cityItem, {
                      [styles.cityItem_active]: activeCity?.city === city.city
                    })}
                    onClick={() => chooseCity(city)}
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
                  {filteredPvzList.map((pvz: any) => {
                    return (
                      <>
                        <li
                          key={pvz._id}
                          className={styles.pvzItem}
                        >
                          <p className={styles.itemText}>{pvz.address ? pvz.address : pvz.name!}</p>
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
                  {sessionList.map((pvz, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className={styles.pvzItemResult}
                          onClick={() => deletePVZ(pvz)}
                        >
                          <div className={styles.moveLeftIcon}/>
                          <p className={styles.itemText}>{pvz}</p>
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

export default EditPvzList