import React from 'react'
import styles from './edit.module.css'
import Link from 'next/link'

function editmovie() {
  return (
    <form className={styles.form}   >
      <h2  className={styles.title}  >editMovie</h2>
   <label>title</label> 
   <input/>
   <label>description:</label> 
   <input/>
 
  <button  className={styles.btn} > save</button>
 <Link  href={'/'} className={styles.btn_return }  > return </Link> 
    </form>
  )
}

export default editmovie