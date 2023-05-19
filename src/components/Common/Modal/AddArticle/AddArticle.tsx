import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './AddArticle.module.scss'
import {Button} from '../../Button/Button'
import DynamicKeyInputs from './modules/DynamicKeyInputs/DynamicKeyInputs'

interface IModalProps{
  closeModal: () => void
  addArticle: (value: string) => void
}

const AddArticle = ({closeModal, addArticle}: IModalProps) => {
  const [article, setArticle] = useState<string>('')
  const [disabledAddBtn, setDisabledAddBtn] = useState(true)

  const onArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticle(e.target.value)
  }
  const onAddClick = () => {
    addArticle(article)
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
        <DynamicKeyInputs/>
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