// ContactUs.jsx
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { contactUsEmail } from '../../services/EmailService';
import './ContactUs.scss';

function ContactUs() {
  const [info, setInfo] = useState({email: '', comment: ''})
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!info.comment) {
      toast.error('Please fill in the comment field.');
      return;
    }

    contactUsEmail(info).then(() => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to send email, status code: ${response.status}`);
      }
      toast.success('thank you for submitting a comment to us.');
      setSubmitted(true);
    }).catch((err) => {
      console.error(err);
      toast.error('failed to send comment to the ida dog team. Please try again later');
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => {return { ...prev, [name]: value }});
  };

  return (
    <div className="contact-us-container">
      <ToastContainer />
      {submitted ? (
        <div className="thank-you-message">
          <h2>Thank you!</h2>
          <p>Your message has been sent. We'll get back to you soon.</p>
        </div>
      ) : (
        <>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <label htmlFor="email">Email:</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={info.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
              />

              <label htmlFor="comment">Comment:</label>
              <textarea
                  id="comment"
                  name="comment"
                  value={info.comment}
                  onChange={handleInputChange}
                  placeholder="Enter your comment"
                  rows="5"
                  required
              ></textarea>

              <button type="submit">Send</button>
            </form>
        </>
      )}
    </div>
  );
}

export default ContactUs;
