import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className='contact text-center'>
            <div className='container'>
                <h5 className='blue font-weight-bold'>CONTACT US</h5>
                <h1 className='text-white'>Always Contact with us</h1>
                <form action="" className="contact-form">
                    <input type="text" placeholder="Email Address*" />
                    <br />
                    <input type="text" placeholder="Subject*" />
                    <br />
                    <textarea name="" id="" cols="72" rows="8">Your message*</textarea>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </section>
    );
};

export default Contact;