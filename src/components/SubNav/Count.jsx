import styles from './SubNav.module.scss';

const Count = ({ count, total, totalSelected }) => {
  return (
    <div className={styles.count}>
      <span><strong>{totalSelected}</strong> out of {total}</span>
    </div>
  )
}

export default Count
