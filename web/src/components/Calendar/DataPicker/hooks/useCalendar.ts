
import React from 'react';

import {
    createDate,
    createMonth,
    getMonthesNames,
    getMonthNumberOfDays,
    getWeekDaysNames
} from '../../../../utils/helpers/date';

interface UseCalendarParams {
    locale?: string;
    firstDay: Date | null,
    secondDay: Date | null,
    firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;

export const useCalendar = ({
                                locale = 'default',
                                firstDay,
                                secondDay,
                                firstWeekDayNumber = 2
                            }: UseCalendarParams) => {

    const [selectedFirstDay, setSelectedFirstDay] = React.useState(createDate({date: firstDay!}));
    const [selectedSecondDay, setSelectedSecondDay] = React.useState<any>(createDate({date: secondDay!}));
    const [selectedMonth, setSelectedMonth] = React.useState(
        createMonth({date: new Date(selectedFirstDay.year, selectedFirstDay.monthIndex), locale})
    )
    const [selectedYear, setSelectedYear] = React.useState(selectedFirstDay.year);


    const monthesNames = React.useMemo(() => getMonthesNames(locale), []);
    const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);

    const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

    const calendarDays = React.useMemo(() => {
        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays();

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays();

        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];

        const shiftIndex = firstWeekDayNumber - 1;
        const numberOfPrevDays =
            firstDay.dayNumberInWeek - 1 - shiftIndex < 0
                ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
                : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays =
            DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
                ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
                : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

        const result = [];

        for (let i = 0; i < numberOfPrevDays; i += 1) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }

        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
            result[i] = days[i - numberOfPrevDays];
        }

        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result;
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const onClickArrow = (direction: 'right' | 'left') => {
        const monthIndex =
            direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
        if (monthIndex === -1) {
            const year = selectedYear - 1;
            setSelectedYear(year);
            return setSelectedMonth(createMonth({date: new Date(selectedYear - 1, 11), locale}));
        }

        if (monthIndex === 12) {
            const year = selectedYear + 1;
            setSelectedYear(year);
            return setSelectedMonth(createMonth({date: new Date(year, 0), locale}));
        }

        setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}));
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({date: new Date(selectedYear, monthIndex), locale}));
    };

    return {
        state: {
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedFirstDay,
            selectedSecondDay,
            selectedMonth,
            selectedYear,
        },
        functions: {
            onClickArrow,
            setSelectedFirstDay,
            setSelectedSecondDay,
            setSelectedMonthByIndex,
            setSelectedYear
        }
    };
};
