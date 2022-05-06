import React, { useState } from "react";
import ParkView from "../ParkView/ParkView"
import { useParks } from "../../hooks";
import { groupBy } from 'lodash'
import { PARK_DESIGNATION_KEY } from "../../constants";

const ParkContainer = () => {
  const [selectedListItem, setSelectedListItem] = useState(PARK_DESIGNATION_KEY.NAT_PARK)
  const [selected, setSelected] = useState([])
  const { loading, parks } = useParks(selectedListItem)
  // const found = groupBy(parks, 'designation')['National Recreation Area']
  // console.log(parks?.filter(p => p.fullName.includes("Chelan")))

  const handleListItemChange = (item) => {
    setSelectedListItem(item)
  }

  const handleSelected = (parkId) => {
    const isSelected = selected.includes(parkId)
    const newItems = [...selected]
    if (isSelected) {
      const index = selected.indexOf(parkId)
      newItems.splice(index, 1);
      setSelected(newItems);
    } else {
      newItems.push(parkId)
      setSelected(newItems);
    }
  }

  return (
    <ParkView loading={loading} selected={selected} selectedListItem={selectedListItem} parks={parks} handleSelected={handleSelected} handleListItemChange={handleListItemChange}/>
  )
}

export default ParkContainer;
