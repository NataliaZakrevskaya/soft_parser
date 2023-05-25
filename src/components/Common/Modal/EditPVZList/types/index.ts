export interface ModalPropsType{
  closeModal: () => void
  openCityModal: () => void
  openDefaultPVZModal: () => void
}

export interface IPWZ{
  _id: string
  name?: string
}

export interface ChangeType{
  _id: string
  city: string
  pwz: IPWZ[]
}