import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview}  from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  });

  const setDay = function(day){
    setState(prev => {
      return{
        ...prev,
        day: day
      }
    })
  }

  const day = state.day;
  const days = state.days;

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      setState(prev => {
        return({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        })
      })
    });
  }, []);

  const appointmentObj = getAppointmentsForDay(state, state.day);

  const appointmentComponents = appointmentObj.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList 
          days={days}
          day={day}
          setDay={setDay}
        /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponents}
        <Appointment key="last" id="last" time="6pm" />

      </section>
    </main>
  );
}
