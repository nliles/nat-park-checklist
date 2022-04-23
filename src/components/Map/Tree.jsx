import styles from './Map.module.scss'

const TreeIcon = ({ isSelected }) => {
  const fill = isSelected ? "#4b5e26" : "#A8C686";
  return (
    <svg stroke="#4b5e26" strokeWidth="35" width="40px" height="40px" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} d="m557.57 1057-395.15 2.4258 436.36-1059.4 438.79 1059.4-395.15-2.4258v143.03h-84.852z" fillRule="evenodd"/>
    </svg>
  )
}

const Tree = ({ coords, park, isSelected, handleMouseOver, handleMouseLeave, number }) => {
  const x = coords?.[0] - 20 // subtract half the height
  const y = coords?.[1] - 40 // subtract full height
  return (
    <svg key={park.id} x={x} y={y} className={styles.icon}
      onMouseEnter={(e) => handleMouseOver(e, park)}
      onMouseLeave={() => handleMouseLeave()}>
       <TreeIcon isSelected={isSelected} />
       <a className={styles.number}  href={park.url} alt={park.fullName}>
        <text x="20" y="25" textAnchor="middle">
          {number}
        </text>
      </a>
    </svg>
  )
}

export default Tree
