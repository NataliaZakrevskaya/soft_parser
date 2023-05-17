import React from 'react'
import './DataPicker.module.scss'
import {useCalendar} from './hooks/useCalendar'
import {checkDateIsEqual, createDate} from '../../../utils/helpers/date'
import ArrowLeft from './modules/ArrowLeft'
import ArrowRight from './modules/ArrowRight'
import styles from './DataPicker.module.scss'
import {CalendarProps} from './types'
import {LOCALE} from './constants'

export const DataPicker = ({
                             firstDay,
                             secondDay,
                             changeFirstDay,
                             changeSecondDay
                           }: CalendarProps) => {

  const todayTimestamp = createDate({date: new Date()}).timestamp
  const {functions, state} = useCalendar({
    locale: LOCALE,
    firstDay,
    secondDay,
  })

  const onDayClick = (day: any) => {

    const isDayAfterToday = day.timestamp > todayTimestamp
    const isFirstDay = firstDay ? checkDateIsEqual(day.date, firstDay) : false
    const isSecondDay = secondDay ? checkDateIsEqual(day.date, secondDay) : false

    if(isDayAfterToday){
      return false
    } else{
      if(firstDay && secondDay){
        if(isFirstDay && !isSecondDay){
          functions.setSelectedSecondDay(day)
          changeSecondDay(day.date)
        }

        if(!isFirstDay && !isSecondDay){
          changeFirstDay(day.date)
          changeSecondDay(null)
        }

        if(!isFirstDay && isSecondDay){
          changeFirstDay(day.date)
          changeSecondDay(null)
        }
      }

      if(firstDay && !secondDay){
        const firstDayTimestamp = createDate({date: firstDay}).timestamp
        if(firstDayTimestamp < day.timestamp){
          changeSecondDay(day.date)
        } else{
          changeSecondDay(firstDay)
          changeFirstDay(day.date)
        }
      }
    }
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div className={styles.headerInfoWrapper}>
          <div aria-hidden className={styles.monthText}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
          <div className={styles.buttonsWrapper}>
            <div
              aria-hidden
              className={styles.arrowWrapper}
              onClick={() => functions.onClickArrow('left')}
            >
              <ArrowLeft/>
            </div>
            <div
              aria-hidden
              className={styles.arrowWrapper}
              onClick={() => functions.onClickArrow('right')}
            >
              <ArrowRight/>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.calendarWeekNames}>
          {state.weekDaysNames.map((weekDaysName) => (
            <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
          ))}
        </div>
        <div className={styles.calendarDays}>
          {state.calendarDays.map((day) => {

            const isSelectedDay = checkDateIsEqual(day.date, firstDay) || checkDateIsEqual(day.date, secondDay)
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex
            const innerInterval = secondDay ? day.timestamp > createDate({date: firstDay!}).timestamp && day.timestamp < createDate({date: secondDay!}).timestamp : false
            const isSelectedSecondDay = checkDateIsEqual(day.date, secondDay)
            const isOneSelectedDay = checkDateIsEqual(day.date, firstDay) && checkDateIsEqual(day.date, secondDay)
            const isDayAfterToday = day.timestamp > todayTimestamp

            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                aria-hidden
                onClick={() => onDayClick(day)}
                className={[
                  styles.calendarDay,
                  isSelectedDay ? styles.calendarSelectedItem : '',
                  isSelectedSecondDay ? styles.selectedItemSecond : '',
                  isAdditionalDay ? styles.calendarAdditionalDay : '',
                  isOneSelectedDay ? styles.oneSelectedDay : '',
                  isDayAfterToday ? styles.afterTodayDay : '',
                  innerInterval ? styles.calendarInnerDay : ''
                ].join(' ')}
              >
                {day.dayNumber}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
