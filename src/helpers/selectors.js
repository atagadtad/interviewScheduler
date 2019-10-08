export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)[0];
  // console.log("filteredDay: ", filteredDay);
  if (filteredDay === undefined) {
    return [];
  }
  const appointmentIds = filteredDay.appointments;
  // console.log("apointmentIds: ", appointmentIds);
  const appointments = appointmentIds.map(
    appointment => state.appointments[appointment]
  );
  // console.log("appointments: ", appointments);
  return appointments || [];
}

export function getInterview(state, oneInterview) {
  if (oneInterview === null) {
    return null;
  }
  // console.log(
  //   "state.appointments[oneInterview.id].interview.student: ",
  //   state.appointments[oneInterview.id].interview.student
  // );
  // console.log("oneInterview.id: ", oneInterview.id);
  // console.log(
  //   "state.interviewers[oneInterview.interviwer]: ",
  //   state.interviewers[oneInterview.interviewer]
  // );
  // console.log(
  //   "oneInterview.interview.student: ",
  //   oneInterview.interview.student
  // );
  // console.log("oneInterview.time: ", oneInterview.time);
  console.log("state.");

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
