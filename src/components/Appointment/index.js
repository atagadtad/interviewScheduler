import React, { Fragment } from "react";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "./styles.scss";

export default function Appointment(props) {
  return (
    <Fragment>
      <Header />
      {props.interview ? <Show interviewer={props.interview.interviewer.name} student={props.interview.student} /> : <Empty />}

    </Fragment>
  )
}