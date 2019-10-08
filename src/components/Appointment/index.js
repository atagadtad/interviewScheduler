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
    props.interview === null ? EMPTY : SHOW
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

  function interviewDetail(detail = "") {
    console.log("huh", props.time, props.interview);
    return props.interview && detail.length > 0 && props.interview[detail];
  }

  // console.log("component", props);
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          interviewer={
            (interviewDetail("interviewer") || { name: "Unnamed Interviewer" })
              .name
          }
          student={interviewDetail("student")}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interviewDetail("student")}
          interviewer={interviewDetail("id")}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
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
