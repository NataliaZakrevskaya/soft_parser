import React, {useEffect, useState} from 'react';
import styles from "./KeysTable.module.scss";
import ArticleSettings from "./modules/ArticleSettings/ArticleSettings";
import utils from "../../../../static/css/utils.module.scss";
import {articleDescription, keys} from "../../../../utils/mocks";
import cn from "classnames";
import {useWindowSize} from "../../../../utils/hooks/useWindowSize";

interface IProps{
  article: string,
  onArrowButtonClick: (key: string) => void
  openKeys: string[]
}

const KeysTable = ({article, onArrowButtonClick, openKeys}: IProps) => {

  const [isMobile, setIsMobile] = useState<boolean>(false)

  const {width} = useWindowSize()

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
      <tr>
        <td className={styles.cell}>
          {!isMobile && <ArticleSettings/>}
          <p className={utils.textEllipsis1}>
            {article}
            {!isMobile && `- ${articleDescription}`}
          </p>
        </td>
      </tr>
      </thead>
      <tbody className={styles.tableBody}>
      {keys.query.map((key, index) => {
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
                  <p className={cn({
                    [utils.textEllipsis1]: !isMobile,
                    [utils.textEllipsis2]: isMobile,
                  })}>
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