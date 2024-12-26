import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons'
import './App.scss';
import logo from '/dog_logo.png';
import Schedule from './Schedule';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Dogs from './Dogs';

function App() {
  return (
    <Router>
      <div className='header'>
        <div className='logo-container'>
          <Link className='logo' to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className='nav-bar'>
          <Link className='link' to="/dogs">Dogs</Link>
          <Link className='link' to="/schedule">Schedule</Link>
          <Link className='link' to="/about-us">About</Link>
          <Link className='link' to="/contact-us">Contact</Link>
        </div>
      </div>

      <Routes>
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
      </Routes>
{/*       
      <div className='footer1'>

        <SocialIcon url="https://facebook.com" />
        <SocialIcon url="https://instagram.com" />
      </div> */}

      <footer className='footer'>
        @silverdogz
      </footer>
    </Router>
  );
}

function Home() {
  return <div>Welcome to the IdaDog!</div>;
}

export default App;