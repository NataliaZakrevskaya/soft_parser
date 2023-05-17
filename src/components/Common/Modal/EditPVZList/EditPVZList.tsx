import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './EditPVZList.module.scss'
import {cities, ICity, IJustCity, IPVZ} from '../../../../utils/mocks'
import cn from 'classnames'
import {Button} from '../../Button/Button'

interface ModalPropsType{
  closeModal: () => void
  openCityModal: () => void
  openDefaultPVZModal: () => void
}

const EditPvzList = ({closeModal, openCityModal, openDefaultPVZModal}: ModalPropsType) => {

  const [activeCity, setActiveCity] = useState<number>(1)
  const [activePVZList, setActivePVZList] = useState<IPVZ[]>([])
  const [activePVZResult, setActivePVZResult] = useState<IPVZ[]>([])
  const [searchPVZ, setSearchPVZ] = useState<string>('')

  const chooseCity = (id: number) => {
    setActiveCity(id)
  }
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPVZ(e.target.value)
  }
  const choosePVZ = (newPvz: IPVZ) => {
    setActivePVZResult([newPvz, ...activePVZResult])
  }
  const onEditCityClick = () => {
    closeModal()
    openCityModal()
  }
  const onDefaultClick = () => {
    closeModal()
    openDefaultPVZModal()
  }
  const onLeftMoveClick = (id: number) => {
    setActivePVZResult(activePVZResult.filter((city: IJustCity) => city.id !== id))
  }

  useEffect(() => {
    const pvzListByCity = cities.find(city => city.id === activeCity)?.pvz
    const pvzList = pvzListByCity ? pvzListByCity.filter((pvz: IPVZ) => pvz.name.toLowerCase().includes(searchPVZ.toLowerCase())) : []
    setActivePVZList(pvzList)
  }, [activeCity, searchPVZ])

  useEffect(() => {
    setActivePVZResult([])
  }, [activeCity])

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
          <ul className={styles.cityList}>
            {cities.map((city: ICity) => {
              return (
                <li
                  className={cn(styles.cityItem, {
                    [styles.cityItem_active]: activeCity === city.id
                  })}
                  onClick={() => chooseCity(city.id)}
                >
                  {city.name}
                </li>
              )
            })}
          </ul>
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
                  {activePVZList.map(pvz => {
                    return (
                      <>
                        <li
                          key={pvz.id}
                          className={styles.pvzItem}
                        >
                          <p className={styles.itemText}>{pvz.name}</p>
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
              {activePVZResult.length ? (
                <ul className={styles.searchPVZResultList}>
                  {activePVZResult.map(pvz => {
                    return (
                      <>
                        <li
                          key={pvz.id}
                          className={styles.pvzItemResult}
                          onClick={() => onLeftMoveClick(pvz.id)}
                        >
                          <div className={styles.moveLeftIcon}/>
                          <p className={styles.itemText}>{pvz.name}</p>
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
          <Button text="Сохранить" primary/>
        </div>
      </div>
    </div>
  )
}

export default EditPvzList