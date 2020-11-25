import React, { useEffect, useState } from 'react';
import './Blog.css';
import BlogPost from './BlogPost';

const Blog = () => {
    
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-ridge-24187.herokuapp.com/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
    }, [])

    return (
        <div className='container blog'>
            <div className="text-center mb-5">
                <h5 className='blue font-weight-bold mb-4'>OUR BLOG</h5>
                <h1 className='black' style={{fontWeight: '700'}}>From Our Blog News</h1>
            </div>
            <div className="row justify-content-center">
                {
                    blogs.map(blog => <BlogPost key={blog.id} blog={blog}/>)
                }
            </div>
        </div>
    );
};

export default Blog;