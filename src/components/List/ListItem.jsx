import React from "react";

const ListItem = ({ park = {}, handleChange }) => {

  return (
    <div key={park?.fullName}>
      <input
      onChange={() => handleChange(park) }
      type="checkbox"
      id={park?.fullName}
      name={park?.fullName}
      value="Bike"/>
      <label htmlFor={park?.fullName}>{park?.fullName}</label>
    </div>
  )
}

export default ListItem;
