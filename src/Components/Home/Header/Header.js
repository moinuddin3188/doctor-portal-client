import React from 'react';
import Navbar from './Navbar/Navbar';
import './Header.css';
import BusinessInfo from './BusinessInfo/BusinessInfo';
import HeaderMain from './HeaderMain/HeaderMain';

const Header = () => {
    return (
        <div className="header-container">
            <Navbar />
            <div className="container">
                <HeaderMain/>
                <BusinessInfo/>
            </div>
        </div>
    );
};

export default Header;