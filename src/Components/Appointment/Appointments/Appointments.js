import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './Appointments.css';

const Appointments = (props) => {

    const [userState, setUserState] = useContext(UserContext);
    const {title, time, space, id} = props.appointment;

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const history = useHistory();

    const login = () => {
        history.push('/login')
    }

    return (
        <div className='col-lg-4 col-md-6'>
            <div className="booking-card text-center shadow mb-5">
                <p className='title blue mb-2'>{title}</p>
                <p className='time black mb-1'>{time}</p>
                <p className='spaces text-black-50 mb-3'>{space} SPACES AVAILABLE</p>
                <button 
                    className='button booking-btn'
                    onClick={userState.email ? openModal : login}
                >
                    BOOK APPOINTMENT
                </button>
                <AppointmentForm
                    modalIsOpen={modalIsOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                    title={title}
                    time={time}
                />
            </div>
        </div>
    );
};

export default Appointments;