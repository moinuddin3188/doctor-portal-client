import React, { useContext, useEffect, useState } from 'react';
import './MyAppointments.css';
import Calendar from 'react-calendar';
import Navbar from '../../Home/Header/Navbar/Navbar';
import { UserContext } from '../../../App';


const MyAppointments = () => {

    document.title = 'My Appointments';

    const [userState, setUserState, isDoctor, isAdmin] = useContext(UserContext);

    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [myAppointments, setMyAppointments] = useState([]);

    useEffect(() => {
        fetch(`https://sleepy-ridge-24187.herokuapp.com/userAppointments/${userState.email}`)
            .then(res => res.json())
            .then(data => {
                const singleDateAppointment = data.filter(data => data.date == date);
                setMyAppointments(singleDateAppointment);
            })
    }, [myAppointments])

    const showAppointments = date => {
        const newDate = date.toLocaleDateString();
        setDate(newDate);
    }

    return (
        <div className='my-appointments-container'>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-12">
                        <Calendar
                            onChange={showAppointments}
                            value={new Date()}
                        />
                    </div>
                    <div className="col-lg-7 col-12 my-appointments">
                        <div className="row mb-4">
                            <div className="col-6">
                                <h6 className='blue mb-4'>Appointments</h6>
                            </div>
                            <div className="col-6 text-right">
                                <p style={{ fontSize: '13px' }}>{date}</p>
                            </div>
                        </div>
                        <table>
                            <tr>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Time</th>
                                <th>Appointment on</th>
                                <th>Doctor</th>
                                <th>Status</th>
                            </tr>
                            {
                                myAppointments.map((appointment, index) =>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{appointment.name}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.appointmentOn}</td>
                                        <td>{appointment.appointmentWith.doctorName}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm text-white"
                                                style={{ backgroundColor: appointment.statusBG, width: '79.25px'}}
                                            >
                                                {appointment.status}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAppointments;