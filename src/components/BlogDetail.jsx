// src/components/BlogDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        const blogData = response.data.find(
          (b) => b.title.toLowerCase().replace(/\s+/g, '_') === slug
        );
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{blog.title}</h2>
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
