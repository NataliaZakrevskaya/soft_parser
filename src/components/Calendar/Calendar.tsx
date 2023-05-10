import React from 'react';
import './Calendar.css';
import {useCalendar} from "./hooks/useCalendar";
import {checkDateIsEqual, createDate} from "../../utils/helpers/date";
import ArrowLeft from "./modules/ArrowLeft";
import ArrowRight from "./modules/ArrowRight";


interface CalendarProps {
    firstDay: Date | null;
    secondDay: Date | null;
    changeFirstDay: (day: Date) => void;
    changeSecondDay: (day: Date | null) => void;
}

export const Calendar = ({
                             firstDay,
                             secondDay,
                             changeFirstDay,
                             changeSecondDay
                         }: CalendarProps) => {

    const locale = 'default'
    const todayTimestamp = createDate({date: new Date()}).timestamp

    const {functions, state} = useCalendar({
        locale,
        firstDay,
        secondDay,
    });

    const onDayClick = (day: any) => {
        const isFirstDay = firstDay ? checkDateIsEqual(day.date, firstDay) : false;
        const isSecondDay = secondDay ? checkDateIsEqual(day.date, secondDay) : false;

        if (firstDay && secondDay) {
            if (isFirstDay && !isSecondDay) {
                functions.setSelectedSecondDay(day)
                changeSecondDay(day.date)
            }

            if (!isFirstDay && !isSecondDay) {
                changeFirstDay(day.date)
                changeSecondDay(null)
            }
        }

        if (firstDay && !secondDay) {
            const firstDayTimestamp = createDate({date: firstDay}).timestamp
            if (firstDayTimestamp < day.timestamp) {
                changeSecondDay(day.date)
            } else {
                changeSecondDay(firstDay)
                changeFirstDay(day.date)
            }
        }

    }

    return (

        <div className='calendar'>
            <div className='calendar__header'>
                <div className='header__info__wrapper'>
                    <div aria-hidden className='month__text'>
                        {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                    <div className='buttons__wrapper'>
                        <div
                            aria-hidden
                            className='arrow__wrapper'
                            onClick={() => functions.onClickArrow('left')}
                        >
                            <ArrowLeft/>
                        </div>
                        <div
                            aria-hidden
                            className='arrow__wrapper'
                            onClick={() => functions.onClickArrow('right')}
                        >
                            <ArrowRight/>
                        </div>
                    </div>

                </div>

            </div>
            <div className='calendar__body'>
                <div className='calendar__week__names'>
                    {state.weekDaysNames.map((weekDaysName) => (
                        <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                    ))}
                </div>
                <div className='calendar__days'>
                    {state.calendarDays.map((day) => {

                        const isSelectedDay = checkDateIsEqual(day.date, firstDay) || checkDateIsEqual(day.date, secondDay);
                        const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
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
                                    'calendar__day',
                                    isSelectedDay ? 'calendar__selected__item' : '',
                                    isSelectedSecondDay ? 'selected__item__second' : '',
                                    isAdditionalDay ? 'calendar__additional__day' : '',
                                    isOneSelectedDay ? 'one__selected__day' : '',
                                    isDayAfterToday ? 'after__today__day' : '',
                                    innerInterval ? 'calendar__inner__day' : ''
                                ].join(' ')}
                            >
                                {day.dayNumber}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
