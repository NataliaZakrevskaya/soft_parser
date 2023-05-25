import React, {useState} from 'react'
import styles from './Table.module.scss'
import KeysTable from "./modules/KeysTable/KeysTable";
import DataTable from "./modules/DataTable/DataTable";
import {keys} from "../../utils/mocks";

interface ITable{
  chosenPeriod: string[]
  article: string
}

const Table = ({chosenPeriod, article}: ITable) => {

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [localKeys, setLocalKeys] = useState<any>(keys.query)

  const addEmptyRow = () => {
    setLocalKeys([...localKeys, {
      key: '',
      data: []
    }])
  }
  const addNewKey = (key: string, index: number) => {
    const newKeyBody = {key, data: []}
    const newArr = [...localKeys.slice(0, index), newKeyBody, ...localKeys.slice(index + 1)];
    setLocalKeys(newArr)
  }
  const deleteNey = (keyIndex: number) => {
    setLocalKeys(localKeys.filter((key: any, index: number) => index !== keyIndex))
  }
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
        openKeys={openKeys}
        addEmptyRow={addEmptyRow}
        localKeys={localKeys}
        addNewKey={addNewKey}
        deleteNey={deleteNey}
      />
      <DataTable
        chosenPeriod={chosenPeriod}
        openKeys={openKeys}
        localKeys={localKeys}
      />
    </div>
  )
}

export default Table