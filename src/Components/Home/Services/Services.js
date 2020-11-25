import React, { useEffect, useState } from 'react';
import './Services.css'
import img from '../../../images/tooth.png'

const Services = () => {
    
    const [services, setService] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setService(data))
    }, [])

    return (
        <div className="container services">
            <div className='text-center'>
                <h4 className='blue mt-3'>OUR SERVICES</h4>
                <h1 className='black mt-4 service-title'>Services We Provide</h1>
            </div>
            <div className="row text-center justify-content-center">
                {
                    services.map(service =>
                        <div className="col-lg-4 col-md-6 col-12 p-4">
                            <img src={service.img} alt="" />
                            <h5 className='mt-3 black'>{service.title}</h5>
                            <p className='mt-3 text-black-50'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet. dolor sit amet</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Services;