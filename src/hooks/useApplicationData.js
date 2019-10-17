import { useReducer, useEffect } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  DELETE_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get(`https://scheduler-dashboard.herokuapp.com/api/days`),
      axios.get(`https://scheduler-dashboard.herokuapp.com/api/appointments`),
      axios.get(`https://scheduler-dashboard.herokuapp.com/api/interviewers`)
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
      let spots = day.appointments.filter(
        appointmentId => appointments[appointmentId].interview
      );
      return {
        ...day,
        spots: 5 - spots.length
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

    return axios
      .delete(`http://localhost:8001/api/appointments/${appointmentId}`, {
        interview
      })
      .then(res => {
        console.log(".then check:", "oh hai");
        const appointments = {
          ...state.appointments,
          [appointmentId]: {
            ...state.appointments[appointmentId],
            interview: null
          }
        };

        dispatch({
          type: DELETE_INTERVIEW,
          days: updatedDays(appointments),
          appointment
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
