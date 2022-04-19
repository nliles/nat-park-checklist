import React from "react";
import usMapData from './us';
import { geoPath } from 'd3-geo'
import Tree from './Tree'
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
      const x = cords?.[0] - 17.5
      const y = cords?.[1] - 35
      return (
        <Tree key={d.id} x={x} y={y} isSelected={isSelected}/>
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
