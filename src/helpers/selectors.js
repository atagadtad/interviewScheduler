export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0];
  if (filteredDay === undefined) {
    return [];
  }
  const appointmentIds = filteredDay.appointments;
  const appointments = appointmentIds.map(
    appointment => state.appointments[appointment]
  );
  return appointments || [];
}

export function getInterview(state, oneInterview) {
  if (oneInterview === null) {
    return null;
  }
  return oneInterview
    ? {
        interviewer: state.interviewers[oneInterview.interviewer],
        student: oneInterview.student
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
