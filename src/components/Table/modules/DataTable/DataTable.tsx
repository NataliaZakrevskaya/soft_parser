import React, {useEffect, useRef, useState} from 'react';
import styles from "./DataTable.module.scss";
import cn from "classnames";
import {keys} from "../../../../utils/mocks";
import {useWindowSize} from "../../../../utils/hooks/useWindowSize";

interface IProps{
  chosenPeriod: string[]
  openKeys: string[]
  localKeys: any
}

const DataTable = ({chosenPeriod, openKeys, localKeys}: IProps) => {

  const [showScrollBar, setShowScrollBar] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const tableTwo = useRef<HTMLTableElement>(null)
  const {width} = useWindowSize()

  useEffect(() => {
    if(tableTwo.current){
      if(tableTwo.current.offsetWidth > 840){
        setShowScrollBar(true)
      } else{
        setShowScrollBar(false)
      }
    }
  }, [chosenPeriod])
  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])

  return (
    <table className={styles.wrapperTable}>
      <div className={cn(styles.scrollInner, {
        [styles.withoutScroll]: !showScrollBar && !isMobile
      })}>
        <table className={cn(styles.tableTwo, {
          [styles.tableShowScroll]: showScrollBar,
          [styles.tableHideScroll]: !showScrollBar,
        })}
               ref={tableTwo}>
          <thead className={styles.tableHead}>
          <tr>
            {
              chosenPeriod.map((date, index) => <td
                key={index}
                className={styles.cell}
              >{date}</td>)
            }
          </tr>
          </thead>
          <tbody className={styles.tableBody}>
          {localKeys.map((key: any, index: number) => {
            return (
              <div key={index}>
                <tr className={cn({
                  [styles.openRowTwo]: openKeys.includes(key.key)
                })}>
                  {
                    chosenPeriod.map((date, index) => {
                      return (
                        <td
                          key={index}
                          className={styles.cell}
                        >
                          <p>{key.data.length > 0 ? key?.data[0]?.position[0]?.position : '-'}</p>
                          {key.data[0]?.position[0]?.prevPosition && (
                            <p className={cn(styles.range, {
                              [styles.range_positive]: key?.data[0]?.position[0]?.prevPosition.startsWith('+'),
                              [styles.range_negative]: key?.data[0]?.position[0]?.prevPosition.startsWith('-')
                            })}>{key?.data[0]?.position[0]?.prevPosition}</p>
                          )}
                        </td>
                      )
                    })
                  }
                </tr>
                {key.data.length > 0 && openKeys.includes(key.key) && (
                  <div className={styles.pvzBlockTwo}>
                    {key.data.map((address: any, index: any) => {
                      return (
                        <tr key={index}>
                          {
                            chosenPeriod.map((date, index) => <td
                              key={index}
                              className={styles.cell}
                            >124</td>)
                          }
                        </tr>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          </tbody>
        </table>
      </div>
    </table>
  );
};

export default DataTable;