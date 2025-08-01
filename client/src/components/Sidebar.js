// components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import './Sidebar.css';

const Sidebar = ({ onInquiryClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showContactEmail, setShowContactEmail] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCategories = () => setShowCategories(!showCategories);
  const toggleContactEmail = () => setShowContactEmail(!showContactEmail);
  

  return (
    <div>
      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={toggleCategories}>
            Products
            {showCategories && (
              <ul className="categories">
                <li><Link to="/category/smart-lock">Smart lock</Link></li>
                <li><Link to="/category/mortise-lock">Mortise lock</Link></li>
                <li><Link to="/category/door-handle">Door handle</Link></li>
                <li><Link to="/category/Knob">Knob</Link></li>
                <li><Link to="/category/telescopic-channel">Telescopic channel</Link></li>
                <li><Link to="/category/auto-hinges">Auto hinges</Link></li>
                <li><Link to="/category/cabinet-handle">Cabinet handle</Link></li>
              </ul>
            )}
          </li>

          <li onClick={onInquiryClick}>Inquiry</li>

          <li onClick={toggleContactEmail}>
            Contact
            {showContactEmail && (
              <div className="contact-email">connectservice.helpdesk@gmail.com</div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
