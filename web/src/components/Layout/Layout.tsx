import styles from './Layout.module.scss'
import ActionsBlock from './ActionsBlock/ActionsBlock'
import {Header} from './Header/Header'
import {Sidebar} from './Sidebar/Sidebar'

interface LayoutPropsType{
  openPVZModal?: () => void
  openAddArticleModal?: () => void
  setFirstDay: (day: Date) => void
  setSecondDay: (day: Date | null) => void
  children: any
  searchArticle?: string
  onArticleInputChange?: (value: string) => void
  fullVersion: boolean
}

export const Layout = ({
                         openPVZModal,
                         openAddArticleModal,
                         setFirstDay,
                         setSecondDay,
                         children,
                         searchArticle,
                         onArticleInputChange,
                         fullVersion
                       }: LayoutPropsType) => {
  return (
    <div className={styles.page}>
      <div className={styles.overlay}></div>

      <Sidebar />
      <Header/>
      <ActionsBlock
        openPVZModal={openPVZModal}
        openAddArticleModal={openAddArticleModal}
        setFirstDay={setFirstDay}
        setSecondDay={setSecondDay}
        searchArticle={searchArticle}
        onArticleInputChange={onArticleInputChange}
      />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
