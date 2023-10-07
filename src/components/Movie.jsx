import React from 'react'
import styles from './movies.module.css'

const Movie = (props) => {
  return (
<li className={styles.movie}>
  <h2>{props.title}</h2>
  <h3>{props.releaseDate}</h3>
  <p>{props.openingText}</p>
</li>
  )
}

export default Movie