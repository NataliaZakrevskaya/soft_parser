import {ResponseAddress} from "../../../../../api/geo/types";

export interface ModalPropsType{
  closeModal: () => void
  openCityModal: () => void
  openDefaultPVZModal: () => void
}

export interface ChangeType{
  city: string
  pwz: ResponseAddress[]
}