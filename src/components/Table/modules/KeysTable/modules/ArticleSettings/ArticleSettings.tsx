import React, {useRef, useState} from 'react'
import styles from './ArticleSettings.module.scss'
import {IArticleOption, tableArticleOptions} from '../../../../../../mocks'
import cn from 'classnames'
import {useOnClickOutside} from '../../../../../../utils/hooks/useOnClickOutside'
interface IProps {
  addEmptyRow: () => void
  addKeyDisabled: boolean
}
const ArticleSettings = ({addEmptyRow, addKeyDisabled}: IProps) => {
  const [articleSettingsOpen, setArticleSettingsOpen] = useState<boolean>(false)

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    setArticleSettingsOpen(false)
  })
  const onOptionClick = (id: number) => {
    if(id === 1 && !addKeyDisabled){
      addEmptyRow()
    } else {
      return false
    }
  }

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
                  className={cn(styles.option, {
                    [styles.option_disabled]: option.id === 1 && addKeyDisabled
                  })}
                  onClick={() => onOptionClick(option.id)}
                >
                  <div className={cn(styles.optionIcon, {
                    [styles.optionIcon_plus]: option.id === 1,
                    [styles.optionIcon_disabled]: option.id === 1 && addKeyDisabled,
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