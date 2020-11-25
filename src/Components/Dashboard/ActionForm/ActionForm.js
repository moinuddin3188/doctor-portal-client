import React, { useState } from 'react';
import './ActionForm.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

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


const ActionForm = (props) => {

    const { modalIsOpen, openModal, closeModal, id } = props;
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState({});

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const handleChange = (e) => {
        let newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        if (e.target.value == 'Pending') { newInfo = { ...newInfo, statusBG: '#76c5ff' } }
        if (e.target.value == 'Approved') { newInfo = { ...newInfo, statusBG: '#38af86' } }
        if (e.target.value == 'Cancelled') { newInfo = { ...newInfo, statusBG: '#ff7676' } }
        setInfo(newInfo);
    }

    const updateStatus = (e) => {

        const formData = new FormData();

        formData.append('status', info.status);
        formData.append('statusBG', info.statusBG);

        fetch(`https://sleepy-ridge-24187.herokuapp.com/updateStatus/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(success => {
                alert('Data submit successful');
            })

        e.preventDefault();
    };

    const addPrescription = e => {

        const formData = new FormData();
        formData.append('file', file);

        fetch(`https://sleepy-ridge-24187.herokuapp.com/addPrescription/${id}`, {
            method: 'PATCH',
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

        e.preventDefault();
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h2 className='text-center blue mb-4 mt-2'>Take action</h2>
                <p>{id} </p>
                <h6>Change Appointment Status</h6>
                <div className="action-form">
                    <form onSubmit={updateStatus}>
                        <div class="form-check">
                            <input
                                onChange={handleChange}
                                class="form-check-input"
                                type="radio"
                                name="status"
                                id="Radios1"
                                value="Pending"
                            />
                            <label class="form-check-label" for="Radios1">
                                Pending
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                onChange={handleChange}
                                class="form-check-input"
                                type="radio"
                                name="status"
                                id="Radios2"
                                value="Approved"
                            />
                            <label class="form-check-label" for="Radios2">
                                Approved
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                onChange={handleChange}
                                class="form-check-input"
                                type="radio"
                                name="status"
                                id="Radios3"
                                value="Cancelled"
                            />
                            <label class="form-check-label" for="Radios3">
                                Cancelled
                            </label>
                        </div>
                        <div className="form-group text-right mt-3">
                            <button
                                style={{ fontSize: '12px' }}
                                type="submit"
                                className="button text-white pr-5 pl-5">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                    <form onSubmit={addPrescription}>
                        <div className='mt-5'>
                            <h6>Add Prescription</h6>
                            <input
                                onChange={handleFileChange}
                                type="file"
                                name="Prescription"
                            />
                        </div>
                        <div className="form-group text-right mt-3">
                            <button
                                style={{ fontSize: '12px' }}
                                type="submit"
                                className="button text-white pr-5 pl-5">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ActionForm;