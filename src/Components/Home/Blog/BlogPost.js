import React from 'react';
import './BlogPost.css'

const BlogPost = (props) => {

    const {img, date, title, name} = props.blog;

    return (
        <div className='col-lg-4 col-md-6 col-12 mt-4 mt-lg-0'>
            <div className="card shadow pt-4 p-3 blog-post border-0">
                <div className="card-body">
                    <div className="row">
                        <div className="col-auto">
                            <img src={img} alt="" />
                        </div>
                        <div className="col pl-0">
                            <h6 className='black'>{name}</h6>
                            <p className='text-black-50 date'>{date}</p>
                        </div>
                    </div>
                    <h5 className='black mt-4'>{title}</h5>
                    <p className='text-black-50 mt-4 post-description'>Lorem ipsum dolor sit amet is a use text b for sample text that's why i am using</p>
                    <p className='arrow'>⟶</p>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;