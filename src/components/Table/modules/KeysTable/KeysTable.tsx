import React, {useEffect, useState} from 'react';
import styles from "./KeysTable.module.scss";
import ArticleSettings from "./modules/ArticleSettings/ArticleSettings";
import utils from "../../../../static/css/utils.module.scss";
import {articleDescription} from "../../../../utils/mocks";
import cn from "classnames";
import {useWindowSize} from "../../../../utils/hooks/useWindowSize";

interface IProps{
  article: string,
  onArrowButtonClick: (key: string) => void
  openKeys: string[]
  addEmptyRow: () => void
  localKeys: any
  addNewKey: (key: string, index: number) => void
  deleteNey: (keyIndex: number) => void
}

const KeysTable = ({
                     article,
                     onArrowButtonClick,
                     openKeys,
                     addEmptyRow,
                     localKeys,
                     addNewKey,
                     deleteNey
                   }: IProps) => {

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [newKeyValue, setNewKeyValue] = useState<string>('')

  const {width} = useWindowSize()
  const addKey = (index: number) => {
    setNewKeyValue('')
    addNewKey(newKeyValue, index)
  }

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
      <tr>
        <td className={styles.cell}>
          {!isMobile && (
            <ArticleSettings
              addEmptyRow={addEmptyRow}
              addKeyDisabled={localKeys[localKeys.length - 1].key.length === 0}
            />
          )}
          <p className={utils.textEllipsis1}>
            {article}
            {!isMobile && `- ${articleDescription}`}
          </p>
        </td>
      </tr>
      </thead>
      <tbody className={styles.tableBody}>
      {localKeys.map((key: any, index: number) => {
        return (
          <div key={index}>
            <tr className={cn({
              [styles.openRow]: openKeys.includes(key.key)
            })}>
              <td className={styles.cell}>
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
                  {key.key ? (
                    <p className={cn({
                      [utils.textEllipsis1]: !isMobile,
                      [utils.textEllipsis2]: isMobile,
                    })}>
                      {key.key}
                    </p>
                  ) : (
                    <div className={styles.addKeyWrapper}>
                      <input
                        type='text'
                        value={newKeyValue}
                        className={styles.keyInput}
                        placeholder='Введите ключ'
                        onChange={(e) => setNewKeyValue(e.target.value)}
                      />
                      {
                        newKeyValue.length > 0 && (
                          <div
                            className={styles.addKeyIcon}
                            onClick={() => addKey(index)}
                            // onPointerEnter={() => addKey(index)}
                          />

                        )
                      }
                    </div>
                  )}
                </div>
                <div
                  className={styles.delete}
                  onClick={() => deleteNey(index)}
                />
              </td>
            </tr>
            {key.data.length > 0 && openKeys.includes(key.key) && (
              <div className={styles.pvzBlock}>
                {key.data.map((address: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        {!isMobile && <div className={styles.line}/>}
                        <div className={cn(styles.dashedBorder)}>
                          <p className={utils.textEllipsis2}>
                            {address.address}
                          </p>
                        </div>
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