import React, {ChangeEvent} from 'react'
import styles from './InputField.module.scss'
import cn from 'classnames'

interface IInput{
  value: string
  onChange: (inputValue: string) => void
  lastInput: boolean
  showDelete: boolean
  addInput: () => void
  deleteInput: () => void
}

const InputField = ({value, onChange, lastInput, addInput, showDelete, deleteInput}: IInput) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
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
      {(showDelete || lastInput) && (
        <div className={cn(styles.controlsWrapper, {
          [styles.twoControls]: showDelete && lastInput
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
          {lastInput && (
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