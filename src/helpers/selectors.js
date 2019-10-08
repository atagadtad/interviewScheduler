export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0];

  return (filteredDay && filteredDay.appointments) || [];
}

export function getInterview(state, interviewId) {
  if (interviewId === null) {
    return null;
  }

  const { time, interview } = state.appointments[interviewId];
  return interview
    ? {
        interviewer: state.interviewers[interview.interviewer],
        student: interview.student,
        time
      }
    : {};
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0];
  if (!filteredDay || !filteredDay.appointments) {
    return [];
  }
  const matchedID = filteredDay.interviewers.map(
    apptId => state.interviewers[apptId]
  );
  return matchedID;
}
