import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {  // renders the side column with the days, and interview spots available
  let {days} = props;
  const dayItems = days.map(day => {
    return (
      <DayListItem
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    );
  });
  return <ul>{dayItems}</ul>;
}