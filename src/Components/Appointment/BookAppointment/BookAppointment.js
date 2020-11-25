import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Appointments from '../Appointments/Appointments';
import './BookAppointment.css';

const BookAppointment = () => {

    document.title = 'Get Appointment';

    const [userState, setUserState] = useContext(UserContext);
    const {date} = userState;
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/appointments')
        .then(res => res.json())
        .then(data => setAppointments(data))
    }, [])

    return (
        <div className="book-appointment">
            <h2 className='blue text-center mb-5'>Available Appointments on {date.toDateString().slice(4)}</h2>
            <div className="row">
                {
                    appointments.map(appointment => <Appointments key={appointment.id} appointment={appointment} />)
                }
            </div>
        </div>
    );
};

export default BookAppointment;