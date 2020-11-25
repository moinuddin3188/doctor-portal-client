import React, { useEffect, useState } from 'react';
import './Doctors.css';
import doctor from '../../../images/5790-removebg1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

const Doctors = () => {
    
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/doctors')
        .then(res => res.json())
        .then(data => setDoctors(data))
    }, [])

    return (
        <div className='container doctors'>
            <h5 className='blue font-weight-bold text-center mb-4'>Our Doctors</h5>
            <div className="row text-center justify-content-center">
                {
                    doctors.map(doc =>
                        <div className="col-sm-4 col-6">
                            <img className='w-100' src={doc.img} alt="" />
                            <h6 className='mt-2'>{doc.name}</h6>
                            <p className='phone'><FontAwesomeIcon className='blue' icon={faPhoneAlt} /> <span className='text-black-50'>+64 587 658 532</span></p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Doctors;