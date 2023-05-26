import React, {ChangeEvent, useContext, useEffect, useState} from 'react'
import styles from './AddArticle.module.scss'
import {Button} from '../../Button/Button'
import DynamicKeyInputs, {IInput} from './modules/DynamicKeyInputs/DynamicKeyInputs'
import {nanoid} from "nanoid";
import {statisticsApi} from "@api/statistics/statistics-api";
import {UserContext, UserContextType} from "../../../../App";

interface IModalProps{
  closeModal: () => void
}

const AddArticle = ({closeModal}: IModalProps) => {
  const {user} = useContext(UserContext) as UserContextType
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
    setInputs([...inputs, {id: nanoid(), value: ''}])
  }
  const deleteInput = (id: string) => {
    setInputs(inputs.filter((input: IInput) => input.id !== id))
  }

  const onArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticle(e.target.value)
  }

  const createArticle = async () => {
    const requestData = {
      telegramId: user.telegramId,
      email: user.email,
      article: article,
      keys: inputs.map((input: IInput) => input.value),
      towns: user.towns
    }
    statisticsApi.createArticle(requestData)
  }
  const onAddClick = () => {
    createArticle()
    closeModal()
  }

  useEffect(() => {
    if(article.length){
      setDisabledAddBtn(false)
    } else{
      setDisabledAddBtn(true)
    }
  }, [article])

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