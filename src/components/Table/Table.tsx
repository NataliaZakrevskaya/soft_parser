import React, {useState} from 'react'
import styles from './Table.module.scss'
import {keys} from '../../utils/mocks'
import ArticleSettings from './modules/ArticleSettings/ArticleSettings'
import cn from 'classnames'

interface ITable{
  chosenPeriod: string[]
}

const Table = ({chosenPeriod}: ITable) => {

  const [openKeys, setOpenKeys] = useState<string[]>([])

  const onArrowButtonClick = (key: string) => {
    if(openKeys.includes(key)){
      setOpenKeys(openKeys.filter(keyData => keyData !== key))
    } else{
      setOpenKeys([...openKeys, key])
    }
  }
  return (
    <table className={styles.table}>
      <tr className={styles.articleRow}>
        <td className={styles.firstColumn}>
          <ArticleSettings/>
          49582305 - Куртка косуха кожаная женская курт...
        </td>
        <div className={styles.additionalColumnsWrapper}>
          <div className={styles.scrollInner}>
            {
              chosenPeriod.map(date => <td>{date}</td>)
            }
          </div>
        </div>
      </tr>
      {keys.query.map(key => {
        return (
          <>
            <tr className={cn({
              [styles.openRow]: openKeys.includes(key.key)
            })}>
              <td className={styles.firstColumn}>
                <div
                  className={styles.arrowBottom}
                  onClick={() => onArrowButtonClick(key.key)}
                />
                {key.key}
              </td>
              <div className={styles.additionalColumnsWrapper}>
                <div className={styles.scrollInner}>
                  {
                    chosenPeriod.map(date => <td>124</td>)
                  }
                </div>
              </div>
            </tr>
            {key.data.length && openKeys.includes(key.key) && (
              <div className={styles.pvzBlock}>
                {key.data.map(address => {
                  return (
                    <tr>
                      <td>
                        <div className={styles.line}/>
                        {/*<div className={styles.arrowBottom}/>*/}
                        <div className={styles.dashedBorder}>
                          {address.address}
                        </div>
                      </td>
                      {
                        chosenPeriod.map(date => <td>124</td>)
                      }
                    </tr>
                  )
                })}
              </div>
            )}
          </>
        )
      })}

    </table>
  )
}

export default Table