import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import '../styling/Dashboard.css';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showBlogs, setShowBlogs] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [creatingBlog, setCreatingBlog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sortBy, setSortBy] = useState('latest'); // State to track sorting option
  const navigate = useNavigate();

  // Function to fetch contact details
  const fetchContactDetails = () => {
    axios.get('http://localhost:5001/api/users')
      .then(response => {
        setContacts(response.data);
        setShowContacts(true);
        setShowBlogs(false);
      })
      .catch(error => {
        console.error('Error fetching contact details:', error);
      });
  };

  // Function to fetch blogs
  const fetchBlogs = () => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        let sortedBlogs = response.data;
        if (sortBy === 'latest') {
          sortedBlogs = response.data.reverse(); // Sort by latest (reverse order)
        } else if (sortBy === 'oldest') {
          sortedBlogs = response.data; // Sort by oldest (default order)
        }
        setBlogs(sortedBlogs);
        setShowBlogs(true);
        setShowContacts(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, [sortBy]); // Fetch blogs whenever sortBy changes

  // Function to handle sort option change
  const handleSortChange = (option) => {
    setSortBy(option);
  };

  // Function to handle logout button click
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // Function to confirm logout
  const confirmLogout = () => {
    axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
      .then(response => {
        document.cookie = 'connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate('/admin');
      });
  };

  // Function to handle blog click for editing
  const handleBlogClick = (blog) => {
    setEditingBlog(blog._id);
    setBlogTitle(blog.title);
    setBlogDescription(blog.description);
    setCreatingBlog(false);
  };

  // Function to handle saving or updating a blog
  const handleBlogSave = () => {
    if (editingBlog) {
      axios.put(`http://localhost:5000/api/blogs/${editingBlog}`, {
        title: blogTitle,
        description: blogDescription,
      }).then(response => {
        setEditingBlog(null);
        setBlogTitle('');
        setBlogDescription('');
        fetchBlogs();
      }).catch(error => {
        console.error('Error saving blog:', error);
      });
    } else {
      axios.post('http://localhost:5000/api/blogs', {
        title: blogTitle,
        description: blogDescription,
      }).then(response => {
        setBlogTitle('');
        setBlogDescription('');
        fetchBlogs();
      }).catch(error => {
        console.error('Error creating blog:', error);
      });
    }
    setCreatingBlog(false);
  };

  // Function to handle blog deletion
  const handleBlogDelete = (blogId) => {
    axios.delete(`http://localhost:5000/api/blogs/${blogId}`)
      .then(response => {
        fetchBlogs();
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
      });
  };

  // Function to handle creating a new blog
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setBlogTitle('');
    setBlogDescription('');
    setCreatingBlog(true);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(blogs.length / blogsPerPage)));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(Math.ceil(blogs.length / blogsPerPage));

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="container-fluid" id="dashboard_container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 sidebar">
          <h2 className="dashboard_heading">Admin Dashboard</h2>
          <p className="dashboard_welcome">Welcome to the admin dashboard!</p>
          <div className="d-flex flex-column">
            <button onClick={fetchContactDetails} className="btn btn-primary contact-btn mb-3">Contact Details</button>
            <button onClick={fetchBlogs} className="btn btn-primary blog-btn mb-3">Blogs</button>
            <button onClick={handleLogout} className="btn btn-danger logout-btn" id='logout'>Logout</button>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-md-9">
          {showContacts && (
            <div className="mt-3">
              <h3>Contact Details</h3>
              <div className="row">
                {contacts.map((contact, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="card contact-card">
                      <div className="card-body contact-card-body" id="contactcardbody">
                        <h5 className="card-title contact-card-title">{contact.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.mail}</h6>
                        <p className="card-text contact-card-text">{contact.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showBlogs && (
            <div className="mt-3">
              <h3>Blogs</h3>
              <div className='someblogbuttons'>  <button onClick={handleCreateBlog} className="btn btn-success create-blog-btn mb-3">Create Blog</button>
              <DropdownButton id="dropdown-basic-button" title="Sort">
              <Dropdown.Item onClick={() => handleSortChange('latest')}>Latest</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('oldest')}>Oldest</Dropdown.Item>
            </DropdownButton></div>
             
              <div className="list-group">
                {currentBlogs.map((blog, index) => (
                  <div key={index} className="list-group-item blog-item d-flex justify-content-between align-items-center">
                    <div className="blog-content" onClick={() => handleBlogClick(blog)}>
                      <h5 className="mb-1">{blog.title}</h5>
                      <p className="mb-1">{blog.description.substring(0, 100)}...</p>
                    </div>
                    <button onClick={() => handleBlogDelete(blog._id)} className="btn btn-danger btn-sm">Delete</button>
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
              {creatingBlog && (
                <div className="mt-3">
                  <h3>Create Blog</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={blogDescription}
                      onChange={(e) => setBlogDescription(e.target.value)}
                      style={{ height: '200px' }}
                    ></textarea>
                  </div>
                  <button onClick={handleBlogSave} className="btn btn-primary mt-2">Save</button>
                </div>
              )}
              {editingBlog && !creatingBlog && (
                <div className="mt-3">
                  <h3>Edit Blog</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={blogDescription}
                      onChange={(e) => setBlogDescription(e.target.value)}
                      style={{ height: '200px' }}
                    ></textarea>
                  </div>
                  <button onClick={handleBlogSave} className="btn btn-primary mt-2">Update</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Pagination component
const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage, nextPage, prevPage, firstPage, lastPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button onClick={firstPage} className="page-link">First</button>
        </li>
        <li className="page-item">
          <button onClick={prevPage} className="page-link">Previous</button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">{number}</button>
          </li>
        ))}
        <li className="page-item">
          <button onClick={nextPage} className="page-link">Next</button>
        </li>
        <li className="page-item">
          <button onClick={lastPage} className="page-link">Last</button>
        </li>
      </ul>
    </nav>
  );
};

export default Dashboard;
