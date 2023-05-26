import React, {useEffect, useReducer, useState} from 'react';
import {Layout} from "../../Layout/Layout";
import Table from "../../Table/Table";
import Modal from "../../Common/Modal/Modal";
import EditPVZList from "../../Common/Modal/EditPVZList/EditPVZList";
import modalReducer, {initialState, modalReducerActions} from "../../../reducers/modal/modalReducer";
import EditCityList from "../../Common/Modal/EditCityList/EditCityList";
import DefaultCity from "../../Common/Modal/DefaultCity/DefaultCity";
import DefaultPVZ from "../../Common/Modal/DefaultPVZ/DefaultPVZ";
import AddArticle from "../../Common/Modal/AddArticle/AddArticle";
import Onboard from "../../Onboard/Onboard";

interface IProps{
  changeVersion?: () => void
  fullVersion: boolean
  isMobile: boolean
}

const Pc = ({changeVersion,
              fullVersion,
              isMobile
}: IProps) => {

  const [state, dispatch] = useReducer(modalReducer, initialState)
  const [searchArticle, setSearchActive] = useState<string>('')
  const [chosenPeriod, setChosenPeriod] = useState<string[]>([])
  const [firstDay, setFirstDay] = useState<Date>(new Date())
  const [secondDay, setSecondDay] = useState<Date | null>(null)
  const [articles, setArticles] = useState<string[]>([
    '49582305',
    '73582305',
    '13782305'
  ])
  const openPVZModal = () => dispatch(modalReducerActions.openPVZModal())
  const closePVZModal = () => dispatch(modalReducerActions.closePVZModal())
  const openCityModal = () => dispatch(modalReducerActions.openCityModal())
  const closeCityModal = () => dispatch(modalReducerActions.closeCityModal())
  const openDefaultPVZModal = () => dispatch(modalReducerActions.openDefaultPVZModal())
  const closeDefaultPVZModal = () => dispatch(modalReducerActions.closeDefaultPVZModal())
  const openDefaultCityModal = () => dispatch(modalReducerActions.openDefaultCityModal())
  const closeDefaultCityModal = () => dispatch(modalReducerActions.closeDefaultCityModal())
  const openAddArticleModal = () => dispatch(modalReducerActions.openAddArticleModal())
  const closeAddArticleModal = () => dispatch(modalReducerActions.closeAddArticleModal())
  const onArticleInputChange = (value: string) => setSearchActive(value)
  const addArticle = (value: string) => setArticles([value, ...articles])

  useEffect(() => {
    if(secondDay === null){
      setChosenPeriod([firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'})])
    } else{
      const dates = []
      while(firstDay <= secondDay!){
        dates.unshift(firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'}))
        firstDay.setDate(firstDay.getDate() + 1)
      }
      setChosenPeriod(dates)
    }
  }, [firstDay, secondDay])

  return (
    <Layout
      openPVZModal={openPVZModal}
      openAddArticleModal={openAddArticleModal}
      setFirstDay={setFirstDay}
      setSecondDay={setSecondDay}
      searchArticle={searchArticle!}
      onArticleInputChange={onArticleInputChange!}
      fullVersion={fullVersion}
    >
      {
        articles.length ? (
          <div className="tablesWrapper">
            {articles.filter(article => article.startsWith(searchArticle)).map((article, index) => {
              return (
                <Table
                  key={index}
                  chosenPeriod={chosenPeriod}
                  article={article}
                />
              )
            })}
          </div>
        ) : (
          <Onboard openAddArticleModal={openAddArticleModal}/>
        )
      }
      {fullVersion && !isMobile && (
        <button
          className='change-version-btn'
          onClick={changeVersion}
        >Вернуться к Mobile version
        </button>
      )}
      {
        state.editPVZModalOpen && (
          <Modal closeModal={closePVZModal} title={'Редактирование пунктов выдачи заказов'}>
            <EditPVZList
              closeModal={closePVZModal}
              openCityModal={openCityModal}
              openDefaultPVZModal={openDefaultPVZModal}/>
          </Modal>
        )
      }
      {
        state.editCityModalOpen && (
          <Modal closeModal={closeCityModal} title={'Редактирование списка городов'}>
            <EditCityList
              closeModal={closeCityModal}
              openDefaultCityModal={openDefaultCityModal}/>
          </Modal>
        )
      }
      {
        state.defaultCityModalOpen && (
          <Modal closeModal={closeCityModal} title={'Внимание!'}>
            <DefaultCity closeModal={closeDefaultCityModal}/>
          </Modal>
        )
      }
      {
        state.defaultPVZModalOpen && (
          <Modal closeModal={closeDefaultPVZModal} title={'Внимание!'}>
            <DefaultPVZ closeModal={closeDefaultPVZModal}/>
          </Modal>
        )
      }
      {
        state.addArticleModalOpen && (
          <Modal closeModal={closeAddArticleModal} title={'Добавление нового артикула'}>
            <AddArticle
              closeModal={closeAddArticleModal}
            />
          </Modal>
        )
      }
    </Layout>
  );
};

export default Pc;