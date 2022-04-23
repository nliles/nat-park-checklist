import React from "react";
import { useWindowResize } from "../../hooks"
import usMapData from './us';
import { geoPath } from 'd3-geo'
import Tree from './Tree'
import Tooltip from './Tooltip'
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";
import styles from './Map.module.scss'

export const Map = ({ data = [], selected = []}) => {
    const [width, height] = useWindowResize();
    const usData = topojson.feature(usMapData, usMapData.objects.states);

    const projection = geoAlbersUsaTerritories().fitSize([width - 50, height - 50], usData);         // scale things down so see entire US
    const pathGenerator = geoPath().projection(projection);

    const handleOnMouseOver = (e, name) => {
      const tooltip = document.getElementById(`tooltip-${name}`);
      tooltip.classList.add(styles.show);
    }

    const handleOnMouseOut = (e, name) => {
      const tooltip = document.getElementById(`tooltip-${name}`);
      tooltip.classList.remove(styles.show);
    }

    const states = usData.features.map((d) => <path
       key={d.properties?.name}
       d={pathGenerator(d)}
       className={styles.state}
       />
     )

    const parks = data.map((d, i) => {
      const isSelected = selected.find(s => s.id === d.id)
      const cords = projection([d.longitude, d.latitude])
      const height = 40
      const x = cords?.[0] - (height / 2)
      const y = cords?.[1] - (height)
      return (
      <svg key={d.id} x={x} y={y} className={styles.test} onMouseEnter={e => handleOnMouseOver(e, d.fullName)} onMouseLeave={(e) => handleOnMouseOut(e, d.fullName)}>
        <g height="40" width="40" className={styles.icon}>
         <Tree isSelected={isSelected} />
         <text x={i < 10 ? "16" : "13"} y="25" fill="white" className={styles.text}>{i + 1}</text>
        </g>
      </svg>
       )
    })

    const tooltips = data.map((d, i) => {
      const cords = projection([d.longitude, d.latitude])
      const x = cords?.[0] - 90 // x - half tooltip width to center
      const y = cords?.[1] - 25
      return (
         <Tooltip key={d.id} park={d} x={x} y={y}/>
       )
    })

    return (
      <div className={styles.mapContainer}>
        <svg width={width} height={height}>
          {states}
          {parks}
          {tooltips}
        </svg>
      </div>
    )

}

export default Map;
