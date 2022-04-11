import React from "react";
import MapItem from './MapItem'
import styles from './Map.module.css'
import * as d3 from d3

const Map = ({ parks = [] }) => {
  //Width and height of map
  const width = 960;
  const height = 500;

  // D3 Projection
const projection = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US

           // Define path generator
         var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
         		  	 .projection(projection);  // tell path generator to use albersUsa projection

                 // Define linear scale for output
               var color = d3.scale.linear()
               			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

  return (
    <div className={styles.MapContainer}>
    </div>
  )
}

export default Map;
