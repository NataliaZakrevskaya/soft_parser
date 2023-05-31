import React, {useRef} from 'react';
import styles from "./DataTable.module.scss";
import cn from "classnames";
import {Key, Position, Pwz} from "@api/statistics/types";

interface IProps{
  openKeys: string[]
  localKeys: Key[]
  emptyPlace: boolean
}

const DataTable = ({openKeys, localKeys, emptyPlace}: IProps) => {

  const tableTwo = useRef<HTMLTableElement>(null)

  return (
    <table className={styles.wrapperTable}>
      <div className={cn(styles.scrollInner, {
        [styles.scrollInner_withoutScroll]: !emptyPlace,
        [styles.withoutScroll]: emptyPlace
      })}>
        <table className={cn(styles.tableTwo, {
          // [styles.tableShowScroll]: showScrollBar,
          // [styles.tableHideScroll]: !showScrollBar,
        })}
               ref={tableTwo}>
          <thead className={styles.tableHead}>
          <tr>
            {
              localKeys[0].pwz[0].position.map((position, index) => <td
                key={index}
                className={cn(styles.cell, {
                  [styles.withBorder]: !openKeys.includes(localKeys[0].key)
                })}
              >{position.timestamp}</td>)
            }
          </tr>
          </thead>
          <tbody className={styles.tableBody}>
          {localKeys.map((key: Key, index: number) => {
            return (
              <div key={index}>
                <tr className={cn({
                  [styles.openRowTwo]: openKeys.includes(key?.key) && key.key
                })}>
                  {
                    key?.pwz[0]?.position?.map((position: Position, index) => {
                      return (
                        <td
                          key={index}
                          className={styles.cell}
                        >
                          <p>{position?.position?.startsWith('Не') ? '-' : position?.position}</p>
                          {position?.difference !== '0' && (
                            <p className={cn(styles.range, {
                              [styles.range_positive]: position?.difference?.startsWith('+'),
                              [styles.range_negative]: position?.difference?.startsWith('-')
                            })}>{position?.difference}</p>
                          )}
                        </td>
                      )
                    })
                  }
                </tr>
                {key?.pwz?.length > 0 && openKeys.includes(key?.key) && (
                  <div className={styles.pvzBlockTwo}>
                    {key?.pwz?.map((pwz: Pwz, index: any) => {
                      return (
                        <tr key={index}>
                          {
                            key?.pwz[index]?.position?.map((position, index) => <td
                              key={index}
                              className={styles.cell}
                            >
                              <p>{position?.position?.startsWith('Не') ? '-' : position?.position}</p>
                              {position?.difference !== '0' && (
                                <p className={cn(styles.range, {
                                  [styles.range_positive]: position?.difference?.startsWith('+'),
                                  [styles.range_negative]: position?.difference?.startsWith('-')
                                })}>{position?.difference}</p>
                              )}
                            </td>)
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