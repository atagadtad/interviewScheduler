export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const DELETE_INTERVIEW = "DELETE_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: {
          ...state.appointments,
          ...(action.appointment
            ? { [action.appointment.id]: action.appointment }
            : {})
        },
        days: action.days
      };
    }
    case DELETE_INTERVIEW: {
      // const appointments = { ...state.appointments };
      // appointments[action.appointment.id].interview = null;

      return {
        // ...state,
        // appointments,
        ...state,
        appointments: {
          ...state.appointments,
          [action.appointment.id]: {
            ...state.appointments[action.appointment.id],
            interview: null
          }
        },
        days: action.days
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
