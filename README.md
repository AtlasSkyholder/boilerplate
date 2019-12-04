# Interview Scheduler

Interview Scheduler is a full stack web application built with React and a database language such as PostgreSQL that allows users to schedule interviews. Users can create an appointment, select the hours and days of the week, edit and delete them, also select from a number of provided interviewers.  

## Final Product

!["Main page for the Interview Scheduler app"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_Intro.png?raw=true)

!["Creating an appointment, Create Form"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_create.png?raw=true)

!["Name filled and Interviewer picked"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_fill.png?raw=true)

!["Saving segment appears after saving appointment"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_saving.png?raw=true)

!["New appointment appears and the free spots number decreases"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_created.png?raw=true)

!["Color changes and the Edit and Delete icons appear when mouse hovers over"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_icons.png?raw=true)

!["Edit Form, appears the same and the Create Form"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_edit.png?raw=true)

!["Delete Form, gives the user the option to delete or cancel the decision"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_deleteConfirm.png?raw=true)

!["Deleting segment appears after confirming the choice to delete the appointment"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_deleting.png?raw=true)

!["The spot returns back to being empty, the spots number increases with the appointment deleted"](https://github.com/AtlasSkyholder/scheduler/blob/master/docs/Scheduler_final.png?raw=true)

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-hooks-testing-library
- react-scripts

## Setup

Install dependencies with `npm install`.
For the database API, head to : https://github.com/lighthouse-labs/scheduler-api and follow the instructions on the README.md file for the setup.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
