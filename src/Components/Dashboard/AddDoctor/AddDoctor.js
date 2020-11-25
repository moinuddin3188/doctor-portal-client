import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AddDoctor.css';

const AddDoctor = () => {

    document.title = 'Add Doctor';

    const [email, setEmail] = useState('');
    const [doctorInfo, setDoctorInfo] = useState({});
    const [file, setFile] = useState(null);

    const handleBlur = (e) => {
        const newInfo = { ...doctorInfo };
        newInfo[e.target.name] = e.target.value;
        setDoctorInfo(newInfo);
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const addNewDoctor = () => {

        const formData = new FormData();

        formData.append('file', file);
        formData.append('email', doctorInfo.email);
        formData.append('name', doctorInfo.name);
        formData.append('phone', doctorInfo.phone);
        
        fetch('https://sleepy-ridge-24187.herokuapp.com/addDoctor', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Updated successfully');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addDoctorEmail = () => {

        fetch('https://sleepy-ridge-24187.herokuapp.com/addDoctorEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: doctorInfo.email, specialistOn: doctorInfo.specialistOn})
        })
            .then(res => res.json())
            .then(success => {
                alert('Data submit successful');
            })
    }

    const handleSubmit = (e) => {
        addNewDoctor();
        addDoctorEmail();

        e.preventDefault();
    }

    const doctorEmail = e => {
        setEmail(e.target.value)
    }

    const removeDoctorInfo = () => {

        fetch(`https://sleepy-ridge-24187.herokuapp.com/removeDoctor/${email}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(result => {
            alert('Removed successfully')
        })
    }

    const removeDoctorEmail = () => {

        fetch(`https://sleepy-ridge-24187.herokuapp.com/removeDoctorEmail/${email}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(result => {

        })
    }

    const deleteDoctor = (e) => {
        removeDoctorInfo();
        removeDoctorEmail();

        e.preventDefault();
    }

    return (
        <div className="d-flex dashboard-container">
            <Sidebar />
            <div className="dashboard col">
                <h6 className=''>Add Doctor</h6>
                <div className="add-doctor">
                    <form onSubmit={handleSubmit}>
                        <div class="form-row">
                            <div class="col">
                                <input
                                    onBlur={handleBlur}
                                    name='name'
                                    type="text"
                                    class="form-control"
                                    placeholder="Name"
                                />
                            </div>
                            <div class="col">
                                <input
                                    onBlur={handleBlur}
                                    name='phone'
                                    type='tel'
                                    class="form-control"
                                    placeholder="Phone"
                                />
                            </div>
                        </div>
                        <div class="form-row mt-4">
                            <div class="col">
                                <input
                                    onBlur={handleBlur}
                                    name="email"
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                />
                            </div>
                            <div class="col">
                                <input
                                    onBlur={handleBlur}
                                    name="specialistOn"
                                    type="text"
                                    class="form-control"
                                    placeholder="Specialist on"
                                />
                            </div>
                        </div>
                        <div class="form-group mt-4">
                            <label for="exampleFormControlFile1">Profile image</label>
                            <input
                                onChange={handleFileChange}
                                type="file"
                                class="form-control-file"
                                id="exampleFormControlFile1"
                            />
                        </div>
                        <div className='text-right'>
                            <button className='button px-4' type='submit'>Submit</button>
                        </div>
                    </form>
                    <form onSubmit={deleteDoctor}>
                        <h6 className='mt-4'>Remove a Doctor</h6>
                        <div class="form-group">
                            <input
                                onBlur={doctorEmail}
                                name="email"
                                type="email"
                                class="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <div className='text-right mt-3'>
                            <button className='button px-4' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;