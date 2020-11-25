import React, { useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import { useContext } from 'react';
import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle, faSignOutAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const [userState, setUserState, isDoctor, isAdmin] = useContext(UserContext);
    const [isUser, setIsUser] = useState(true);

    const history = useHistory();
    const gotoHome = () => {
        history.push('/');
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light px-0">
                <h3 onClick={gotoHome}>Rx</h3>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <FontAwesomeIcon color="Black" icon={faBars} />
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link mr-4" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-4" to={isAdmin || isDoctor ? "/dashboard" : "/myAppointments"}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-4" to="#">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-4" to="#">Dental Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-4" to="#">Reviews</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-4" to="#">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mr-4" to="#">Contact Us</Link>
                        </li>
                        {userState.email ?
                            <li className="nav-item d-flex align-items-center">
                                <div>
                                    <FontAwesomeIcon
                                        className='na-link user-icon'
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        icon={faUserCircle}
                                    />

                                    <div class="dropdown-menu dropdown-menu-right dropdown-box">
                                        <div className="text-center dropdown-header px-4 pt-2">
                                            <FontAwesomeIcon
                                                style={{ fontSize: '70px' }}
                                                color='gray'
                                                icon={faUserCircle}
                                            />
                                            <h5 className='blue mt-3'>{userState.name}</h5>
                                        </div>
                                        <div className='py-2'>
                                            <p
                                                onClick={() => setUserState({})}
                                                class="dropdown-item">
                                                <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                                                    Logout
                                            </p>
                                            <Link
                                                class="dropdown-item"
                                                to="/myAppointments">
                                                    <FontAwesomeIcon className="mr-2" icon={faFileAlt} />
                                                    My Appointments
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            :
                            <li className="nav-item">
                                <Link className="nav-link pt-1" to="/login">
                                    <button className="login-btn">Login</button>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;