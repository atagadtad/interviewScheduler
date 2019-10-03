import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETING = "DELETING";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleting() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true));
  }

  function interviewerName() {
    let interviewerName;
    if (props.interview !== null) {
      interviewerName = props.interview.interviewer.name;
    }
    return interviewerName;
  }

  function interviewerID() {
    let interviewerID;
    if (props.interview !== null) {
      interviewerID = props.interview.interviewer.id;
    }

    return interviewerID;
  }

  function studentName() {
    let nameOfStudent;
    if (props.interview !== null) {
      nameOfStudent = props.interview.student;
    }
    return nameOfStudent;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          interviewer={interviewerName()}
          student={studentName()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={studentName()}
          interviewer={interviewerID()}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && (
        <Error
          onClose={() => back()}
          message="Couldn't save. Please try again!"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => back()}
          message="Couldn't Delete. Please try again!"
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"You sure? You can't go back 😢"}
          onCancel={() => back()}
          onConfirm={deleting}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      )}{" "}
    </article>
  );
}
