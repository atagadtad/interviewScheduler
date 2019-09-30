import React from "react";

import InterviewerListItem from "components/InterviewerListItem";

import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.name === props.name}
        setInterviewer={props.setInterviewer} />
    );
  });

  return <section className="interviewers">
    <h4 className="interviewers__header text--light">{props.name}</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>;

}