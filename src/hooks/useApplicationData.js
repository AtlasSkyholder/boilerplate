import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS_REMAINING
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
    const daysData = axios.get("/api/days");
    const appointmentsData = axios.get("/api/appointments");
    const interviewersData = axios.get("/api/interviewers");
    Promise.all([daysData, appointmentsData, interviewersData])
    .then(all => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  },[]);

  function bookInterview(id, interview, edit = false) {
    const selectedDay = state.days[Math.floor(id / 5)];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      if (edit === false) {
        dispatch({type: SET_SPOTS_REMAINING, id: id, spots: selectedDay.spots - 1 });
      }
      dispatch({type: SET_INTERVIEW, id: id, interview: interview})
    });
  }

  function cancelInterview(id) {
    const selectedDay = state.days[Math.floor(id / 5)];
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({type: SET_SPOTS_REMAINING, id: id, spots: selectedDay.spots + 1 });
      dispatch({type: SET_INTERVIEW, id: id, interview: null})
    });
  }

  return { state, setDay, bookInterview, cancelInterview };

}