// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    if (authenticated) {
      fetch("https://connectlocks.in/api/inquiries")
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>IP</th>
            <th>State</th>
            <th>City</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name || '-'}</td>
              <td>{entry.email || '-'}</td>
              <td>{entry.phone || '-'}</td>
              <td>{entry.message || '-'}</td>
              <td>{entry.ip || '-'}</td>
              <td>{entry.state || '-'}</td>
              <td>{entry.city || '-'}</td>
              <td>{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : '-'}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
