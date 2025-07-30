import React, { useState } from 'react';
import './InquiryModal.css';

const InquiryModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const state = localStorage.getItem('state') || '';
      const city = localStorage.getItem('city') || '';

      const res = await fetch('https://connectlocks.onrender.com/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-location': `${state}|${city}`
        },
        body: JSON.stringify({ name, email, phone, message })
      });

      if (res.ok) {
        alert('✅ Inquiry submitted successfully!');
        onClose();
      } else {
        alert('❌ Failed to submit inquiry');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting inquiry');
    }
  };

  return (
    <div className="inquiry-backdrop">
      <div className="inquiry-modal">
        <h2>Send an Inquiry</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Your Question (Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="inquiry-buttons">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
