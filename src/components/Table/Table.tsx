import React, {useEffect, useRef, useState} from 'react'
import styles from './Table.module.scss'
import {keys} from '../../utils/mocks'
import ArticleSettings from './modules/ArticleSettings/ArticleSettings'
import cn from 'classnames'
import utils from '../../static/css/utils.module.scss'

interface ITable{
  chosenPeriod: string[]
  article: string
}

const Table = ({chosenPeriod, article}: ITable) => {

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [showScrollBar, setShowScrollBar] = useState<boolean>(false)

  const tableTwo = useRef<HTMLTableElement>(null)

  const onArrowButtonClick = (key: string) => {
    if(openKeys.includes(key)){
      setOpenKeys(openKeys.filter(keyData => keyData !== key))
    } else{
      setOpenKeys([...openKeys, key])
    }
  }

  useEffect(() => {
    if(tableTwo.current){
      if(tableTwo.current.offsetWidth > 840){
        setShowScrollBar(true)
      } else{
        setShowScrollBar(false)
      }
    }
  }, [chosenPeriod])

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <tr>
          <td>
            <ArticleSettings/>
            <p className={utils.textEllipsis1}>
              {article} - Куртка косуха кожаная...Куртка косуха кожаная...Куртка косуха
              кожаная...Куртка косуха кожаная...Куртка косуха кожаная...Куртка косуха кожаная...
            </p>
          </td>
        </tr>
        {keys.query.map((key, index) => {
          return (
            <>
              <tr className={cn({
                [styles.openRow]: openKeys.includes(key.key)
              })}>
                <td>
                  <div>
                    {openKeys.includes(key.key) ? (
                      <div
                        className={styles.arrowTop}
                        onClick={() => onArrowButtonClick(key.key)}
                      />
                    ) : (
                      <div
                        className={styles.arrowBottom}
                        onClick={() => onArrowButtonClick(key.key)}
                      />
                    )}
                    <p className={utils.textEllipsis1}>
                      {key.key}
                    </p>
                  </div>
                  <div className={styles.delete}/>
                </td>
              </tr>
              {key.data.length && openKeys.includes(key.key) && (
                <div className={styles.pvzBlock}>
                  {key.data.map((address, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className={styles.line}/>
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
          <table className={cn(styles.tableTwo, {
            [styles.tableShowScroll]: showScrollBar
          })}
                 ref={tableTwo}>
            <tr className={cn({
              [styles.tableHideScroll]: !showScrollBar
            })}>
              {
                chosenPeriod.map((date, index) => <td key={index}>{date}</td>)
              }
            </tr>
            {keys.query.map((key, index) => {
              return (
                <>
                  <tr className={cn({
                    [styles.openRowTwo]: openKeys.includes(key.key)
                  })}>
                    {
                      chosenPeriod.map((date, index) => {
                        return (
                          <td key={index}>
                            <p>{key.data[0].position[0].position}</p>
                            {key.data[0].position[0].prevPosition && (
                              <p className={cn(styles.range, {
                                [styles.range_positive]: key.data[0].position[0].prevPosition.startsWith('+'),
                                [styles.range_negative]: key.data[0].position[0].prevPosition.startsWith('-')
                              })}>{key.data[0].position[0].prevPosition}</p>
                            )}
                          </td>
                        )
                      })
                    }
                  </tr>
                  {key.data.length && openKeys.includes(key.key) && (
                    <div className={styles.pvzBlockTwo}>
                      {key.data.map((address, index) => {
                        return (
                          <tr key={index}>
                            {
                              chosenPeriod.map((date, index) => <td key={index}>124</td>)
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

export default Table