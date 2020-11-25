import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import ActionForm from '../ActionForm/ActionForm';
import { UserContext } from '../../../App';

const DashboardMain = () => {

    document.title = 'Dashboard';

    const [userState, setUserState, isDoctor, isAdmin] = useContext(UserContext)

    const [allBookedAppointments, setAllBookedAppointments] = useState([]);
    const [id, setId] = useState(null);
    const [adminUrl, setAdminUrl] = useState('https://sleepy-ridge-24187.herokuapp.com/allBookedAppointments');
    const [doctorUrl, setDoctorUrl] = useState(`https://sleepy-ridge-24187.herokuapp.com/singleDoctorAppointment/${userState.email}`);

    useEffect(() => {
        if (isDoctor) {
            fetch(doctorUrl)
            .then(res => res.json())
            .then(data => setAllBookedAppointments(data))
        }
        else {
            fetch(adminUrl)
            .then(res => res.json())
            .then(data => setAllBookedAppointments(data))
        }
        
    }, [allBookedAppointments, adminUrl, doctorUrl])

    const onChange = e => {
        const week = e.target.value;
        if (isDoctor) {
            setDoctorUrl(`https://sleepy-ridge-24187.herokuapp.com/singleDoctorOneWeeksAppointments/${userState.email}/${week}`)
        }
        else {
            setAdminUrl(`https://sleepy-ridge-24187.herokuapp.com/oneWeeksAppointments/${week}`)
        }
        console.log(allBookedAppointments);
    }

    const pending = allBookedAppointments.filter(appt => appt.status === 'Pending');
    const newDate = new Date().toLocaleDateString();
    const todaysAppointments = allBookedAppointments.filter(appt => appt.date === newDate);
    const cancelled = allBookedAppointments.filter(appt => appt.status === 'Cancelled');
    const totalPatients = allBookedAppointments.length - cancelled.length;

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(id) {
        setIsOpen(true);
        setId(id);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='dashboard-main d-flex dashboard-container'>
            <Sidebar />
            <div className='dashboard col'>
                <h6>Dashboard</h6>
                <div className="row ml-0">
                    <div className="col-3 p-2">
                        <div style={{ backgroundColor: '#f1536e' }} className='d-flex dashboard-card'>
                            <h1>{pending.length}</h1>
                            <p>Pending <br /> Appointments</p>
                        </div>
                    </div>
                    <div className="col-3 p-2">
                        <div style={{ backgroundColor: '#3da5f4' }} className='d-flex dashboard-card'>
                            <h1>{todaysAppointments.length}</h1>
                            <p>Today's <br /> Appointments</p>
                        </div>
                    </div>
                    <div className="col-3 p-2">
                        <div style={{ backgroundColor: '#00c689' }} className='d-flex dashboard-card'>
                            <h1>{allBookedAppointments.length}</h1>
                            <p>Total <br /> Appointments</p>
                        </div>
                    </div>
                    <div className="col-3 p-2">
                        <div style={{ backgroundColor: '#fda006' }} className='d-flex dashboard-card'>
                            <h1>{totalPatients}</h1>
                            <p>Total <br /> Patients</p>
                        </div>
                    </div>
                </div>
                <div className="recent-appointments">
                    <div className="row px-0">
                        <div className="col">
                            <h6 className='blue mb-4'>Recent Appointments</h6>
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
                            <th>Sr. no</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Prescription</th>
                            <th>Action</th>
                        </tr>
                        {
                            allBookedAppointments.map((appt, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{appt.date}</td>
                                    <td>{appt.time}</td>
                                    <td>{appt.name}</td>
                                    <td>{appt.phone}</td>
                                    <td>
                                        {appt.prescription ?
                                            <a href={`data:${appt.prescription && appt.prescription.contentType};base64,${appt.prescription && appt.prescription.doc}`} download>
                                                <button className='btn btn-sm btn-primary px-3' style={{ width: '65px' }}>View</button>
                                            </a> :
                                            'Not added'
                                        }
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-sm mr-1 text-white'
                                            style={{ backgroundColor: appt.statusBG, width: '79.25px' }}
                                        >
                                            {appt.status}
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm border-0'
                                            style={{ backgroundColor: '#ffd076' }}
                                            onClick={() => openModal(appt._id)}
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                        <ActionForm
                                            id={id}
                                            modalIsOpen={modalIsOpen}
                                            openModal={openModal}
                                            closeModal={closeModal}
                                        />
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

export default DashboardMain;