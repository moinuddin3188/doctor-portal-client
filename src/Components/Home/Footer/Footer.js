import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h6 className="mb-5"> </h6>
                        <p>Emergency dental care</p>
                        <p>Check up</p>
                        <p>Treatment of personal diseases</p>
                        <p>Tooth Extraction</p>
                    </div>
                    <div className="col">
                        <h6 className='blue'>Services</h6>
                        <p>Emergency dental care</p>
                        <p>Check up</p>
                        <p>Treatment of personal diseases</p>
                        <p>Tooth Extraction</p>
                        <p>Check up</p>
                        <p>Check up</p>
                        <p>Check up</p>
                    </div>
                    <div className="col">
                        <h6 className='blue'>Oral health</h6>
                        <p>Emergency dental care</p>
                        <p>Check up</p>
                        <p>Treatment of personal diseases</p>
                        <p>Tooth Extraction</p>
                        <p>Check up</p>
                        <p>Check up</p>
                        <p>Check up</p>
                    </div>
                    <div className="col">
                        <h6 className='blue'>Our address</h6>
                        <p>New York - 101011 Hudson Yards</p>
                        <button className='btn text-white icon active-icon mt-3'><FontAwesomeIcon icon={faFacebookF} /></button>
                        <button className='btn icon mt-3'><FontAwesomeIcon icon={faGooglePlusG} /></button>
                        <button className='btn icon mt-3'><FontAwesomeIcon icon={faTwitter} /></button>
                        <p className='mt-5 pt-5 mb-1'>Call now</p>
                        <button className="button" style={{fontSize: '13px', letterSpacing: 'normal'}}>+203452551</button>
                    </div>
                </div>
                <p className='text-center mt-5'>Copyright © 2020 All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;