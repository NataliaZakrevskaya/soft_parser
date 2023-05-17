import { createDate } from './createDate';

export const getMonthesNames = (locale: string = 'defalut') => {
  const monthesNames: {
    month: ReturnType<typeof createDate>['month'];
    monthShortUpper: ReturnType<typeof createDate>['monthShortUpper'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
    date: ReturnType<typeof createDate>['date'];
  }[] = Array.from({ length: 12 });

  const d = new Date();

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShortUpper, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1)
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShortUpper, date };
  });

  return monthesNames;
};
