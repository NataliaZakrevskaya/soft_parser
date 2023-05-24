import React, {useRef, useState} from 'react'
import styles from './ArticleSettings.module.scss'
import {IArticleOption, tableArticleOptions} from '../../../../../../utils/mocks'
import cn from 'classnames'
import {useOnClickOutside} from '../../../../../../utils/hooks/useOnClickOutside'

const ArticleSettings = () => {
  const [articleSettingsOpen, setArticleSettingsOpen] = useState<boolean>(false)

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    setArticleSettingsOpen(false)
  })

  return (
    <div
      className={styles.dots}
      ref={parentEl}
      onClick={() => setArticleSettingsOpen(!articleSettingsOpen)}
    >
      {articleSettingsOpen && (
        <ul className={styles.articleOptions}>
          {tableArticleOptions.map((option: IArticleOption) => {
            return (
              <>
                <li
                  key={option.id}
                  className={styles.option}
                >
                  <div className={cn(styles.optionIcon, {
                    [styles.optionIcon_plus]: option.id === 1,
                    [styles.optionIcon_export]: option.id === 2,
                    [styles.optionIcon_delete]: option.id === 3,
                  })}/>
                  {option.name}
                </li>
                {option.id !== 3 && (
                  <div className={styles.separatop}/>
                )}

              </>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ArticleSettings