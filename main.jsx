// App.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import About from './src/components/About';
import Hero from './src/components/Hero';
import Contactme from './src/components/Contactme';
import Socials from './src/components/Socials';
import Admin from './src/components/Admin';
import Dashboard from './src/components/Dashboard';
import Blogs from './src/components/Blogs';
import BlogDetail from './src/components/BlogDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const RequireAuth = ({ children }) => {
    let location = useLocation();
    if (!localStorage.getItem('auth')) {
      return <Navigate to="/admin" state={{ from: location }} />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contactme />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/socials" element={<Socials />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
