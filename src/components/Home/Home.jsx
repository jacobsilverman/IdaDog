import { Link } from "react-router-dom";
import "./Home.scss";

const  Home = () => {
    const priceComponent = (occ, price) => {
      return (
        <div className='center pricing-component'>
          <div className={occ+'-header'}>
            {occ}
          </div>
          <div>
            <ul>
              <li>
                Price Per Day
              </li>
            </ul>
          </div>
          <div className='price'>
            <b>${price}</b>
          </div>
          <div>
            <Link to='/schedule'>
              <button>
                  Subscribe
              </button>
            </Link>
          </div>
        </div>
      );
    }
  
    return (
        <div>
            <h1>Welcome to IdaDog</h1>
            <div className='prices-container'>
                {priceComponent("daily", 50)}
                {priceComponent("weekly", 45)}
                {priceComponent("monthly", 40)}
            </div>
            <div className='ida-desc'>
              Leaving your dog in someone else’s care can be stressful, which is why we’re here to make that experience as worry-free as possible. At IdaDog, we offer professional dog-sitting services focused on creating a safe, engaging, and nurturing environment for your pet. Whether you need daily visits, overnight stays, or personalized care while you’re away, our goal is to keep tails wagging and routines uninterrupted. We’re passionate about dogs of all breeds and temperaments, and we’re committed to providing attentive, compassionate care that meets their unique needs.
              <br /><br />
              Our facility features a gated perimeter that provides ample outdoor space where your dog can play, exercise, use the bathroom, or simply enjoy the fresh air at any time of day. For those who prefer the indoors, we offer three cozy bedrooms and a spacious living room, where dogs can relax and unwind in comfort. To ensure your dog stays happy and healthy, we provide daily walks—often two per day—and focus on training and good manners. Whether your pup is just learning basic commands or already excelling at new tricks, we tailor challenges to their skill level, promoting growth and enrichment every step of the way.
              <br /><br />
              We only accept one dog reservation at a time, so your pet will receive our full, undivided attention during their stay. With no other animals on the premises, you can have peace of mind knowing your dog will enjoy a quiet, stress-free environment without any concerns about potential conflicts. At IdaDog, we believe in clear communication, reliability, and going the extra mile to provide the best care for your dog.
            </div>
            {/* <div className='home_images'>
                <div>
                  <img src='/ida2.png' className='ida' />
                </div>
                <div>
                  <img src='/ida3.png' className='ida' />
                </div>
                <div>
                  <img src='/ida4.png' className='ida' />
                </div>
                <div>
                  <img src='/ida5.png' className='ida' />
                </div>
            </div> */}
        </div>
    );
}
export default Home;