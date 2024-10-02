// src/pages/TShirtPage.js

import React, { useState } from 'react';
import TShirtCard from '../components/TShirtCard';
import PoseDetection from '../components/PoseDetection'; // Import the PoseDetection component created earlier
import orangeTShirt from '../assets/orange.png'; // Import the T-shirt image
import sunglass from '../assets/sunglass.png'; // Import the T-shirt image

const ViewTshirt = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleShowOverlay = () => {
    setShowOverlay(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className='flex flex-row gap-5'>
        {!showOverlay ? (
        <TShirtCard
          title="Orange T-shirt"
          image={orangeTShirt}
          onShowOverlay={handleShowOverlay}
        />
      ) : (
        <PoseDetection />
      )}
      {!showOverlay ? (
        <TShirtCard
          title="Black Sunglass"
          image={sunglass}
          onShowOverlay={handleShowOverlay}
        />
      ) : (
        <PoseDetection />
      )}
        </div>

    </div>
  );
};

export default ViewTshirt;
