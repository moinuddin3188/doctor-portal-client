import React, { useEffect, useState } from 'react';
import './BusinessInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const BusinessInfo = () => {

    const [businessInfo, setBusinessInfo] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/businessInfo')
            .then(res => res.json())
            .then(data => setBusinessInfo(data))
    }, [])

    return (
        <div className="row mr-5 ml-5 mt-lg-3">
            {
                businessInfo.map(info =>
                    <div className="col-lg-4 col-12 p-2 text-white text-sm-left text-center">
                        <div
                            style={{ backgroundColor: info.bgColor, height: '130px' }}
                            className="business-info d-sm-flex justify-content-lg-center align-items-center pt-4 pb-4 pr-sm-5 pr-3 pl-sm-5 pl-3 rounded"
                        >
                            <div className="mr-sm-4 mb-sm-0 mb-2">
                                <FontAwesomeIcon style={{ fontSize: '45px' }} icon={info.icon === 'Clock' && faClock || info.icon === 'MapMarkerAlt' && faMapMarkerAlt || faPhoneAlt} />
                            </div>
                            <div>
                                <p className="mb-1" style={{ fontWeight: '500' }}>{info.title}</p>
                                <p style={{ fontSize: '10px', margin: '0' }}>{info.description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default BusinessInfo;