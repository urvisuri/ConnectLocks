import React, { useState, useEffect } from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import InquiryModal from './InquiryModal';
import logo from '../assets/connectlockslogo.png';
import background2 from '../assets/backgroundscroll.png';
import ImageSlider from './ImageSlider';
import concealedCloser from '../assets/ConcealedDoorCloser.png';


const stateCityMap = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'other'],
  Karnataka: ['Bangalore', 'Mysore', 'other'],
  TamilNadu: ['Chennai', 'Coimbatore', 'other'],
  Delhi: ['New Delhi'],
  Gujarat: ['Ahmedabad', 'Surat', 'other'],
  Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Chaibasa', 'Daltonganj', 'Phusro', 'Gumla', 'Lohardaga', 'Sahibganj', 'Simdega', 'Latehar', 'Pakur', 'Godda', 'Jhumri Tilaiya', 'other'],
  Bihar: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Ara', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Bihar Sharif', 'Hajipur', 'Siwan', 'Motihari', 'Sasaram', 'other']
};

const Home = () => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [selectedState, setSelectedState] = useState(localStorage.getItem('state') || '');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('city') || '');
  const [showMore, setShowMore] = useState(false); // For Read More toggle

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
    <div className="home-container">
      {/* Top Navigation Bar */}
      <div className="top-bar">
        <div className="top-left">
          <Sidebar onInquiryClick={handleInquiry} />
          <img src={logo} alt="Connect Locks Logo" className="top-logo-large" />
          <div className="title-block">
            <h1 className="top-title">Secure Elegance. Trusted Access.</h1>
            <p className="top-subtitle">– Where Smart Meets Strong</p>
          </div>
        </div>

        <div className="app-container" style={{ marginTop: 0, paddingTop: 0 }}>
  {/* all your layout here */}
</div>


        <div className="location-select">
          <select value={selectedState} onChange={(e) => handleStateChange(e.target.value)}>
            <option value="">Select State</option>
            {Object.keys(stateCityMap).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {selectedState && (
            <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
              <option value="">Select City</option>
              {stateCityMap[selectedState].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Image Slider Section */}
      <ImageSlider />

      {/* About Us Section with Read More */}
      <div className="company-intro">
        <h2>About Us</h2>
        <p>
          ConnectLocks is a premier destination for modern, stylish, and high-security locking solutions, 
          offering a curated selection of both smart and mechanical locks tailored to residential, commercial,
          and industrial spaces. Our product range includes smart locks, mortise locks, door handles, knobs, 
          telescopic channels, auto hinges, and cabinet handles—all crafted to blend cutting-edge functionality with 
          sophisticated design. Whether it’s a high-tech smart lock for your front door or a finely finished mortise handle 
          for your office, every product we offer reflects design precision, durability, and uncompromising quality. 
          We serve clients across residential, commercial, and institutional segments—bringing secure innovations 
          right to your doorstep and delivering not just products, but peace of mind.
        </p>
        {showMore && (
          <p className="read-more-content">
            At ConnectLocks, we don’t just sell locks—we deliver security, sophistication, and seamless access. 
            With a mission to redefine how the world experiences locking systems, we combine modern technology 
            with architectural aesthetics to enhance every environment we serve. Each product undergoes stringent 
            quality checks to ensure performance that lasts, while our designs complement modern spaces with both 
            elegance and strength. Our Pan-India presence ensures that whether you're in a metro city or a remote town, 
            you get timely service and support. With a customer-first approach, we’re committed to transparency, trust, 
            and long-term relationships—making ConnectLocks a brand you can truly rely on.
          </p>
          
        )}
        <button className="read-more-btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Read Less ▲' : 'Read More ▼'}
        </button>
      </div>

{/* Concealed Door Closer Info Section */}
<div className="photo-section">
  <div className="photo-content">
    <div className="photo-text">
      <h2>Concealed Door Closer</h2>
      <p>
        Concealed Door Closer is a premium, high-performance door control solution designed for modern interiors where aesthetics and functionality go hand in hand. Installed within the door leaf and frame, it remains invisible when the door is closed, offering a clean, seamless look without compromising on performance.
      </p>
    </div>
    <img
      src={concealedCloser}
      alt="Concealed Door Closer"
      className="photo-image"
    />
  </div>
</div>



      {/* Scrolling Background Section */}
      <div className="scroll-section">
        <img src={background2} alt="Scrolling Background" className="scroll-img" />
      </div>

      {/* Inquiry Modal */}
      {showInquiry && <InquiryModal onClose={() => setShowInquiry(false)} />}
    </div>
  );
};

export default Home;
