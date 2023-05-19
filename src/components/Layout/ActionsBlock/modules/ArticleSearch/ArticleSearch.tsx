import React, {ChangeEvent} from 'react'
import styles from './ArticleSearch.module.scss'

interface IArticleProps{
  searchArticle: string
  onArticleInputChange: (value: string) => void
}

const ArticleSearch = ({searchArticle, onArticleInputChange}: IArticleProps) => {

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onArticleInputChange(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Поиск артикула"
      value={searchArticle}
      className={styles.articleSearchInput}
      onChange={onInputChange}
    />
  )
}

export default ArticleSearch