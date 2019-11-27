import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item',{'day-list__item--selected': props.selected}, {'day-list__item--full': props.spots === 0});
  let text = '';
  const formatSpots = function (spot) {
    if (spot === 0) {
      text = 'no spots remaining';
    } else if (spot === 1) {
      text = '1 spot remaining';
    } else if (spot >= 2) {
      text = '2 spots remaining';
    }
  }
  formatSpots(props.spots);
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{text}</h3>
    </li>
  );
}
