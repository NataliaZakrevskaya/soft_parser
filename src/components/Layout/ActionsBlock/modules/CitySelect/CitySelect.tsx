import React, {useRef, useState} from 'react'
import styles from './CitySelect.module.scss'
import cn from 'classnames'
import {cities, ICity} from '../../../../../utils/mocks'
import {useOnClickOutside} from '../../../../../utils/hooks/useOnClickOutside'

const CitySelect = () => {

  const [chosenCity, setChosenCity] = useState<string>('')
  const [openCitySelect, setOpenCitySelect] = useState<boolean>(false)

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    setOpenCitySelect(false)
  })

  const onCityOptionClick = (city: string) => {
    setChosenCity(city)
    setOpenCitySelect(false)
  }

  return (
    <div className={styles.cityWrapper} ref={parentEl}>
      <div
        className={cn(styles.citySelect, {
          [styles.citySelect_chosen]: chosenCity !== '',
          [styles.citySelect_open]: openCitySelect
        })}
        onClick={() => setOpenCitySelect(!openCitySelect)}
      >
        {chosenCity !== '' ? chosenCity : 'Выберите города'}
      </div>
      {openCitySelect && (
        <div className={styles.scroll}>
          <ul className={styles.cityList}>
            {cities.map((city: ICity) =>
              <div
                key={city.id}
                className={cn(styles.cityItem, {
                  [styles.cityItem_active]: chosenCity === city.name
                })}
                onClick={() => onCityOptionClick(city.name)}
              >
                <div className={styles.cityInfo}>
                  <p className={styles.cityName}>{city.name}</p>
                  <p className={styles.pvzCount}>{city.pvz.length} ПВЗ</p>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={chosenCity === city.name}
                    value={city.name}
                    className={styles.input}
                  />
                  <div className={cn(styles.customRadio, {
                    [styles.customRadio_active]: chosenCity === city.name
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