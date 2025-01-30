import { Link, useLocation } from "react-router-dom";
import logo from '/dog_logo.png';
import './Nav.scss';

const Nav = () => {
    const location = useLocation();

    return (
        <div className='header'>
            <div className='logo-container'>
                <Link className='logo' to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>

            <div className='nav-bar'>
            {/* <Link className='link' to="/">Home</Link> */}
                <Link className={`link ${location.pathname === "/schedule" ? "active" : ""}`} to="/schedule">Schedule</Link>
                <Link className={`link ${location.pathname === "/dogs" ? "active" : ""}`} to="/dogs">Dogs</Link>
                <Link className={`link ${location.pathname === "/about-us" ? "active" : ""}`} to="/about-us">About</Link>
                <Link className={`link ${location.pathname === "/contact-us" ? "active" : ""}`} to="/contact-us">Contact</Link>
            </div>
        </div>
    );
}

export default Nav;