import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {

    const history = useHistory();
    const goHome = () => {
        history.push('/')
    }

    return (
        <div className='text-center'>
            <img src="https://i.imgur.com/iY03dIr.png" alt=""/> <br/>
            <button onClick={goHome} className='mt-5 button px-4'>Go Home</button>
        </div>
    );
};

export default NotFound;