import React, {useContext, useEffect, useReducer, useState} from 'react';
import Table from "../../Table/Table";
import Modal from "../../Common/Modal/Modal";
import EditPVZList from "../../Common/Modal/EditPVZList/EditPVZList";
import modalReducer, {initialState, modalReducerActions} from "../../../reducers/modal/modalReducer";
import EditCityList from "../../Common/Modal/EditCityList/EditCityList";
import DefaultCity from "../../Common/Modal/DefaultCity/DefaultCity";
import AddArticle from "../../Common/Modal/AddArticle/AddArticle";
import Onboard from "../../Onboard/Onboard";
import Layout from "../../../Enter/components/Layout/Layout";
import ActionsBlock from "@components/Layout/ActionsBlock/ActionsBlock";
import {PeriodContext} from "../../../App";
import {PeriodContextType} from "../../../types";
import {IProps} from "@components/Versions/PC/types";
import FullVersionPlug from "@components/Versions/Mobile/modules/fullVersionPlug/fullVersionPlug";
import DefaultPVZ from "@components/Common/Modal/DefaultPVZ/DefaultPVZ";

const Pc = ({
              tablesData,
              changeVersion,
              fullVersion,
              isMobile
            }: IProps) => {

  const {setPeriod} = useContext(PeriodContext) as PeriodContextType
  const [state, dispatch] = useReducer(modalReducer, initialState)
  const [searchArticle, setSearchActive] = useState<string>('')
  const [firstDay, setFirstDay] = useState<Date>(new Date())
  const [secondDay, setSecondDay] = useState<Date | null>(null)
  const [showPlug, setShowPlug] = useState<boolean>(false)

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

  useEffect(() => {
    if(secondDay === null){
      setPeriod([firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'})])
    } else{
      const dates = []
      while(firstDay <= secondDay!){
        dates.unshift(firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'}))
        firstDay.setDate(firstDay.getDate() + 1)
      }
      setPeriod(dates)
    }
  }, [firstDay, secondDay])
  const hideVersionPlug = () => setShowPlug(false)
  useEffect(() => {
    if(fullVersion){
      setShowPlug(true)
    } else{
      setShowPlug(false)
    }
  }, [fullVersion])
  console.log('tablesData', tablesData)
  return (
    <Layout>
      {showPlug && <FullVersionPlug
          fullVersion={fullVersion}
          changeVersion={changeVersion}
          hideVersionPlug={hideVersionPlug}/>
      }
      <ActionsBlock
        openPVZModal={openPVZModal}
        openAddArticleModal={openAddArticleModal}
        setFirstDay={setFirstDay}
        setSecondDay={setSecondDay}
        searchArticle={searchArticle!}
        onArticleInputChange={onArticleInputChange!}/>
      {
        tablesData.length ? (
          <div className="tablesWrapper">
            {tablesData
              .filter(article => article.article.startsWith(searchArticle))
              .map((article, index) => {
                if(article.keys.length === 0) return null
                return (
                  <Table
                    key={index}
                    article={article}
                  />
                )
              })}
          </div>
        ) : (
          <Onboard openAddArticleModal={openAddArticleModal}/>
        )
      }
      {/*{fullVersion && !isMobile && (*/}
      {/*  <button*/}
      {/*    className='change-version-btn'*/}
      {/*    onClick={changeVersion}*/}
      {/*  >Вернуться к Mobile version*/}
      {/*  </button>*/}
      {/*)}*/}
      {
        state.editPVZModalOpen && (
          <Modal closeModal={closePVZModal} title={'Редактирование пунктов выдачи заказов'}>
            <EditPVZList
              closeModal={closePVZModal}
              openCityModal={openCityModal}
              openDefaultPVZModal={openDefaultPVZModal}
            />
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
          <Modal closeModal={closeDefaultCityModal} title={'Внимание!'}>
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