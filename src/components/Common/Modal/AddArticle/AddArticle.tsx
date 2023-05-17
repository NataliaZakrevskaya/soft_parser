import React, {ChangeEvent, useState} from 'react'
import styles from './AddArticle.module.scss'
import {Button} from '../../Button/Button'
import DynamicKeyInputs from './modules/DynamicKeyInputs/DynamicKeyInputs'

interface IModalProps{
  closeModal: () => void
}

const AddArticle = ({closeModal}: IModalProps) => {
  const [article, setArticle] = useState<string>('')

  const onArticleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticle(e.target.value)
  }

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