import React, { useState, useEffect } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import { NPS_API, API_KEY } from "../constants";
import { useParks } from "../hooks"
import styles from './ListContainer.module.scss'
import { groupBy } from 'lodash';

const ListContainer = () => {
  const { parks } = useParks()
    // const [data, setData] = useState([])
  const [selected, setSelected] = useState([])
  //
  // useEffect(() => {
  //   getParks()
  // }, [])
  //
  // const getParks = async () => {
  //   try {
  //     const res = await fetch(`${NPS_API}/parks?limit=2000&sort=fullName&api_key=${API_KEY}`)
  //     const json = await res.json()
  //     setData(json.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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

  const parkKeys = [
    'National Park',
    'National Parks',
    'National Park and Preserve',
    'National Park & Preserve',
    'National and State Parks'
  ]

  const samoa = (parks || []).find(p => p.fullName === "National Park of American Samoa")
  const test = groupBy(parks, 'designation')
  let newArr = []
  for (let i in test) {
    if (parkKeys.includes(i)) {
      newArr = newArr.concat(test[i])
    }
  }
  if (samoa) {
    newArr.push(samoa)
  }

  return (
    <div className={styles.container}>
    <nav className={styles.nav}>
      <h1 className={styles.header}>National Parks</h1>
    </nav>
      <Map data={newArr || []} selected={selected}/>
      <List parks={newArr || []} count={selected.length} handleChange={handleSelected} />
    </div>
  )
}

export default ListContainer;
