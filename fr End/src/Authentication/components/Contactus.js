import React from 'react';
import Nav from '../Nav/Nav';

const ContactUs = () => {
  return (
    <div>
      <Nav />
      <div className='contact-container'>
        <h1>Contact Us</h1>
        <p>Feel free to reach out to us for any inquiries or feedback.</p>
        <form className='contact-form'>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' placeholder='Your Name' />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' placeholder='Your Email' />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message:</label>
            <textarea id='message' name='message' placeholder='Your Message'></textarea>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
