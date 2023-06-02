import React, {useContext, useEffect, useState} from 'react'
import styles from './Table.module.scss'
import KeysTable from "./modules/KeysTable/KeysTable";
import {Article, Key} from "@api/statistics/types";
import DataTable from "@components/Table/modules/DataTable/DataTable";
import {PeriodContext} from "../../App";
import {PeriodContextType} from "../../types";

interface ITable{
  article: Article
}

const Table = ({article}: ITable) => {

  const {chosenPeriod} = useContext(PeriodContext) as PeriodContextType

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [localKeys, setLocalKeys] = useState<Key[]>(article.keys)
  const [emptyPlace, setEmptyPlace] = useState<boolean>(false)
  const addEmptyRow = () => {
    setLocalKeys([...localKeys, {
      _id: '',
      key: '',
      pwz: [],
      average: []
    }])
  }

  useEffect(() => {
    setLocalKeys(article.keys)
  }, [chosenPeriod, article])
  useEffect(() => {

    const dataWidth = localKeys[0].pwz[0].position.length * 120
    const containerWidth = window.document.body.offsetWidth * 0.8 - 432
    setEmptyPlace(containerWidth - dataWidth > 0)
  }, [localKeys])

  const onArrowButtonClick = (key: string) => {
    if(key){
      if(openKeys.includes(key)){
        setOpenKeys(openKeys.filter(keyData => keyData !== key))
      } else{
        setOpenKeys([...openKeys, key])
      }
    }
  }

  return (
    <div className={styles.tableWrapper}>
      <KeysTable
        article={article}
        onArrowButtonClick={onArrowButtonClick}
        openKeys={openKeys}
        addEmptyRow={addEmptyRow}
        localKeys={localKeys}
        emptyPlace={emptyPlace}
      />
      <DataTable
        openKeys={openKeys}
        localKeys={localKeys}
        emptyPlace={emptyPlace}
      />
    </div>
  )
}

export default Table