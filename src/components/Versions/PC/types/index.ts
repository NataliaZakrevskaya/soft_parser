import {Article} from "@api/statistics/types";

export interface IProps{
  changeVersion?: () => void
  fullVersion: boolean
  isMobile: boolean
  tablesData: Article[]
}