export function getAppointmentsForDay(state, day) {  // obtains the data for appointments for each day
  const results = [];
  const dayObject = Object.values(state.days).filter((dayItem) => {
    return dayItem.name === day;
  })[0];
  if (dayObject === undefined) {
    return results;
  }
  dayObject.appointments.forEach((id) => {
    results.push(state.appointments[id.toString()]);
  });
  return results;
}

export function getInterview(state, interview) {  // obtains the data for the interview
  if (interview === null) {
    return null;
  } else {
    const interviewObj = {};
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interview.interviewer];
    return interviewObj;
  }
}

export function getInterviewersForDay(state, day) {  // obtains the data for available interviewers for each day
  const results = [];
  const dayObject = Object.values(state.days).filter((dayItem) => {
    return dayItem.name === day;
  })[0];
  if (dayObject === undefined) {
    return results;
  }
  dayObject.interviewers.forEach((id) => {
    results.push(state.interviewers[id]);
  })

  return results;
}