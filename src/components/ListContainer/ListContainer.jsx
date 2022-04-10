import React, { useState, useEffect } from "react";
import List from "../List/List";
import { NPS_API, API_KEY } from "../constants";
import styles from './ListContainer.module.css'

const ListContainer = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    getParks()
  }, [])

  const getParks = async () => {
    try {
      const res = await fetch(`${NPS_API}/parks?limit=30&sort=fullName&api_key=${API_KEY}`)
      const json = await res.json()
      setData(json.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSelected = (park) => {
    const isSelected = selected.find(s => s.id === park.id)
    const newItems = [...selected]
    if (isSelected) {
      const index = selected.findIndex(s => s.id === park.id);
      newItems.splice(index, 1);
      setSelected(newItems);
    } else {
      newItems.push(park)
      setSelected(newItems);
    }
  }

  return (
    <div className={styles.container}>
    <nav>
      <header>National Parks</header>
    </nav>
      <List parks={data} handleChange={handleSelected} />
    </div>
  )
}

export default ListContainer;
