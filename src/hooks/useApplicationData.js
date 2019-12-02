import { useReducer, useEffect } from "react";
import axios from "axios";
/* import spotsCounter from "helpers/spotsCounter"; */

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function spotsCounter(updatedAppointments) {
    let arr = [];
    let count = 0;
    let counter = 0;
    for (let appointment of Object.values(updatedAppointments)) {
      if (!appointment.interview) {
        count++;
      }
      counter++;
      if (counter === 5) {
        arr.push(count);
        count = 0;
        counter = 0;
      }
    }
    return arr;
  }

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        const appointment = { ...state.appointments[action.id], interview: { ...action.interview }};
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        const arr = spotsCounter(appointments);          
        for (let i in arr) {
          state.days[i].spots = arr[i];
        }

        return { ...state, appointments}            
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
    const daysData = axios.get("/api/days");
    const appointmentsData = axios.get("/api/appointments");
    const interviewersData = axios.get("/api/interviewers");
    Promise.all([daysData, appointmentsData, interviewersData])
    .then(all => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  },[]);

  function bookInterview(id, interview, edit = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, id: id, interview: interview})
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({type: SET_INTERVIEW, id: id, interview: null})
    });
  }

  return { state, setDay, bookInterview, cancelInterview };

}