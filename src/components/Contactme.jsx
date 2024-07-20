import React, { useState } from 'react';
import axios from 'axios';
import "../styling/Contactme.css";

export default function Contactme() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5001/api/contact', {
      name,
      mail: email,
      description: message,
    })
    .then(response => {
      setResponseMessage('Message sent successfully!');
      // Clear the form fields
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch(error => {
      setResponseMessage('Failed to send message. Please try again later.');
      console.error('There was an error sending the message!', error);
    });
  };

  return (
    <div className="contact">
      <form className="contactmeform" onSubmit={handleSubmit}>
        <h2 className="contactformh2">Let's get in touch</h2>
        <div className="contactforminputs">
          <label>Name</label>
          <input 
            type="text" 
            className="contactfields" 
            placeholder="Enter your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="contactforminputs">
          <label>Email Address</label>
          <input 
            type="email" 
            className="contactfields" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="contactforminputs">
          <label>Your Message</label>
          <textarea 
            className="contactfieldlong" 
            cols="30" 
            rows="10" 
            placeholder="Enter your message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
        </div>
        <button className="contactbutton" type="submit">Send Message</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
