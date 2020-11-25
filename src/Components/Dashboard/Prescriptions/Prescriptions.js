import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import './Prescriptions.css';

const Prescriptions = () => {

    document.title = 'Prescriptions';

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
            <div className='dashboard col'>
                <h6>Prescriptions</h6>
                <div className="all-prescriptions">
                    <div className="row px-0">
                        <div className="col">
                            <h6 className='blue mb-4'>All Prescriptions</h6>
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
                            <th>Sr. Note</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Prescription</th>
                        </tr>
                        {
                            patients.map((data, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.date}</td>
                                    <td>{data.name}</td>
                                    <td>{data.phone}</td>
                                    <td>
                                        {data.prescription ?
                                            <a href={`data:${data.prescription && data.prescription.contentType};base64,${data.prescription && data.prescription.doc}`} download>
                                                <button className="btn btn-primary btn-sm" style={{ width: '65px' }}>View</button>
                                            </a> :
                                            'Not added'
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Prescriptions;