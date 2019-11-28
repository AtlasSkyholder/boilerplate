export function getAppointmentsForDay(state, day) {
  const days = state.days;                  
  const appointments = state.appointments;  
  if (days.length === 0) {
    return []
  }

  for (let i = 0; i < days.length; i++) { 
    if (days[i].name === day) { 
      let appointmentsArray = [];
      let daysArray = days[i].appointments;
      for (let j = 0; j < daysArray.length; j++) {
        let keysArray = Object.keys(appointments);
        let singleDay = daysArray[j].toString();
        if (keysArray.includes(singleDay)) {
          appointmentsArray.push(appointments[singleDay]);
        }
      }
      return appointmentsArray;
    }
  }
  return [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    let result = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return result;
  }
}