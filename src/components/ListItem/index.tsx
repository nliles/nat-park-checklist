import React from "react";
import { Park } from '../../types'
import Checkbox from "../ui/Checkbox"

type ListItemType = {
  park: Park,
  handleChange: () => void,
  index: number,
  selectedParks: string[]
}

const ListItem = ({ park, handleChange, index = 0, selectedParks }: ListItemType) => {
  console.log(park)
  const { id, fullName } = park
  const label = `${index + 1}. ${fullName}`
  const isSelected = selectedParks.includes(id)
  return (
    <Checkbox checked={isSelected} label={label} handleChange={handleChange} id={id}/>
  )
}

export default ListItem;
