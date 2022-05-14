import TreeIcon from "../../Icons/TreeIcon"
import { Park } from '../../../types'
import styles from '../index.module.scss'

type MapMarkerType = {
  coords: number[],
  park: Park,
  isSelected: boolean,
  handleMouseOver: (e: any, park: Park) => void,
  handleMouseLeave: () => void,
  number: number
}

const MapMarker = ({ coords, park, isSelected, handleMouseOver, handleMouseLeave, number }: MapMarkerType) => {
  const x = coords?.[0] - 20 // subtract half the height
  const y = coords?.[1] - 40 // subtract full height
  const fill = isSelected ? "#4b5e26" : "#A8C686";
  return (
  <>
    <svg x={x} y={y} className={styles.icon}
      onMouseEnter={(e) => handleMouseOver(e, park)}
      onMouseLeave={() => handleMouseLeave()}>
       <TreeIcon fill={fill} />
       <a className={styles.number}  href={park.url}>
        <text x="20" y="25" textAnchor="middle">
          {number}
        </text>
      </a>
    </svg>
    {coords &&
      <circle className={styles.circle} r="2" cx={coords[0]} cy={coords[1]}/>
    }
  </>
  )
}

export default MapMarker
