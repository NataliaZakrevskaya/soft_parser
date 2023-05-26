import React, {useEffect, useState} from 'react';
import FullVersionPlug from "./modules/fullVersionPlug/fullVersionPlug";
import Table from "../../Table/Table";
import {Layout} from "../../Layout/Layout";
import {Town} from "@api/user/types";

interface IProps{
  fullVersion: boolean
  changeVersion: () => void
  chosenCity: Town
  chooseCity: (city: Town) => void
}

const Mobile = ({changeVersion,
                  fullVersion,
                  chosenCity,
                  chooseCity
}: IProps) => {

    const [chosenPeriod, setChosenPeriod] = useState<string[]>([])
    const [firstDay, setFirstDay] = useState<Date>(new Date())
    const [secondDay, setSecondDay] = useState<Date | null>(null)
    const [searchArticle, setSearchActive] = useState<string>('')
    const [showPlug, setShowPlug] = useState(true)
    const [articles] = useState<string[]>([
      '49582305',
      '73582305',
      '13782305'
    ])

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
        setChosenPeriod(dates)

      }, [firstDay, secondDay]
    )

    return (
      <div className="appContainer">
        <Layout
          setFirstDay={setFirstDay}
          setSecondDay={setSecondDay}
          searchArticle={searchArticle}
          onArticleInputChange={onArticleInputChange}
          fullVersion={fullVersion}
          chosenCity={chosenCity}
          chooseCity={chooseCity}
        >
          {showPlug && <FullVersionPlug
            changeVersion={changeVersion}
            hideVersionPlug={hideVersionPlug}/>
          }
          {
            articles.length && (
              <div className="tablesWrapper">
                {articles.filter(article => article.startsWith(searchArticle)).map((article, index) => {
                  return (
                    <Table
                      key={index}
                      chosenPeriod={chosenPeriod}
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