import React from "react";
import popular1 from "../assets/popular1.jpeg";
import popular2 from "../assets/popular2.jpeg";
import Testimonials from "../components/Testimonials";

const supplementCategoryItems = [
  { id: 1, image: "src/assets/sup_fat.png" },
  { id: 2, image: "src/assets/sup_fat.png" },
  { id: 3, image: "src/assets/sup_fat.png" },
  { id: 4, image: "src/assets/sup_fat.png" },
  { id: 5, image: "src/assets/sup_fat.png" },
  { id: 6, image: "src/assets/sup_fat.png" },
];

const PopularCategories = () => {
  return (
    <div className="section-container bg-gray-100 py-5">
      <div className="mx-auto max-w-screen-xl px-2 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            POPULAR CATEGORIES
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Browse through our store and discover your favourite products from
            world class brands.
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li>
            <a href="/product" className="group relative block">
              <img
                src={popular1}
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-black">Womens</h3>

                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Shop Now
                </span>
              </div>
            </a>
          </li>

          <li>
            <a href="/product" className="group relative block">
              <img
                src={popular2}
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Mens</h3>

                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Shop Now
                </span>
              </div>
            </a>
          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href="/product" className="group relative block">
              <img
                src="https://cdn.australia247.info/assets/uploads/3caf9a041fb884963b933fe99cc58d95_-south-australia-city-of-prospect-prospect-nutrition-warehouse-prospecthtml.jpg"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-black">Supplements</h3>

                <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Shop Now
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <Testimonials/>
    </div>
  );
};

export default PopularCategories;