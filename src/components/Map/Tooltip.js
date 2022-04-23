import styles from './Map.module.scss'

const Tooltip = ({ park, x, y }) => {
  const image = park.images[0]
  const statesArr = park.states?.split(',')
  return (
    <foreignObject id={`tooltip-${park.fullName}`} x={x} y={y} className={styles.tooltip} width="180px" height="115px">
      <div className={styles.content}>
        <div className={styles.imgContainer}>
        <img src={image.url} alt={image.altText}/>
        </div>
        <div className={styles.text}>
        <h4><a href={park.url} alt={park.fullName}>{park.fullName}</a></h4>
        <span>State{statesArr.length > 1 ? 's' : ''}: {park.states}</span>
        </div>
      </div>
    </foreignObject>
  )
}

export default Tooltip
