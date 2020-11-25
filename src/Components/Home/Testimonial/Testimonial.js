import React, { useEffect, useState } from 'react';
import './Testimonial.css';
import img from '../../../images/Ellipse2.png';

const Testimonial = () => {
    
    const [testimonial, setTestimonial] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/testimonials')
        .then(res => res.json())
        .then(data => setTestimonial(data))
    }, [])

    return (
        <div className='container testimonial-container'>
            <div className="testimonial mb-5">
                <h5 className='blue mb-4'>TESTIMONIAL</h5>
                <h1 className='black'>What's Our Patient <br /> Says</h1>
            </div>
            <div className='row justify-content-center'>
                {
                    testimonial.map(data =>
                        <div className="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                            <div className="card border-0 shadow pt-5 p-4">
                                <div class="card-header bg-white border-0">
                                    <p className='text-justify mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, ipsa. Tenetur sequi dolores itaque obcaecati accusantium, omnis eveniet. Est, cumque sit amet dolores itaque est.</p>
                                    <div className="row">
                                        <div className="col-auto">
                                            <img src={data.img} alt=""/>
                                        </div>
                                        <div className='col'>
                                            <h6 className='blue'>{data.name}</h6>
                                            <p className='text-black-50'>California</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Testimonial;