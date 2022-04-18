import React from "react";

const ListItem = ({ park = {}, handleChange, index = 0 }) => {
  return (
    <div key={park?.fullName}>
      <input
      onChange={() => handleChange(park) }
      type="checkbox"
      id={park?.fullName}
      name={park?.fullName}
      value="Bike"/>
      <span>{index + 1}.</span>
      <label htmlFor={park?.fullName}>{park?.fullName}</label>
    </div>
  )
}

export default ListItem;
