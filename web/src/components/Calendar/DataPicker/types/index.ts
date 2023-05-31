export interface CalendarProps{
  firstDay: Date | null;
  secondDay: Date | null;
  changeFirstDay: (day: Date) => void;
  changeSecondDay: (day: Date | null) => void;
}