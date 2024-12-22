import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
          <Link className='link' to="/dogs">dogs</Link>
          <Link className='link' to="/schedule">schedule</Link>
          <Link className='link' to="/about-us">about us</Link>
          <Link className='link' to="/contact-us">contact us</Link>
        </div>
      </div>

      <Routes>
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
      <footer className='footer'>@silverdogz</footer>
    </Router>
  );
}

function Home() {
  return <div>Welcome to the IdaDog!</div>;
}

export default App;