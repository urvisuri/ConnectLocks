// components/InquiryForm.js
import React, { useState } from 'react';

const InquiryForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert('Inquiry submitted: ' + message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Send Inquiry</h3>
      <textarea
        rows="4"
        placeholder="Your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button type="submit" style={{ marginTop: '10px' }}>Send</button>
    </form>
  );
};

export default InquiryForm;
