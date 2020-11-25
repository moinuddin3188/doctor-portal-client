import React, { useContext, useEffect, useState } from 'react';
import './AllAppointments.css';
import Calendar from 'react-calendar';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';

const AllAppointments = () => {

    document.title = 'Appointments';

    const [userState, setUserState, isDoctor, isAdmin] = useContext(UserContext)

    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [allAppointments, setAllAppointments] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (isDoctor) {
            fetch(`https://sleepy-ridge-24187.herokuapp.com/singleDoctorAppointment/${userState.email}`)
                .then(res => res.json())
                .then(data => { 
                    const patients = data.filter(patient => patient.date == date);
                    setAppointments(patients);
                 })
        }
        else {
            fetch('https://sleepy-ridge-24187.herokuapp.com/allBookedAppointments')
                .then(res => res.json())
                .then(data => {
                    const patients = data.filter(patient => patient.date == date);
                    setAppointments(patients);
                })
        }
    })



    const watchAppointments = date => {
        const newDate = date.toLocaleDateString();
        setDate(newDate);
    }

    return (
        <div className='d-flex dashboard-container'>
            <Sidebar />
            <div className='dashboard col'>
                <h6 className='ml-4'>Appointments</h6>
                <div className="row">
                    <div className="col-auto pl-5">
                        <Calendar
                            onChange={watchAppointments}
                            value={new Date()}
                        />
                    </div>
                    <div className="col px-0 scheduled-appointment">
                        <div className='scheduled-appointment-table'>
                            <div className="row">
                                <div className="col">
                                    <h6 className='blue mb-4' style={{ fontWeight: '500', fontSize: '13px' }}>Appointments</h6>
                                </div>
                                <div className="col">
                                    <p className='text-black-50 text-right' style={{ fontSize: '12px' }}>{date}</p>
                                </div>
                            </div>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Scheduler</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    appointments.map(data =>
                                        <tr>
                                            <td>{data.name}</td>
                                            <td>{data.time}</td>
                                            <td>
                                                <select className='bg-primary border-0 rounded-lg text-white p-1' name="" id="">
                                                    <option value="">Not visited</option>
                                                    <option value="">Visited</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllAppointments;