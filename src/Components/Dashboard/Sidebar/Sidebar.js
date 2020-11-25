import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faCalendarMinus, faHome, faUser, faFileAlt, faCog, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../App';


const Sidebar = () => {

    const [userState, setUserState, isDoctor, isAdmin] = useContext(UserContext);

    return (
        <div className='col-2 sidebar d-flex flex-column'>
            <div className='col pl-0'>
                <Link to='/' class="text-decoration-none">
                    <p className='text-white'>
                        <FontAwesomeIcon className='dashboard-icon' icon={faHome} />
                        Home
                    </p>
                </Link>
                <Link to='/dashboard' class="text-decoration-none">
                    <p className='text-white'>
                        <FontAwesomeIcon className='dashboard-icon' icon={faTh} />
                        Dashboard
                    </p>
                </Link>
                <Link to='/appointment' class="text-decoration-none">
                    <p className='text-white'>
                        <FontAwesomeIcon className='dashboard-icon' icon={faCalendarMinus} />
                        Appointment
                    </p>
                </Link>
                <Link to='/patients' class="text-decoration-none">
                    <p className='text-white'>
                        <FontAwesomeIcon className='dashboard-icon' icon={faUser} />
                        Patients
                    </p>
                </Link>
                <Link to='/prescription' class="text-decoration-none">
                    <p className='text-white'>
                        <FontAwesomeIcon className='dashboard-icon' icon={faFileAlt} />
                        Prescriptions
                    </p>
                </Link>
                {isAdmin &&
                    <Link to='/addDoctor' class="text-decoration-none">
                        <p className='text-white'>
                            <FontAwesomeIcon className='dashboard-icon' icon={faPlus} />
                            Add Doctor
                        </p>
                    </Link>
                }
                {isAdmin &&
                    <Link to='/addAdmin' class="text-decoration-none">
                        <p className='text-white'>
                            <FontAwesomeIcon className='dashboard-icon' icon={faPlus} />
                            Add Admin
                        </p>
                    </Link>
                }
                <Link to='/setting' class="text-decoration-none">
                    <p className='text-white'>
                        <FontAwesomeIcon className='dashboard-icon' icon={faCog} />
                        Setting
                    </p>
                </Link>
            </div>
            <div className='d-flex align-items-end'>
                <p onClick={() => {setUserState({})}} className='text-white'>
                    <FontAwesomeIcon className='dashboard-icon' icon={faSignOutAlt} />
                    Sign out
                </p>
            </div>
        </div>
    );
};

export default Sidebar;