import React, { createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Appointment from './Components/Appointment/Appointment';
import { useState } from 'react';
import Login from './Components/Login/Login';
import DashboardMain from './Components/Dashboard/DashboardMain/DashboardMain';
import Patients from './Components/Dashboard/Patients/Patients';
import Prescriptions from './Components/Dashboard/Prescriptions/Prescriptions';
import AllAppointments from './Components/Dashboard/AllAppointments/AllAppointments';
import MyAppointments from './Components/Dashboard/MyAppointments/MyAppointments';
import PrivetRoute from './Components/PrivetRoute/PrivetRoute';
import AddDoctor from './Components/Dashboard/AddDoctor/AddDoctor';
import AddAdmin from './Components/Dashboard/AddAdmin/AddAdmin';
import NotFound from './Components/NotFound/NotFound';
import jwt_decode from "jwt-decode";


export const UserContext = createContext();

function App() {

  const token = sessionStorage.getItem('token');
  const decoded = token && jwt_decode(token);

  const [userState, setUserState] = useState({
    date: new Date(),
    name: decoded && decoded.name || '',
    email: decoded && decoded.email || '',
    isEmailVerified: decoded && decoded.email_verified || null,
    specialistOn: ''
  })

  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('https://sleepy-ridge-24187.herokuapp.com/admins')
      .then(res => res.json())
      .then(data => {
        const admin = data.filter(data => data.email == userState.email);
        admin.length > 0 && setIsAdmin(true);
      })
  }, [userState.email])

  useEffect(() => {
    fetch('https://sleepy-ridge-24187.herokuapp.com/doctorsEmail')
      .then(res => res.json())
      .then(data => {
        const doctor = data.find(data => data.email == userState.email);
        doctor && setIsDoctor(true);
      })
  }, [userState.email])

  return (
    <UserContext.Provider value={[userState, setUserState, isDoctor, setIsDoctor, isAdmin, setIsAdmin]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path='/getAppointment'>
            <Appointment />
          </Route>
          {isAdmin || isDoctor ?
            <PrivetRoute path='/dashboard'>
              <DashboardMain />
            </PrivetRoute> :
            null
          }
          <PrivetRoute path='/myAppointments'>
            <MyAppointments />
          </PrivetRoute>
          <PrivetRoute path='/appointment'>
            <AllAppointments />
          </PrivetRoute>
          <PrivetRoute path='/patients'>
            <Patients />
          </PrivetRoute>
          <PrivetRoute path='/prescription'>
            <Prescriptions />
          </PrivetRoute>
          <PrivetRoute path='/addDoctor'>
            <AddDoctor/>
          </PrivetRoute>
          <PrivetRoute path='/addAdmin'>
            <AddAdmin/>
          </PrivetRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
