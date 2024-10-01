import React from "react";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#212e5a] from-0% to-[#656565] to-100% py-10">
      <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="md:w-1/2 space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl text-white md:leading-snug leading-snug">
            Try on outfits instantly and find your perfect fit!
            </h2>
            <button className="btn bg-gray-600 py-3 text-white rounded-full">
              Shop now
            </button>
          </div>
          <div className="md:w-1/4 ">
            <img src="src/assets/BnrImg6RM.png" alt="banner img" />
          </div>

      </div>
    </div>
  );
};

export default Banner;