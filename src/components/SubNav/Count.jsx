import styles from './SubNav.module.scss';

const Count = ({ count, total }) => {
  return (
    <div className={styles.count}>
      <span><strong>{count}</strong> out of {total}</span>
    </div>
  )
}

export default Count
