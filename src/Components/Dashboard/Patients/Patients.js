import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './Patients.css';

const Patients = () => {

    document.title = 'Patients';

    const [userState, setUserState, isDoctor, isAdmin] = useContext(UserContext)
    const [patients, setPatients] = useState([]);
    const [adminUrl, setAdminUrl] = useState('https://sleepy-ridge-24187.herokuapp.com/allBookedAppointments');
    const [doctorUrl, setDoctorUrl] = useState(`https://sleepy-ridge-24187.herokuapp.com/singleDoctorAppointment/${userState.email}`);

    useEffect(() => {
        if (isDoctor) {
            fetch(doctorUrl)
                .then(res => res.json())
                .then(data => setPatients(data))
        }
        else {
            fetch(adminUrl)
                .then(res => res.json())
                .then(data => setPatients(data))
        }

    }, [patients, adminUrl, doctorUrl])

    const onChange = e => {
        const week = e.target.value;
        if (isDoctor) {
            setDoctorUrl(`https://sleepy-ridge-24187.herokuapp.com/singleDoctorOneWeeksAppointments/${userState.email}/${week}`)
        }
        else {
            setAdminUrl(`https://sleepy-ridge-24187.herokuapp.com/oneWeeksAppointments/${week}`)
        }
    }

    return (
        <div className='d-flex dashboard-container'>
            <Sidebar />
            <div className="patients col">
                <h6>Patients</h6>
                <div className="all-patients">
                    <div className="row px-0">
                        <div className="col">
                            <h6 className='blue mb-4'>All Patients</h6>
                        </div>
                        <div className="col text-right">
                            <form action="">
                                <input
                                    style={{ fontSize: '12px', width: '104px' }}
                                    onChange={onChange}
                                    type='week'
                                    name="week"
                                />
                            </form>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Weight</th>
                            <th>Contact</th>
                            <th>Address</th>
                        </tr>
                        {
                            patients.map((patient, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.weight}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.address}</td>
                                </tr>
                            )
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Patients;