import React, {useEffect, useState} from 'react'
import styles from './Table.module.scss'
import {useWindowSize} from "../../utils/hooks/useWindowSize";
import KeysTable from "./modules/KeysTable/KeysTable";
import DataTable from "./modules/DataTable/DataTable";

interface ITable{
  chosenPeriod: string[]
  article: string
}

const Table = ({chosenPeriod, article}: ITable) => {

  const [openKeys, setOpenKeys] = useState<string[]>([])

  const onArrowButtonClick = (key: string) => {
    if(openKeys.includes(key)){
      setOpenKeys(openKeys.filter(keyData => keyData !== key))
    } else{
      setOpenKeys([...openKeys, key])
    }
  }

  return (
    <div className={styles.tableWrapper}>
      <KeysTable
        article={article}
        onArrowButtonClick={onArrowButtonClick}
        openKeys={openKeys}/>
      <DataTable
        chosenPeriod={chosenPeriod}
        openKeys={openKeys}/>
    </div>
  )
}

export default Table