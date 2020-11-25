import React from 'react';
import './Appointment.css';
import Navbar from '../Home/Header/Navbar/Navbar';
import Footer from '../Home/Footer/Footer';
import BookAppointment from './BookAppointment/BookAppointment';
import AppointmentHeader from './AppointmentHeader/AppointmentHeader';

const Appointment = () => {
    return (
        <div className='appointment'>
            <AppointmentHeader/>
            <div className="container">
                <BookAppointment/>
            </div>
            <Footer/>
        </div>
    );
};

export default Appointment;