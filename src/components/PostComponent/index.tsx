import styles from './post.module.scss'
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'

interface PostTeste {
    uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

export default function PostComponent(teste: PostTeste) {

  console.log(teste)
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
