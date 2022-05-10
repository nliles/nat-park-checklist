import React, { useState, useEffect } from "react";
import ParkView from "../ParkView/ParkView"
import { useParks } from "../../hooks";
import { PARK_DESIGNATION_KEY } from "../../constants";
import { loadState, saveState } from "../../storage/sessionStorage"

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(PARK_DESIGNATION_KEY.NAT_PARK)
  const [selected, setSelected] = useState([])
  const { loading, parks } = useParks(selectedDropdownItem)

  useEffect(() => {
    const stored = loadState() || []
    setSelected(stored)
  }, [])

  const saveToStorage = () => {
    saveState(selected)
  }

  const handleListItemChange = (item) => {
    setSelectedDropdownItem(item)
    saveToStorage()
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
    <ParkView loading={loading} selected={selected} selectedDropdownItem={selectedDropdownItem} parks={parks} handleSelected={handleSelected} handleListItemChange={handleListItemChange}/>
  )
}

export default ParkContainer;
