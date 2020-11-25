import React, { useContext } from 'react';
import './AppointmentHeader.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dental from '../../../images/Mask Group 1.png';
import '../../Home/Header/HeaderMain/HeaderMain.css';
import '../../Home/Header/HeaderMain/Calender.css';
import { UserContext } from '../../../App';
import Navbar from '../../Home/Header/Navbar/Navbar';

const AppointmentHeader = () => {

    const [userState, setUserState] = useContext(UserContext);

    const handleDateChange = date => {
        setUserState({ ...userState, date: date });
    }

    return (
        <div className='appointment-header pt-5'>
            <div className="container">
                <Navbar />
                <div className="row header justify-content-center">
                    <div className="col-lg-5 col-12">
                        <h1 className="text-center text-lg-left">Appointment</h1>
                        <Calendar
                            onChange={handleDateChange}
                            value={new Date()}
                        />
                    </div>
                    <div className="col-lg-7 col-12 mt-5 mt-lg-0">
                        <img width="100%" src={dental} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentHeader;