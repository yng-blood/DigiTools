import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css'; // Import CSS for styling

const Footer = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/feedback', { name, email, message });

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setError('Failed to send feedback.');
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Feedback</h2>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        {success && <p className="success-message">Thank you for your feedback!</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </footer>
  );
};

export default Footer;
