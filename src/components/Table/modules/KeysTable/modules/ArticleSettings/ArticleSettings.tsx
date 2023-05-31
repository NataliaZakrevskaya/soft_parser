import React, {useContext, useRef, useState} from 'react'
import styles from './ArticleSettings.module.scss'
import {IArticleOption, tableArticleOptions} from '@mocks/index'
import cn from 'classnames'
import {useOnClickOutside} from '@utils/hooks/useOnClickOutside'
import {statisticsApi} from "@api/statistics/statistics-api";
import {Article} from "@api/statistics/types";
import {ChosenCityContext, LoadingContext, PeriodContext, TablesContext, UserContext} from "../../../../../../App";
import {
  ChosenCityContextType,
  LoadingContextType,
  PeriodContextType,
  TablesContextType,
  UserContextType
} from "../../../../../../types";
import {log} from "@craco/craco/dist/lib/logger";

interface IProps{
  addEmptyRow: () => void
  addKeyDisabled: boolean
  article: Article
}

const ArticleSettings = ({
                           addEmptyRow,
                           addKeyDisabled,
                           article
                         }: IProps) => {

  const {user} = useContext(UserContext) as UserContextType
  const {chosenCity} = useContext(ChosenCityContext) as ChosenCityContextType
  const {chosenPeriod} = useContext(PeriodContext) as PeriodContextType
  const {setNewTableData} = useContext(TablesContext) as TablesContextType
  const {setLoadingStatus} = useContext(LoadingContext) as LoadingContextType

  const [articleSettingsOpen, setArticleSettingsOpen] = useState<boolean>(false)

  const parentEl = useRef<HTMLDivElement>(null)

  useOnClickOutside([parentEl], () => {
    setArticleSettingsOpen(false)
  })

  const deleteArticle = async () => {
    setLoadingStatus(true)
    const data = {
      article: article.article,
      cityId: article.city_id,
      userId: user._id
    }
    await statisticsApi.removeArticle(data)
    const dataFind = {
      userId: user._id,
      city: chosenCity._id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataFind)
      .then(res => setNewTableData(res.data))
      .finally(() => setLoadingStatus(false))
  }
  const onOptionClick = (id: number) => {
    if(id === 1 && !addKeyDisabled){
      addEmptyRow()
    }
    if(id === 3){
      deleteArticle()
    } else{
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
                    // [styles.optionIcon_export]: option.id === 2,
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