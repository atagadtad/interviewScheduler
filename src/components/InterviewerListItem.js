

import React from "react";

import "components/InterviewerListItem.scss"

const classNames = require('classnames');


export default function InterviewerListItem(props) {

  let interviewer = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  })

  return (
    <li className={interviewer}
      onClick={props.setInterviewer}
      selected={props.selected}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li >
  )
}


// import React from "react";

// import './InterviewerListItem.scss';

// const classNames = require('classnames');

// export default function InterviewerListItem({ id, name, avatar, selected, setInterviewer }) {
//   let interviewerListClass = classNames("interviewers__item", {
//     "interviewers__item--selected": selected,
//   })
//   return (
//     <li
//       className={interviewerListClass}
//       onClick={setInterviewer}
//       selected={selected}>
//       <img
//         className="interviewers__item-image"
//         src={avatar}
//         alt={id}
//       />
//       {selected && name}
//     </li>
//   );
// }