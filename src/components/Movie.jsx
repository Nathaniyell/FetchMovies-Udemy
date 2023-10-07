import React from 'react'
import styles from './movies.module.css'

const Movie = (props) => {
  const {title, releaseDate,openingText} = props
  return (
<li className={styles.movie}>
  <h2>{title}</h2>
  <h3>{releaseDate}</h3>
  <p>{openingText}</p>
</li>
  )
}

export default Movie