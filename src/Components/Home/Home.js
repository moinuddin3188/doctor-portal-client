import React from 'react';
import Blog from './Blog/Blog';
import Contact from './Contact/Contact';
import Doctors from './Doctors/Doctors';
import FeaturedService from './FeaturedService/FeaturedService';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import MakeAnAppointment from './MakeAnAppointment/MakeAnAppointment';
import Services from './Services/Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {

    document.title = 'Home';

    return (
        <>
            <Header/>
            <Services/>
            <FeaturedService/>
            <MakeAnAppointment/>
            <Testimonial/>
            <Blog/>
            <Doctors/>
            <Contact/>
            <Footer/>
        </>
    );
};

export default Home;