import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import './AppointmentForm.css';
import Modal from 'react-modal';


Modal.setAppElement('#root')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};



const AppointmentForm = (props) => {

    const { modalIsOpen, openModal, closeModal, title, time } = props;

    const [userState, setUserState] = useContext(UserContext);
    const [doctorList, setDoctorList] = useState([]);
    let doctor = {};

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        fetch(`https://sleepy-ridge-24187.herokuapp.com/specialistDoctor/${title}`)
            .then(res => res.json())
            .then(data => {
                const doctor = data.filter(data => data.specialistOn == title);
                setDoctorList(doctor);
                console.log(doctor);
            })
    }, [modalIsOpen])
    
    const onSubmit = data => {

        data.appointmentWith = doctor;
        data.created = new Date().toLocaleDateString();
        data.appointmentOn = title;
        data.time = time.slice(0, 5) + ' ' + time.slice(14, 16);
        data.status = 'Pending';
        data.statusBG = '#76c5ff';
        data.date = new Date(data.date).toLocaleDateString();

        fetch('https://sleepy-ridge-24187.herokuapp.com/bookAnAppointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {

            })
        alert('Data submit successful');
    };

    return (
        <div>
            <Modal
                id='modal'
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >

                <h2 className='text-center'>{title}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <input
                            type="text"
                            ref={register({ required: true })}
                            name="name"
                            placeholder="Your Name*"
                            className="form-control"
                        />
                        {errors.name && <span className="text-danger">Name is required</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            ref={register({ required: true })}
                            name="phone"
                            placeholder="Phone Number*"
                            className="form-control"
                        />
                        {errors.phone && <span className="text-danger">Phone number is required</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                            name="email"
                            placeholder='email*'
                            defaultValue={userState.email}
                            className="form-control"
                        />
                        {errors.email && <span className="text-danger">Please enter a valid email</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            ref={register({ required: true })}
                            name="address"
                            placeholder="Address"
                            className="form-control"
                        />
                        {errors.email && <span className="text-danger">Your address</span>}
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <input
                                type="date"
                                name="date"
                                class="form-control"
                                placeholder="date"
                                dateformate='dd/mm/yyy'
                                ref={register({ required: true })}
                            />
                        </div>
                        <div class="col">
                            <select className="form-control" name="appointmentWith" ref={register({ required: true })} >
                                <option disabled={true} value="Not set">Select Doctor</option>
                                {
                                    doctorList.map( list => 
                                        <option value={doctor = {doctorEmail: list.email, doctorName: list.name}}>
                                            {list.name}
                                        </option> 
                                    )
                                }
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>

                    <div className="form-group row">

                        <div className="col">
                            <select className="form-control" name="gender" ref={register({ required: true })} >
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}
                        </div>

                        <div className="col">
                            <input
                                ref={register({ required: true })}
                                className="form-control mt-0"
                                name="age"
                                placeholder="Your Age"
                                type="number"
                            />
                            {errors.age && <span className="text-danger">Age is required</span>}
                        </div>

                        <div className="col">
                            <input
                                ref={register({ required: true })}
                                className="form-control mt-0"
                                name="weight"
                                placeholder="Weight"
                                type="number"
                            />
                            {errors.weight && <span className="text-danger">Weight is required</span>}
                        </div>
                    </div>

                    <div className="form-group text-right">
                        <button
                            style={{ fontSize: '12px' }}
                            type="submit"
                            className="button text-white pr-5 pl-5">
                            SEND
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AppointmentForm;