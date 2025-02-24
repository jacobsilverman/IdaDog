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
            <div className='ida-desc'>
                Our gated perimeter offers ample outdoor space where dogs can play, exercise, use the bathroom, or simply enjoy the fresh air at any time of day. For those who prefer indoor comfort, we provide three cozy bedrooms and a spacious living room to relax and unwind. <br /><br />We ensure your dog stays active with daily walks, often going out for two walks a day. At Ida Dog, we prioritize training and good manners, helping your dog become the best version of themselves. Whether your pup is just learning to sit on command or already excels at picking up new tricks, we tailor challenges to their skill level, ensuring growth and enrichment every step of the way.
            </div>
            <div className='prices-container'>
                {priceComponent("daily", 50)}
                {priceComponent("weekly", 45)}
                {priceComponent("monthly", 40)}
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