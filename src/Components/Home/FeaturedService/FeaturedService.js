import React from 'react';
import care from  '../../../images/Mask Group 3.png';

const FeaturedService = () => {
    return (
        <div className='container'>
            <div className="row mt-5 mb-5">
                <div className="col-lg-5 col-12">
                    <img className="w-100" src={care} alt=""/>
                </div>
                <div className="col-lg-7 col-12">
                    <h1 className="black mt-5" style={{lineHeight: '55px'}}>Expectational Dental <br/> Care On Your Terms</h1>
                    <p className='text-black-50 mt-4' style={{lineHeight: '34px'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea ut qui
                         sunt sapiente dignissimos autem dolorum quisquam quos consectetur
                         dolore accusamus, earum eligendi impedit praesentium nemo iusto
                         laudantium accusantium deleniti. Lorem ipsum dolor sit amet consectetur,
                         adipisicing elit. Veniam asperiores assumenda ea voluptatibus 
                         quas, aspernatur magnam eos tenetur corrupti veritatis voluptas deleniti
                         saepe, ullam reprehenderit? In quidem quae accusamus deleniti.</p>
                    <button className='button pl-4 pr-4 mt-5'>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedService;