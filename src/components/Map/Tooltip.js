import styles from './Map.module.scss'

const Tooltip = ({ park }) => {
  const image = park.images[0]
  const statesArr = park.states?.split(',')
  return (
    <foreignObject x="-73" y="0" className={styles.tooltip} width="180px" height="115px">
      <div className={styles.content}>
        <div className={styles.imgContainer}>
        <img src={image.url} alt={image.altText}/>
        </div>
        <div className={styles.text}>
        <h4>{park.fullName}</h4>
        <span>State{statesArr.length > 1 ? 's' : ''}: {park.states}</span>
        </div>
      </div>
    </foreignObject>
  )
}

export default Tooltip
