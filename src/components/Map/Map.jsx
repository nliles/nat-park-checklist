import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import statesInfo from './us';
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";
import { geoAlbersUsa, geoPath } from 'd3-geo'
import Tree from './Tree'
import geoAlbersUsaTerritories from "geo-albers-usa-territories";
import styles from './Map.module.css'

export const Map = ({ data = [], seletedData = []}) => {
    const newData = topojson.feature(statesInfo, statesInfo.objects.collection).features

    //Width and height of maps
    const width = 960;
    const height = 500;

    console.log(statesInfo)

    const projection = geoAlbersUsa().translate([width/2, height/2]).scale(1000);          // scale things down so see entire US
    const pathGenerator = geoPath().projection(projection);

    const parks = data.map((d, i) => {
      const cords = projection([d.longitude, d.latitude])
      const y = cords?.[0]
      const x = cords?.[1]
      return (
        <image x={y} y={x} width="50" height="50" href="./tree.png">
        </image>
       )
    })

    const states = newData.map((d) => <path
       key={d.properties?.name}
       d={pathGenerator(d)}
       className={styles.state}
       />
     )

    return (
      <>
      <Tree />
      <svg width={960} height={500}>
        {states}
        {parks}
      </svg>
      </>
    )

}

export default Map;
