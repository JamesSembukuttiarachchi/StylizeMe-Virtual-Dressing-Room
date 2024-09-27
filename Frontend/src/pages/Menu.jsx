import React, { useState } from "react";
import ProductList from "../components/ProductList";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex bg-slate-200 min-h-screen">
      {/* Vertical Navigation */}
      <nav className="w-1/8 bg-black text-white p-6 shadow-lg">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleCategoryClick("Male")}
              className="block w-full text-left py-2 px-4 rounded-lg text-white hover:bg-gray-300 hover:text-black"
            >
              MEN
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("Female")}
              className="block w-full text-left py-2 px-4 rounded-lg text-white hover:bg-gray-300 hover:text-black"
            >
              WOMEN
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("")}
              className="block w-full text-left py-2 px-4 rounded-lg text-white hover:bg-gray-300 hover:text-black"
            >
              WARDROBE
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <ProductList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Menu;
