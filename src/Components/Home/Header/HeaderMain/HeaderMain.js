import React from 'react';
import { UserContext } from '../../../../App';
import { useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dental from '../../../../images/Mask Group 1.png';
import './HeaderMain.css';
import './Calender.css';
import { Link, useHistory } from 'react-router-dom';



const HeaderMain = () => {

    

    return (
        <div className="row header">
            <div className="col-lg-5 col-md-12">
                <h1>Your New Smile <br />
                    Starts Here</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing <br />
                        elit. Nobis commodi, quas cupiditate molestiae labore <br />
                        asperiores repellat ipsum autem non libero!
                    </p>
                <Link to="/getAppointment">
                    <button className="button appointment-btn">GET APPOINTMENT</button>
                </Link>
            </div>
            <div className="col-lg-7 col-md-12 text-md-center mt-5 mt-lg-0">
                <img src={dental} alt="" />
            </div>
        </div>
    );
};

export default HeaderMain;