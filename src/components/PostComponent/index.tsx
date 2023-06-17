import styles from './post.module.scss'
import { FiCalendar } from 'react-icons/fi'
import { FiUser } from 'react-icons/fi'

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

export default function PostComponent({ post }) {
  return (
    <div className={styles.postContainer}>
      <h1>{post.data.title}</h1>
      <p>{post.data.subtitle}</p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <FiCalendar color='#BBBBBB' />
          <span>{post.first_publication_date}</span>
        </div>
        <div className={styles.infoItem}>
          <FiUser color='#BBBBBB' />
          <span>{post.data.author}</span>
        </div>
      </div>
    </div>
  )
}
