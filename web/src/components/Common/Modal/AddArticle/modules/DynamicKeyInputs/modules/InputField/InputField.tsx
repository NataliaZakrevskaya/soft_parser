import React, {ChangeEvent} from 'react'
import styles from './InputField.module.scss'
import cn from 'classnames'

interface IInput{
  value: string
  onChange: (inputValue: string) => void
  showAddInput: boolean
  showDelete: boolean
  addInput: () => void
  deleteInput: () => void
}

const InputField = ({value, onChange, showAddInput, addInput, showDelete, deleteInput}: IInput) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length < 100) onChange(e.target.value.trim())
  }

  return (
    <div className={styles.fieldWrapper}>
      <input
        type="text"
        placeholder="Введите ключ"
        value={value}
        className={styles.input}
        onChange={handleChange}
      />
      {(showDelete || showAddInput) && (
        <div className={cn(styles.controlsWrapper, {
          [styles.twoControls]: showDelete && showAddInput
        })}>
          {showDelete && (
            <button
              onClick={deleteInput}
              className={cn(styles.controlBtn, styles.deleteKey)}
            >
              <div className={styles.deleteIcon}/>
              Удалить
            </button>
          )}
          {showAddInput && (
            <button
              onClick={addInput}
              className={cn(styles.controlBtn, styles.addKey)}
            >
              <div className={styles.addIcon}/>
              Добавить ключ
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default InputField