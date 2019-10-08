import { useReducer, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
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
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  function updatedDays(appointments) {
    return state.days.map(day => {
      let result = 0;
      day.appointments.forEach(appointmentId => {
        if (
          appointments[appointmentId] &&
          appointments[appointmentId].interview === null
        ) {
          result += 1;
        }
      });
      return {
        ...day,
        spots: result
      };
    });
  }

  function bookInterview(appointmentId, interview, method) {
    const appointment = {
      ...state.appointments[appointmentId],
      id: appointmentId,
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${appointmentId}`, {
        interview
      })
      .then(res => {
        dispatch({
          type: SET_INTERVIEW,
          days: updatedDays(appointments),
          appointment
        });
      });
  }

  function cancelInterview(appointmentId, interview) {
    const appointment = {
      ...state.appointments[appointmentId],
      id: appointmentId,
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${appointmentId}`, {
        interview
      })
      .then(res => {
        dispatch({
          type: SET_INTERVIEW,
          days: updatedDays(appointments),
          appointment
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
