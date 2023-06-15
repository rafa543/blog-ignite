import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.contentContainer}>
        <img src="/images/logo.svg" alt="spacetraveling" />
      </div>
    </header>
  )
}
