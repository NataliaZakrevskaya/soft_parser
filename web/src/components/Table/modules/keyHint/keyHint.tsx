import React from 'react'
import styles from './keyHint.module.scss'

const KeyHint = () => {
  return (
    <div className={styles.hintWrapper}>
      <div className={styles.img}/>
      <div className={styles.textBlock}>
        <p className={styles.title}>Позиция ключа</p>
        <p className={styles.text}>Цифра указывает на среднее значение по выбранному региону</p>
      </div>
      <div className={styles.hintTail}/>
    </div>
  )
}

export default KeyHint