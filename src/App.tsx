import React, {useEffect, useState} from 'react'
import './static/css/global.scss'
import {Layout} from './components/Layout/Layout'
import Modal from './components/Common/Modal/Modal'
import EditPVZList from './components/Common/Modal/EditPVZList/EditPVZList'
import EditCityList from './components/Common/Modal/EditCityList/EditCityList'
import DefaultCity from './components/Common/Modal/DefaultCity/DefaultCity'
import DefaultPVZ from './components/Common/Modal/DefaultPVZ/DefaultPVZ'
import Table from './components/Table/Table'
import AddArticle from './components/Common/Modal/AddArticle/AddArticle'
import TableTwo from './components/Table/TableTwo'

export const App: React.FC = () => {

  const [editPVZModalOpen, setEditPVZModalOpen] = useState<boolean>(false)
  const [editCityModalOpen, setEditCityModalOpen] = useState<boolean>(false)
  const [defaultPVZModalOpen, setDefaultPVZModalOpen] = useState<boolean>(false)
  const [defaultCityModalOpen, setDefaultCityModalOpen] = useState<boolean>(false)
  const [addArticleOpen, setAddArticleOpen] = useState<boolean>(false)
  const [chosenPeriod, setChosenPeriod] = useState<string[]>([])
  const [firstDay, setFirstDay] = useState<Date>(new Date())
  const [secondDay, setSecondDay] = useState<Date | null>(null)

  const openPVZModal = () => setEditPVZModalOpen(true)
  const closePVZModal = () => setEditPVZModalOpen(false)
  const openCityModal = () => setEditCityModalOpen(true)
  const closeCityModal = () => setEditCityModalOpen(false)
  const openDefaultPVZModal = () => setDefaultPVZModalOpen(true)
  const closeDefaultPVZModal = () => setDefaultPVZModalOpen(false)
  const openDefaultCityModal = () => setDefaultCityModalOpen(true)
  const closeDefaultCityModal = () => setDefaultCityModalOpen(false)
  const openAddArticleModal = () => setAddArticleOpen(true)
  const closeAddArticleModal = () => setAddArticleOpen(false)
  useEffect(() => {
    if(secondDay === null){
      setChosenPeriod([firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'})])
    } else{
      const dates = []
      while(firstDay <= secondDay!){
        dates.push(firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'}))
        firstDay.setDate(firstDay.getDate() + 1)
      }
      setChosenPeriod(dates)
    }
  }, [firstDay, secondDay])

  return (
    <div className="appContainer">
      <Layout
        openPVZModal={openPVZModal}
        openAddArticleModal={openAddArticleModal}
        setFirstDay={setFirstDay}
        setSecondDay={setSecondDay}
      >
        {/*<Onboard/>*/}
        <TableTwo chosenPeriod={chosenPeriod}/>
        {
          editPVZModalOpen && (
            <Modal closeModal={closePVZModal} title={'Редактирование пунктов выдачи заказов'}>
              <EditPVZList
                closeModal={closePVZModal}
                openCityModal={openCityModal}
                openDefaultPVZModal={openDefaultPVZModal}/>
            </Modal>
          )
        }
        {
          editCityModalOpen && (
            <Modal closeModal={closeCityModal} title={'Редактирование списка городов'}>
              <EditCityList
                closeModal={closeCityModal}
                openDefaultCityModal={openDefaultCityModal}/>
            </Modal>
          )
        }
        {
          defaultCityModalOpen && (
            <Modal closeModal={closeCityModal} title={'Внимание!'}>
              <DefaultCity closeModal={closeDefaultCityModal}/>
            </Modal>
          )
        }
        {
          defaultPVZModalOpen && (
            <Modal closeModal={closeDefaultPVZModal} title={'Внимание!'}>
              <DefaultPVZ closeModal={closeDefaultPVZModal}/>
            </Modal>
          )
        }
        {
          addArticleOpen && (
            <Modal closeModal={closeAddArticleModal} title={'Добавление нового артикула'}>
              <AddArticle closeModal={closeAddArticleModal}/>
            </Modal>
          )
        }
      </Layout>
    </div>
  )
}

export default App