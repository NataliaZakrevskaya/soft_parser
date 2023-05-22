interface InitialStateType{
  editPVZModalOpen: boolean,
  editCityModalOpen: boolean,
  defaultPVZModalOpen: boolean,
  defaultCityModalOpen: boolean
  addArticleModalOpen: boolean
}

export const initialState = {
  editPVZModalOpen: false,
  editCityModalOpen: false,
  defaultPVZModalOpen: false,
  defaultCityModalOpen: false,
  addArticleModalOpen: false
}

export const modalReducer = (state: InitialStateType = initialState, action: any) => {
  switch(action.type){
    case 'openPVZModal':
      return {...state, editPVZModalOpen: true}
    case 'closePVZModal':
      return {...state, editPVZModalOpen: false}
    case 'openCityModal':
      return {...state, editCityModalOpen: true}
    case 'closeCityModal':
      return {...state, editCityModalOpen: false}
    case 'openDefaultPVZModal':
      return {...state, defaultPVZModalOpen: true}
    case 'closeDefaultPVZModal':
      return {...state, defaultPVZModalOpen: false}
    case 'openDefaultCityModal':
      return {...state, defaultCityModalOpen: true}
    case 'closeDefaultCityModal':
      return {...state, defaultCityModalOpen: false}
    case 'openAddArticleModal':
      return {...state, addArticleModalOpen: true}
    case 'closeAddArticleModal':
      return {...state, addArticleModalOpen: false}
    default:
      return state
  }
}

export const modalReducerActions = {
  openPVZModal: () => {
    return {type: 'openPVZModal'} as const;
  },
  closePVZModal: () => {
    return {type: 'closePVZModal'} as const;
  },
  openCityModal: () => {
    return {type: 'openCityModal'} as const;
  },
  closeCityModal: () => {
    return {type: 'closeCityModal'} as const;
  },
  openDefaultPVZModal: () => {
    return {type: 'openDefaultPVZModal'} as const;
  },
  closeDefaultPVZModal: () => {
    return {type: 'closeDefaultPVZModal'} as const;
  },
  openDefaultCityModal: () => {
    return {type: 'openDefaultCityModal'} as const;
  },
  closeDefaultCityModal: () => {
    return {type: 'closeDefaultCityModal'} as const;
  },
  openAddArticleModal: () => {
    return {type: 'openAddArticleModal'} as const;
  },
  closeAddArticleModal: () => {
    return {type: 'closeAddArticleModal'} as const;
  },
};


export default modalReducer;