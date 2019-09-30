import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');


export default function DayListItem(props) {

  const formatSpots = (props) => {
    return props === 0 ? 'no spots remaining' : props === 1 ? props + ' spot remaining' : props + ' spots remaining'
  }

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  return (
    <li className={dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
