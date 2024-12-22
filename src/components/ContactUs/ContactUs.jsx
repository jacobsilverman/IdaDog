// ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.scss';

function ContactUs() {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !comment) {
      alert('Please fill in all fields.');
      return;
    }

    // Mock submission (replace this with actual API call if needed)
    console.log('Form submitted:', { email, comment });
    setSubmitted(true);
  };

  return (
    <div className="contact-us-container">
      
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />

            <label htmlFor="comment">Comment:</label>
            <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
