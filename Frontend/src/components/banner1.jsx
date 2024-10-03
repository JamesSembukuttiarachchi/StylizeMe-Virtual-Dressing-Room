import React from "react";

const banner1 = () => {
  return (
    <section
      className="bg-gray-900 text-white mb-3"
      style={{
        backgroundImage: `url('/banner1-bg.jpg')`, // Use the correct filename here
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px", // Set a height for the section
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-10 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            3D VIRTUAL FITTING AND
            <span className="sm:block"> STYLING </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Try on items, get accurate size recommendations and style outfits –
            all from within your elevated online store.
          </p>

          {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div> */}
        </div>
      </div>
    </section>
  );
};

export default banner1;
