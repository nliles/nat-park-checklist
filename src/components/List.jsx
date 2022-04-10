import React from "react";
import ListItem from './ListItem'

const List = ({ parks = [] }) => {
  return (
    <div>
      {parks && parks.map(park => (
        <ListItem key={park?.fullName} park={park}/>
        )
      )}
    </div>
  )
}

export default List;
