import React from 'react';
import './AboutUs.scss';
import Map from '../Map';

function AboutUs() {
  const coordinates = { latitude: 32.995648, longitude: -117.271133 }; // 639 Ida Ave, Solana Beach
  
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        At our facility, we specialize in providing individual dog care with a focus on their comfort and well-being. Each dog enjoys ample space to roam and play, access to a secure backyard with a security perimeter, and loving caretakers who treat every dog like family.
      </p>
      <p>
        Whether your dog needs a temporary stay or a long-term arrangement, we ensure they are safe, happy, and loved.
      </p>

      <div className="map-container">
        <h2>Our Location</h2>
        <Map coordinates={coordinates} />
      </div>
      <div>
        639 Ida Ave, Solana Beach CA 92075
      </div>
    </div>
  );
}

export default AboutUs;
