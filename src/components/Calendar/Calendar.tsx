import React, {useEffect} from 'react'
import {DataPicker} from './DataPicker/DataPicker'
import {formatDate} from '../../utils/helpers/date'
import styles from './Calendar.module.scss'
import {calendarOptions} from '../../utils/mocks'
import {IProps} from './types'
import cn from 'classnames'

const Calendar = ({
                    chosenPeriod,
                    onPeriodOptionClick,
                    closeCalendar,
                    setSecondDayCommon,
                    setFirstDayCommon
                  }: IProps) => {

  const sixDaysAgo = new Date()
  sixDaysAgo.setDate(sixDaysAgo.getDate() - 6)

  const [firstDay, setFirstDay] = React.useState<Date>(sixDaysAgo)
  const [secondDay, setSecondDay] = React.useState<Date | null>(new Date())

  const changeFirstDay = (day: Date) => {
    // setFirstDayCommon(day)
    setFirstDay(day)
  }
  const changeSecondDay = (day: Date | null) => {
    // setSecondDayCommon(day)
    setSecondDay(day)
  }
  const onCalendarOptionClick = (option: string) => {
    if(option !== null){
      closeCalendar()
    }
    onPeriodOptionClick(option)
  }
  const onCancelClick = () => {
    onPeriodOptionClick('')
    closeCalendar()
  }
  const onApplyClick = () => {
    if(secondDay){
      setFirstDayCommon(firstDay)
      setSecondDayCommon(secondDay)

      window.sessionStorage.setItem('calendarFirstDay', JSON.stringify(firstDay))
      window.sessionStorage.setItem('calendarSecondDay', JSON.stringify(secondDay))

      onPeriodOptionClick(`${formatDate(firstDay, 'MMM DD, YYYY')} - ${formatDate(secondDay, 'MMM DD, YYYY')}`)
      closeCalendar()
    } else{

      setFirstDayCommon(firstDay)

      window.sessionStorage.setItem('calendarFirstDay', JSON.stringify(firstDay))

      onPeriodOptionClick(`${formatDate(firstDay, 'MMM DD, YYYY')}`)
      closeCalendar()
    }
  }

  useEffect(() => {

    if(window.sessionStorage.getItem('calendarFirstDay')){
      const date = new Date(JSON.parse(window.sessionStorage.getItem('calendarFirstDay')!))
      setFirstDay(date)
    }
    if(window.sessionStorage.getItem('calendarSecondDay')){
      const date = new Date(JSON.parse(window.sessionStorage.getItem('calendarSecondDay')!))
      setSecondDay(date)
    }
  }, [window.sessionStorage])

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.containerOptions}>
          {calendarOptions.map((option: any) => (
            <div key={option.id}
                 className={cn(styles.optionContainer, {
                   [styles.optionContainerActive]: chosenPeriod === option.date
                 })}
                 onClick={() => onCalendarOptionClick(option.date)}>
              <p
                className={cn(styles.optionBody, {
                  [styles.optionBodyActive]: chosenPeriod === option.date
                })}>{option.title}</p>
            </div>
          ))}
        </div>
        <div className={styles.calendarWrapper}>
          <DataPicker
            firstDay={firstDay}
            secondDay={secondDay}
            changeFirstDay={changeFirstDay}
            changeSecondDay={changeSecondDay}
          />
        </div>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.dateContainer}>
          <p
            className={styles.dateItem}>{firstDay ? formatDate(firstDay, 'MMM DD, YYYY') : ''} - {secondDay ? formatDate(secondDay, 'MMM DD, YYYY') : ''}</p>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.buttonCancel}
            onClick={onCancelClick}
          >Отмена
          </button>
          <button
            className={styles.buttonApply}
            onClick={onApplyClick}
          >Применить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calendar