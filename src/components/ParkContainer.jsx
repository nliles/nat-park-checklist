import React, { useState, useEffect } from "react";
import List from "./List";
import { NPS_API, API_KEY } from "./constants";

const ParkList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getParks()
  }, [])

  const getParks = async () => {
    try {
      const res = await fetch(`${NPS_API}/parks?limit=10&sort=fullName&api_key=${API_KEY}`)
      const json = await res.json()
      setData(json.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>National Parks</h1>
      <List parks={data}/>
    </div>
  )
}

export default ParkList;
