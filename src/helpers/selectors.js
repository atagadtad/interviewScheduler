export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0];
  if (!filteredDay || !filteredDay.appointments) {
    return [];
  }
  const matchedID = filteredDay.appointments.map(
    apptId => state.appointments[apptId]
  );
  return matchedID;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const id = interview.interviewer;
  const result = {
    student: interview.student,
    interviewer: state.interviewers[id]
  };

  return result;
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
