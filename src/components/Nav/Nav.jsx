import { Link } from "react-router-dom";
import logo from '/dog_logo.png';
import './Nav.scss';

const Nav = () => {
    return (
        <div className='header'>
            <div className='logo-container'>
                <Link className='logo' to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>

            <div className='nav-bar'>
            {/* <Link className='link' to="/">Home</Link> */}
                <Link className='link' to="/schedule">Schedule</Link>
                <Link className='link' to="/dogs">Dogs</Link>
                <Link className='link' to="/about-us">About</Link>
                <Link className='link' to="/contact-us">Contact</Link>
            </div>
        </div>
    );
}

export default Nav;