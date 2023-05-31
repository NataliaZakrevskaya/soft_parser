import React, {ChangeEvent, useContext, useEffect, useState} from 'react'
import styles from './AddArticle.module.scss'
import {Button} from '../../Button/Button'
import DynamicKeyInputs, {IInput} from './modules/DynamicKeyInputs/DynamicKeyInputs'
import {nanoid} from "nanoid";
import {statisticsApi} from "@api/statistics/statistics-api";
import {
  ChosenCityContext, LoadingContext,
  PeriodContext, TablesContext,
  UserContext
} from "../../../../App";
import {
  ChosenCityContextType,
  LoadingContextType,
  PeriodContextType,
  TablesContextType,
  UserContextType
} from "../../../../types";
import {toast} from "react-toastify";

interface IModalProps{
  closeModal: () => void
}

const AddArticle = ({closeModal}: IModalProps) => {
  const {user} = useContext(UserContext) as UserContextType
  const {chosenCity} = useContext(ChosenCityContext) as ChosenCityContextType
  const {chosenPeriod} = useContext(PeriodContext) as PeriodContextType
  const {setNewTableData} = useContext(TablesContext) as TablesContextType
  const {setLoadingStatus} = useContext(LoadingContext) as LoadingContextType
  const [article, setArticle] = useState<string>('')
  const [disabledAddBtn, setDisabledAddBtn] = useState(true)
  const [inputs, setInputs] = useState<IInput[]>([{id: nanoid(), value: ''}])

  const handleInputChange = (id: string, value: string) => {
    const newInputs = [...inputs]
    const inputIndex = newInputs.findIndex(input => input.id === id)
    newInputs[inputIndex].value = value
    setInputs(newInputs)
  }
  const addInput = () => {
    if(inputs.length < 10) setInputs([...inputs, {id: nanoid(), value: ''}])
  }
  const deleteInput = (id: string) => {
    setInputs(inputs.filter((input: IInput) => input.id !== id))
  }
  const onArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length < 20) setArticle(e.target.value)
  }
  const createArticle = async() => {
    setLoadingStatus(true)
    try{
      const requestData = {
        telegramId: user.telegramId,
        userId: user._id,
        article: article.trim(),
        keys: inputs.map((input: IInput) => input.value.trim()),
        towns: user.towns
      }
      await statisticsApi.createArticle(requestData)
    } catch(e: any){
      toast(e?.response?.data?.message, {
        type: 'error',
        className: styles.toastMessage
      })
    }
    const data = {
      userId: user._id,
      city: chosenCity._id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(data)
      .then(res => setNewTableData(res.data))
      .finally(() => setLoadingStatus(false))
  }
  const onAddClick = () => {
    createArticle()
    closeModal()
  }

  useEffect(() => {
    const isThereEmptyKey = inputs.find(input => input.value === '')
    if(article.length && !isThereEmptyKey){
      setDisabledAddBtn(false)
    } else{
      setDisabledAddBtn(true)
    }
  }, [article, inputs])

  return (
    <div className={styles.modalContent}>
      <div className={styles.inputsWrapper}>
        <input
          type="text"
          placeholder="Введите артикул"
          value={article}
          className={styles.input}
          onChange={onArticleChange}
        />
        <DynamicKeyInputs
          inputs={inputs}
          handleInputChange={handleInputChange}
          addInput={addInput}
          deleteInput={deleteInput}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          text="Добавить"
          primary
          className={styles.button}
          onClick={onAddClick}
          disabled={disabledAddBtn}
        />
        <Button
          text="Отмена"
          alternative
          className={styles.button}
          onClick={closeModal}
        />
      </div>
    </div>
  )
}

export default AddArticle