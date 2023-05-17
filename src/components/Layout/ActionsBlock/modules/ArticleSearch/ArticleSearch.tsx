import React, {ChangeEvent, useState} from 'react'
import styles from './ArticleSearch.module.scss'

const ArticleSearch = () => {

  const [searchArticle, setSearchActive] = useState<string>('')
  const onArticleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchActive(e.target.value)

  return (
    <input
      type="text"
      placeholder="Поиск артикула"
      value={searchArticle}
      className={styles.articleSearchInput}
      onChange={onArticleInputChange}
    />
  )
}

export default ArticleSearch