import React, { useState, useEffect } from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import InquiryModal from './InquiryModal';
import logo from '../assets/connectlockslogo.png';
import background1 from '../assets/background.png';
import background2 from '../assets/backgroundscroll.png';

const stateCityMap = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'other'],
  Karnataka: ['Bangalore', 'Mysore', 'other'],
  TamilNadu: ['Chennai', 'Coimbatore', 'other'],
  Delhi: ['New Delhi'],
  Gujarat: ['Ahmedabad', 'Surat', 'other'],
  Jharkhand: [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh',
    'Giridih', 'Ramgarh', 'Chaibasa', 'Daltonganj', 'Phusro', 'Gumla',
    'Lohardaga', 'Sahibganj', 'Simdega', 'Latehar', 'Pakur', 'Godda', 'Jhumri Tilaiya', 'other'
  ],
  Bihar: [
    'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Ara',
    'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Bihar Sharif', 'Hajipur',
    'Siwan', 'Motihari', 'Sasaram', 'other'
  ]
};

const Home = () => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const [selectedState, setSelectedState] = useState(localStorage.getItem('state') || '');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('city') || '');

  useEffect(() => {
    if (!localStorage.getItem('state') && !localStorage.getItem('city')) {
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          const detectedState = data.region;
          const detectedCity = data.city;

          if (stateCityMap[detectedState]) {
            const cityList = stateCityMap[detectedState];
            const cityToSet = cityList.includes(detectedCity) ? detectedCity : cityList[0];

            setSelectedState(detectedState);
            setSelectedCity(cityToSet);
            localStorage.setItem('state', detectedState);
            localStorage.setItem('city', cityToSet);
          }
        })
        .catch((err) => console.error('IP location fetch failed:', err));
    }
  }, []);

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    localStorage.setItem('state', state);
    localStorage.removeItem('city');
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    localStorage.setItem('city', city);
  };

  const handleInquiry = () => setShowInquiry(true);

  return (
    <div>
      {/* Section 1: Welcome */}
      <div
        className="home-container"
        style={{ backgroundImage: `url(${background1})` }}
      >
        <Sidebar onInquiryClick={handleInquiry} />

        {/* Location Select Box */}
        <div className="location-dropdown">
          <select
            className="state-select"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">Select State</option>
            {Object.keys(stateCityMap).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {selectedState && (
            <select
              className="city-select"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">Select City</option>
              {stateCityMap[selectedState].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
        </div>

        <div className="home-content">
          <img src={logo} alt="Connect Locks Logo" className="home-logo" />
          <h1>Welcome to Connect Locks</h1>
          <p className="home-slogan">
            “Trust begins at the door – Secure it with Connect Locks.”
          </p>
        </div>
      </div>

      {/* Section 2: Most Popular */}
      <div className="popular-section">
        <h2 className="popular-title">Most Popular</h2>
        <div className="popular-grid">
          {[
            { src: '/assets/popular/img1.png', label: 'Smart Lock' },
            { src: '/assets/popular/img2.png', label: 'Hotel Lock' },
            { src: '/assets/popular/img3.png', label: 'Cabinet Handle' },
          ].map((item, idx) => (
            <div
              className="popular-card"
              key={idx}
              onClick={() => setModalSrc(item.src)}
            >
              <img src={item.src} alt={item.label} className="popular-img" />
              <p className="popular-label">{item.label}</p>
            </div>
          ))}
        </div>

        {modalSrc && (
          <div className="modal" onClick={() => setModalSrc(null)}>
            <span className="close">&times;</span>
            <img src={modalSrc} alt="Zoomed" className="modal-img" />
          </div>
        )}
      </div>

      {/* Section 3: Scroll background */}
      <div
        className="scroll-section"
        style={{ backgroundImage: `url(${background2})` }}
      ></div>

      {showInquiry && <InquiryModal onClose={() => setShowInquiry(false)} />}
    </div>
  );
};

export default Home;
