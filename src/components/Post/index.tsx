import styles from './post.module.scss'
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'

export default function Post() {
  return (
    <div className={styles.postContainer}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>
        <div className={styles.info}>
            <div className={styles.infoItem}>
                <FiCalendar color='#BBBBBB' />
                <span>15 Mar 2021</span>
            </div>
            <div className={styles.infoItem}>
                <FiUser color='#BBBBBB' />
                <span>Danilo Vieira</span>
            </div>
        </div>
    </div>
  )
}
