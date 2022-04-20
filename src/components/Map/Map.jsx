import React from "react";
import cn from 'classnames'
import usMapData from './us';
import { geoPath } from 'd3-geo'
import Tree from './Tree'
import Tooltip from './Tooltip'
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";
import styles from './Map.module.scss'

export const Map = ({ data = [], selected = []}) => {
    const usData = topojson.feature(usMapData, usMapData.objects.states)

    //Width and height of maps
    const width = 1200;
    const height = 750;

    const projection = geoAlbersUsaTerritories().translate([width/2, height/2]).scale(1500);          // scale things down so see entire US
    const pathGenerator = geoPath().projection(projection);

    const parks = data.map((d, i) => {
      const isSelected = selected.find(s => s.id === d.id)
      const cords = projection([d.longitude, d.latitude])
      const height = 35
      const x = cords?.[0] - (height / 2)
      const y = cords?.[1] - (height)
      return (
        <g key={d.id} height="35" width="35" className={styles.group} transform={`translate(${x} ${y})`}>
          <g className={styles.icon}>
           <Tree isSelected={isSelected}/>
           <text x={i < 10 ? "13.5" : "10.5"} y="25" fill="white" className={styles.text}>{i + 1}</text>
          </g>
          <Tooltip park={d} />
        </g>
       )
    })

    const states = usData.features.map((d) => <path
       key={d.properties?.name}
       d={pathGenerator(d)}
       className={styles.state}
       />
     )

    return (
      <div className={styles.mapContainer}>
        <svg width={width} height={height}>
          {states}
          {parks}
        </svg>
      </div>
    )

}

export default Map;
