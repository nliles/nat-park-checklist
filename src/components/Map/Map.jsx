import React from "react";
import usMapData from './us';
import { geoAlbersUsa, geoPath } from 'd3-geo'
import Tree from './Tree'
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";
import styles from './Map.module.css'

export const Map = ({ data = [], seletedData = []}) => {

    const usData = topojson.feature(usMapData, usMapData.objects.states)

    //Width and height of maps
    const width = 960;
    const height = 530;

    const projection = geoAlbersUsaTerritories().translate([width/2, height/2]).scale(1000);          // scale things down so see entire US
    const pathGenerator = geoPath().projection(projection);

    const parks = data.map((d, i) => {
      const cords = projection([d.longitude, d.latitude])
      const x = cords?.[1]
      const y = cords?.[0]
      return (
        <image key={d.id} x={y} y={x} width="50" height="50" href="./tree.png">
        </image>
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