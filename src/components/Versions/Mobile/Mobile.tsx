import React, {useContext, useEffect, useState} from 'react';
import FullVersionPlug from "./modules/fullVersionPlug/fullVersionPlug";
import Table from "../../Table/Table";
import Layout from "../../../Enter/components/Layout/Layout";
import ActionsBlock from "@components/Layout/ActionsBlock/ActionsBlock";
import {Article} from "@api/statistics/types";
import {PeriodContext} from "../../../App";
import {PeriodContextType} from "../../../types";

interface IProps{
  fullVersion: boolean
  changeVersion: () => void
  tablesData: Article[]
}

const Mobile = ({
                  changeVersion,
                  tablesData
                }: IProps) => {

    const {setPeriod} = useContext(PeriodContext) as PeriodContextType

    const [firstDay, setFirstDay] = useState<Date>(new Date())
    const [secondDay, setSecondDay] = useState<Date | null>(null)
    const [searchArticle, setSearchActive] = useState<string>('')
    const [showPlug, setShowPlug] = useState(true)

    const onArticleInputChange = (value: string) => setSearchActive(value)
    const hideVersionPlug = () => setShowPlug(false)

    useEffect(() => {
        const sixDaysAgo = new Date()
        sixDaysAgo.setDate(sixDaysAgo.getDate() - 6)
        const firstDay = sixDaysAgo
        const secondDay = new Date()
        const dates = []
        while(firstDay <= secondDay!){
          dates.unshift(firstDay.toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric', year: 'numeric'}))
          firstDay.setDate(firstDay.getDate() + 1)
        }
        setPeriod(dates)
      }, [firstDay, secondDay])

    return (
      <div className="appContainer">
        <Layout>
          <ActionsBlock
            setFirstDay={setFirstDay}
            setSecondDay={setSecondDay}
            searchArticle={searchArticle}
            onArticleInputChange={onArticleInputChange}
          />
          {showPlug && <FullVersionPlug
              changeVersion={changeVersion}
              hideVersionPlug={hideVersionPlug}/>
          }
          {
            tablesData.length > 0 && (
              <div className="tablesWrapper">
                {tablesData
                  .filter(article => article.article.startsWith(searchArticle))
                  .map((article, index) => {
                  return (
                    <Table
                      key={index}
                      article={article}
                    />
                  )
                })}
              </div>
            )
          }
        </Layout>
      </div>
    )
  }
;

export default Mobile;