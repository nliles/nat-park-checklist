import React from "react";
import Checkbox from "../ui/Checkbox"

const ListItem = ({ park = {}, handleChange, index = 0, selected }) => {
  const { id, fullName } = park
  const label = `${index + 1}. ${fullName}`
  const isSelected = selected.includes(id)
  return (
    <Checkbox checked={isSelected} label={label} handleChange={handleChange} id={id}/>
  )
}

export default ListItem;
