import React, {useRef, useState} from 'react'
import cn from 'classnames'
import styles from './PeriodSelect.module.scss'
import CalendarIcon from '../svg/CalendarIcon'
import {calendarOptions} from '../../../../../mocks'
import Calendar from '../../../../Calendar/Calendar'
import {useOnClickOutside} from '../../../../../utils/hooks/useOnClickOutside'

interface IPeriodProps{
  setSecondDay: (day: Date | null) => void
  setFirstDay: (day: Date) => void
}

const PeriodSelect = ({setSecondDay, setFirstDay}: IPeriodProps) => {

  const [chosenPeriod, setChosenPeriod] = useState<string>('')
  const [openPeriodSelect, setOpenPeriodSelect] = useState<boolean>(false)
  const [openPeriodCalendar, setOpenPeriodCalendar] = useState<boolean>(false)

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    setOpenPeriodSelect(false)
    setOpenPeriodCalendar(false)
  })

  const onPeriodSelectClick = () => {
    if(chosenPeriod === null){
      setOpenPeriodCalendar(false)
      setOpenPeriodSelect(false)
      setChosenPeriod('')
    } else{
      setOpenPeriodSelect(!openPeriodSelect)
    }
  }

  const onPeriodOptionClick = (option: any) => {
    if(typeof option === 'string'){
      setChosenPeriod(option)
    } else{
      if(option.date === null){
        setOpenPeriodSelect(false)
        setOpenPeriodCalendar(true)
      }
      setChosenPeriod(option.date)
      if(option.title === 'Сегодня' || option.title === 'Вчера'){
        setFirstDay(option.data)
        setSecondDay(null)
      }
      if(option.title === 'Последние 4 дня'){
        const fourDayAgo = new Date()
        fourDayAgo.setDate(fourDayAgo.getDate() - 3)
        const today = new Date()
        setFirstDay(fourDayAgo)
        setSecondDay(today)
      }
    }

    setOpenPeriodSelect(false)
  }
  return (
    <div className={styles.periodWrapper} ref={parentEl}>
      <div
        className={cn(styles.btn, styles.periodBtn, {
          [styles.periodBtnActive]: openPeriodSelect || openPeriodCalendar
        })}
        onClick={onPeriodSelectClick}
      >
        <CalendarIcon/>
        {chosenPeriod ? chosenPeriod : 'Период'}
      </div>
      {openPeriodSelect && (
        <ul className={styles.dropdownSelect}>
          {calendarOptions.map((option: any) => <li
            key={option.id}
            onClick={() => onPeriodOptionClick(option)}
            className={cn(styles.option, {
              [styles.option_active]: option.date === chosenPeriod
            })}
          >{option.title}</li>)}
        </ul>
      )}
      {openPeriodCalendar && (
        <Calendar
          chosenPeriod={chosenPeriod}
          onPeriodOptionClick={onPeriodOptionClick}
          closeCalendar={() => setOpenPeriodCalendar(false)}
          setFirstDayCommon={setFirstDay}
          setSecondDayCommon={setSecondDay}
        />
      )}
    </div>
  )
}

export default PeriodSelect