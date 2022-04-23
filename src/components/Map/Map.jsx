import React, { useState } from "react";
import { useWindowResize } from "../../hooks"
import usMapData from './us';
import { geoPath } from 'd3-geo'
import Tree from './Tree'
import Tooltip from './Tooltip'
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";
import styles from './Map.module.scss'

const Map = ({ parks = [], selected = []}) => {
    const [tooltipContent, setTooltipContent] = useState(null);
    const [width, height] = useWindowResize();
    const usData = topojson.feature(usMapData, usMapData.objects.states);

    const projection = geoAlbersUsaTerritories().fitSize([width, height], usData);         // scale things down so see entire US
    const pathGenerator = geoPath().projection(projection);

    const handleMouseOverPark = (e, park) => {
      setTooltipContent(park);
    }

    const handleMouseLeavePark = () => {
      setTooltipContent(null)
    }

    const states = usData.features.map((d) => <path
       key={d.properties?.name}
       d={pathGenerator(d)}
       className={styles.state}
       />
     )

    const natParks = parks.map((p, i) => (
        <Tree
        key={p.fullName}
        coords={projection([p.longitude, p.latitude])}
        isSelected={selected.includes(p.id)}
        park={p}
        handleMouseOver={handleMouseOverPark}
        handleMouseLeave={handleMouseLeavePark}
        number={i + 1} />
    ))

    return (
      <div className={styles.mapContainer}>
        <svg width={width} height={height}>
          {states}
          {natParks}
          {tooltipContent && <Tooltip park={tooltipContent} coords={projection([tooltipContent.longitude, tooltipContent.latitude])}/>}
        </svg>
      </div>
    )
}

export default Map
