import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "../styling/Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); // Number of blogs per page
  const [sortOption, setSortOption] = useState('latest'); // Default sort option

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const createSlug = (title) => title.toLowerCase().replace(/\s+/g, '_');

  // Sort blogs by date
  const sortBlogs = (option) => {
    if (option === 'latest') {
      const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sortedBlogs);
    } else if (option === 'oldest') {
      const sortedBlogs = [...blogs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setBlogs(sortedBlogs);
    }
    setSortOption(option);
  };

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(blogs.length / blogsPerPage)));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(Math.ceil(blogs.length / blogsPerPage));

  return (
    <div id='blogscontainer'>
      <div className="row mb-3">
        <div className="col">
          <h1 className="my-blogs-heading d-inline">My Blogs</h1>
          <DropdownButton id="dropdown-basic-button" title="Sort By" className="ml-3">
            <Dropdown.Item active={sortOption === 'latest'} onClick={() => sortBlogs('latest')}>Latest</Dropdown.Item>
            <Dropdown.Item active={sortOption === 'oldest'} onClick={() => sortBlogs('oldest')}>Oldest</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="row">
        {currentBlogs.map((blog) => (
          <div key={blog._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">
                  {blog.description.length > 100
                    ? `${blog.description.substring(0, 100)}...`
                    : blog.description}
                </p>
                <Link to={`/blogs/${createSlug(blog.title)}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        blogsPerPage={blogsPerPage}
        totalBlogs={blogs.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </div>
  );
};

// Separate component for pagination
const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage, nextPage, prevPage, firstPage, lastPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button onClick={firstPage} className="page-link" disabled={currentPage === 1}>First</button>
        </li>
        <li className="page-item">
          <button onClick={prevPage} className="page-link" disabled={currentPage === 1}>Previous</button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button onClick={nextPage} className="page-link" disabled={currentPage === pageNumbers.length}>Next</button>
        </li>
        <li className="page-item">
          <button onClick={lastPage} className="page-link" disabled={currentPage === pageNumbers.length}>Last</button>
        </li>
      </ul>
    </nav>
  );
};

export default Blogs;
