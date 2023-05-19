import React from 'react'
import styles from './ActionsBlock.module.scss'
import cn from 'classnames'
import PointerIcon from './modules/svg/PointerIcon'
import PlusIcon from './modules/svg/PlusIcon'
import PeriodSelect from './modules/PeriodSelect/PeriodSelect'
import ArticleSearch from './modules/ArticleSearch/ArticleSearch'
import CitySelect from './modules/CitySelect/CitySelect'

interface ActionsBlockPropsType{
  openPVZModal: () => void
  openAddArticleModal: () => void
  setFirstDay: (day: Date) => void
  setSecondDay: (day: Date | null) => void
  searchArticle: string
  onArticleInputChange: (value: string) => void
}

const ActionsBlock = ({
                        openPVZModal,
                        openAddArticleModal,
                        setFirstDay,
                        setSecondDay,
                        searchArticle,
                        onArticleInputChange
}: ActionsBlockPropsType) => {

  return (
    <div className={styles.actionsBlockWrapper}>
      <div className={styles.articleWrapper}>
        <div className={styles.article}>
          <h1>Трекер позиций</h1>
          <p>Отслеживайте позиции товара в поиске по ключевому слову</p>
        </div>
        <ArticleSearch
          searchArticle={searchArticle}
          onArticleInputChange={onArticleInputChange}
        />
      </div>
      <div className={styles.searchSettingsWrapper}>
        <div className={styles.cityBlockWrapper}>
          <CitySelect/>
          <div className={styles.editCityBlock}>
            <PointerIcon onClick={openPVZModal}/>
          </div>
        </div>
        <div className={styles.actionsWrapper}>
          <div className={styles.btnWrapper}>
            <PeriodSelect
              setFirstDay={setFirstDay}
              setSecondDay={setSecondDay}
            />
            <button
              className={cn(styles.btn, styles.addArticle)}
              onClick={openAddArticleModal}
            >
              <PlusIcon/>
              Добавить артикул
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionsBlock