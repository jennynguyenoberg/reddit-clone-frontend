import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Reddit</h1>
      <div className={styles.headerActions}>
        <button>Sign up</button>
        <button>Sign in</button>
      </div>
    </div>
  )
}

export default Header