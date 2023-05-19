import React, {useState} from 'react'
import styles from './Onboard.module.scss'
import cn from 'classnames'
import {Button} from '../Common/Button/Button'

const options = [
  {id: 1, text: 'Нажмите «добавить артикул» и введите его в появившейся строке.'},
  {id: 2, text: 'Введите ключ. Чтобы добавить больше ключей, нажмите на три вертикальные точи слева'},
  {id: 3, text: 'Выберете города и ПВЗ, по которым хотите отследить позиции товаров'},
]
interface IProps{
  openAddArticleModal: () => void
}
const Onboard = ({openAddArticleModal}: IProps) => {

  const [activeOption, setActiveOption] = useState<number | null>(null)

  return (
    <div className={styles.onboardWrapper}>
      <h2 className={styles.title}>Как работать с трекером?</h2>
      <div className={styles.onboardContent}>
        <div className={styles.onBoardOptionContainer}>
          {options.map(option => {
            return (
              <div
                key={option.id}
                className={cn(styles.option, {
                [styles.option_active]: activeOption === option.id
              })}
                   onMouseOver={() => setActiveOption(option.id)}
              >
                <div className={cn(styles.optionNumber, {
                  [styles.optionNumber_active]: activeOption === option.id
                })}>
                  {option.id}
                </div>
                <p className={cn(styles.optionText, {
                  [styles.optionText_active]: activeOption === option.id
                })}>{option.text}</p>
              </div>
            )
          })}
          <Button
            text='Добавить первый артикул'
            primary
            className={styles.btn}
            onClick={openAddArticleModal}
          />
        </div>
        <div className={cn(styles.onboardImage, {
          [styles.onboardImageOne]: activeOption === 1,
          [styles.onboardImageTwo]: activeOption === 2,
          [styles.onboardImageThree]: activeOption === 3,
        })}/>
      </div>
    </div>
  )
}

export default Onboard