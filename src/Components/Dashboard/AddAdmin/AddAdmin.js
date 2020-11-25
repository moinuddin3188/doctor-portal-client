import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AddAdmin.css';

const AddAdmin = () => {

    document.title = 'Add Admin';

    const [addAdmin, setAddAdmin] = useState({});
    const [removeAdmin, setRemoveAdmin] = useState('');

    const handleBlur = e => {
        e.target.name === 'addAdmin' && setAddAdmin({...addAdmin, email: e.target.value});
        e.target.name === 'removeAdmin' && setRemoveAdmin(e.target.value);
    }

    const handleAddAdmin = (e) => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: addAdmin.email})
        })
            .then(res => res.json())
            .then(success => {
                alert('Data submit successful');
            })

        e.preventDefault();
    }

    const handleRemoveAdmin = (e) => {
        fetch(`https://sleepy-ridge-24187.herokuapp.com/removeAdmin/${removeAdmin}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {

        })

        e.preventDefault();
    }

    return (
        <div className="d-flex dashboard-container">
            <Sidebar />
            <div className="dashboard col">
                <h6>Add Admin</h6>
                <div className="add-admin">
                    <div class="form-row">

                        <div class="col">
                            <form onSubmit={handleAddAdmin}>
                                <h6 className='blue'>Add a new admin</h6>
                                <input
                                    onBlur={handleBlur}
                                    name='addAdmin'
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    required
                                />
                                <div className="text-right">
                                    <button className='button px-4 py-2 mt-3' type="submit">Submit</button>
                                </div>
                            </form>
                        </div>


                        <div class="col">
                            <form onSubmit={handleRemoveAdmin}>
                                <h6 className='blue'>Remove admin</h6>
                                <input
                                    onBlur={handleBlur}
                                    name='removeAdmin'
                                    type='email'
                                    class="form-control"
                                    placeholder="Email"
                                    required
                                />
                                <div className="text-right">
                                    <button className='button px-4 py-2 mt-3' type="submit">Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;