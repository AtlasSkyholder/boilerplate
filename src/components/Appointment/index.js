import React from 'react';

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import "components/Appointment/styles.scss";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(    // calls in function useVisualMode from hooks/useApplicationData.js to control history
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {    // function to update name and interviewer when creating or editing an appointment
    if (interviewer !== null && name !== "") {
      const interview = {
        student: name,
        interviewer
      };
      if (mode === EDIT) {  // section that edits the appointment
        transition(SAVING, true);
        props.bookInterview(props.id, interview, true)
          .then(() => transition(SHOW))
          .catch(error => {transition(ERROR_SAVE, true)});
      } else {
        transition(SAVING, true);  // section to create the appointment
        props.bookInterview(props.id, interview)
          .then(() => transition(SHOW))
          .catch(error => transition(ERROR_SAVE, true));
      }
    } else {
      transition(ERROR_SAVE, true);
    }
  };

  function confirmDeletion() {  // confirms deletion of interview
    transition(CONFIRM);
  }

  function deleteInterview(id) {  // function that calls cancelInterview from hooks/useApplicationData.js
    transition(DELETING, true)
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => 
      {transition(ERROR_DELETE, true)});
  }
    // Whenever function Appointment is called, mode is changed according to the needs
  return (
    <article data-testid="appointment" className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name || null}
        confirmDeletion={() => confirmDeletion()}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={back}
        onSave={(name,interviewer) => save(name, interviewer)}
      />
    )}
    {mode === CONFIRM && (
      <Confirm 
        message={"Confirm to delete this appointment."}
        onConfirm={() => deleteInterview(props.id)}
        onCancel={() => transition(SHOW)}
      />
    )}
    {mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={(name, interviewer) => save(name, interviewer)}
      />
    )}
    {mode === SAVING && (<Status message={SAVING}/>)}
    {mode === DELETING && (<Status message={DELETING}/>)}
    {mode === ERROR_SAVE && (<Error message={"Could not save the appointment."} onClose={back}/>)}
    {mode === ERROR_DELETE && (<Error message={"Could not delete the appointment."} onClose={back}/>)}
  </article>
  );
}
