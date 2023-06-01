import React, {useContext, useEffect, useState} from 'react';
import styles from "./KeysTable.module.scss";
import ArticleSettings from "./modules/ArticleSettings/ArticleSettings";
import utils from "../../../../static/css/utils.module.scss";
import cn from "classnames";
import {useWindowSize} from "@utils/hooks/useWindowSize";
import {Article, Key, Pwz} from "@api/statistics/types";
import {PeriodContext, TablesContext} from "../../../../App";
import {PeriodContextType, TablesContextType} from "../../../../types";

interface IProps{
  article: Article,
  onArrowButtonClick: (key: string) => void
  openKeys: string[]
  addEmptyRow: () => void
  localKeys: Key[]
  emptyPlace: boolean
}

const KeysTable = ({
                     article,
                     onArrowButtonClick,
                     openKeys,
                     addEmptyRow,
                     localKeys,
                     emptyPlace
                   }: IProps) => {

  const {addKey, deleteKey} = useContext(TablesContext) as TablesContextType
  const {chosenPeriod} = useContext(PeriodContext) as PeriodContextType

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [newKeyValue, setNewKeyValue] = useState<string>('')

  const {width} = useWindowSize()
  // @ts-ignore
  const addNewKeyByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key !== 'Enter') return
    addNewKey()
  }
  const addNewKey = () => {
    setNewKeyValue('')
    addKey(newKeyValue, article)
  }
  const onDeleteKeyClick = (index: number, keyId: string) => {
    if(localKeys.length < 2) return
    deleteKey(keyId, article)
    setNewKeyValue('')   //todo проверить
  }

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])

  return (
    <table className={cn(styles.table, {
      [styles.table_withRightTableScroll]: chosenPeriod.length > 4 && !emptyPlace
    })}>
      <thead className={styles.tableHead}>
      <tr>
        <td className={cn(styles.cell, {
          [styles.withBorder]: !openKeys.includes(localKeys[0].key)
        })}>
          {!isMobile && (
            <ArticleSettings
              article={article}
              addEmptyRow={addEmptyRow}
              addKeyDisabled={!localKeys[localKeys.length - 1].key || article.keys.length > 9}
            />
          )}
          <p className={utils.textEllipsis1}>
            {article.article}
            {!isMobile && ` - ${article.productName}`}
          </p>
        </td>
      </tr>
      </thead>
      <tbody className={styles.tableBody}>
      {localKeys.map((key: Key, index: number) => {
        return (
          <div key={index}>
            <tr className={cn({
              [styles.openRow]: key.key && openKeys.includes(key?.key)
            })}>
              <td className={styles.cell}>
                <div>
                  {openKeys.includes(key?.key) && key.key ? (
                    <div
                      className={styles.arrowTop}
                      onClick={() => onArrowButtonClick(key?.key)}
                    />
                  ) : (
                    <div
                      className={styles.arrowBottom}
                      onClick={() => onArrowButtonClick(key?.key)}
                    />
                  )}
                  {key?.key ? (
                    <p className={cn(styles.keyText, {
                      [utils.textEllipsis1]: !isMobile,
                      [utils.textEllipsis2]: isMobile,
                    })}>
                      {key?.key}
                    </p>
                  ) : (
                    <div className={styles.addKeyWrapper}>
                      <input
                        type='text'
                        value={newKeyValue}
                        className={styles.keyInput}
                        placeholder='Введите ключ'
                        onChange={(e) => {
                          if(e.target.value.length < 100) setNewKeyValue(e.target.value.trim())
                        }}
                        onKeyDown={addNewKeyByEnter}
                      />
                      {
                        newKeyValue.length > 0 && (
                          <div
                            className={styles.addKeyIcon}
                            onClick={addNewKey}
                          />
                        )
                      }
                    </div>
                  )}
                </div>
                <div
                  className={cn(styles.delete, {
                    [styles.delete_forbidden]: localKeys.length < 2
                  })}
                  onClick={() => onDeleteKeyClick(index, key._id)}
                />
              </td>
            </tr>
            {key?.pwz?.length > 0 && openKeys.includes(key.key) && (
              <div className={styles.pvzBlock}>
                {key?.pwz?.map((address: Pwz, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        {!isMobile && <div className={styles.line}/>}
                          <p className={utils.textEllipsis2}>
                            {address.name}
                          </p>
                      </td>
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
  );
};

export default KeysTable;