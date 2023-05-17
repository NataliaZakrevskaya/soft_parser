export interface IProps{
  chosenPeriod: string,
  onPeriodOptionClick: (option: string) => void
  closeCalendar: () => void
  setFirstDayCommon: (day: Date) => void
  setSecondDayCommon: (day: Date | null) => void
}