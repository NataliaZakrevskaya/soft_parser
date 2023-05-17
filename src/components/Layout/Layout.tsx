import Header from './Header/Header'
import styles from './Layout.module.scss'
import ActionsBlock from './ActionsBlock/ActionsBlock'

interface LayoutPropsType{
  openPVZModal: () => void
  openAddArticleModal: () => void
  setFirstDay: (day: Date) => void
  setSecondDay: (day: Date | null) => void
  children: any
}

export const Layout = ({openPVZModal, openAddArticleModal, setFirstDay, setSecondDay, children}: LayoutPropsType) => {
  return (
    <div className={styles.page}>
      <Header/>
      <ActionsBlock
        openPVZModal={openPVZModal}
        openAddArticleModal={openAddArticleModal}
        setFirstDay={setFirstDay}
        setSecondDay={setSecondDay}
      />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
