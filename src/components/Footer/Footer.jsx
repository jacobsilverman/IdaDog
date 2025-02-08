import './Footer.scss';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    return (
        <footer className='footer'>
            <div>
                @IdaDog
            </div>
            <div>
                <SocialIcon className='social-icon-footer' network="facebook" url="https://facebook.com/jacob.silverman.73" />
                <SocialIcon className='social-icon-footer' network="instagram" url="https://instagram.com/hardpersontofind" />
                <SocialIcon className='social-icon-footer' network="linkedin" url="https://linkedin.com/in/jacobsilverman0" />
                <SocialIcon className='social-icon-footer' network="github" url="https://github.com/jacobsilverman" />
            </div> 
        </footer> 
    );
}

export default Footer