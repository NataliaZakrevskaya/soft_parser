import React, {useState} from 'react'
import styles from './TableTwo.module.scss'
import {keys} from '../../utils/mocks'
import ArticleSettings from './modules/ArticleSettings/ArticleSettings'
import cn from 'classnames'

interface ITable{
  chosenPeriod: string[]
}

const TableTwo = ({chosenPeriod}: ITable) => {

  const [openKeys, setOpenKeys] = useState<string[]>([])

  const onArrowButtonClick = (key: string) => {
    if(openKeys.includes(key)){
      setOpenKeys(openKeys.filter(keyData => keyData !== key))
    } else{
      setOpenKeys([...openKeys, key])
    }
  }
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <tr className={styles.articleRow}>
          <td className={styles.firstColumn}>
            <ArticleSettings/>
            49582305 - Куртка косуха кожаная...
          </td>
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
                      </tr>
                    )
                  })}
                </div>
              )}
            </>
          )
        })}
      </table>

        <table className={styles.wrapperTable}>
          <div className={styles.scrollInner}>
            <table className={styles.tableTwo}>
          <tr className={styles.articleRow}>
                {
                  chosenPeriod.map(date => <td>{date}</td>)
                }
          </tr>
          {keys.query.map(key => {
            return (
              <>
                <tr className={cn({
                  [styles.openRow]: openKeys.includes(key.key)
                })}>
                      {
                        chosenPeriod.map(date => <td>124</td>)
                      }
                </tr>
                {key.data.length && openKeys.includes(key.key) && (
                  <div className={styles.pvzBlock}>
                    {key.data.map(address => {
                      return (
                        <tr>
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
          </div>
        </table>

    </div>
  )
}

export default TableTwo