import React from 'react';
import orange from '../assets/orange.png';

const ProductCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <nav className="flex text-gray-500 mb-4">
        <span>Products</span> / <span>Sneakers</span>
      </nav>
      <div className=" flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <img
          src={orange} // Replace with actual image URL
          alt="Product"
          className="w-full lg:w-1/2 rounded"
        />
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Orange Tshirt</h2>
          <p className="text-lg text-gray-600 mb-2">Nike SB</p>
          <div className="flex items-center mb-4">
            <span className="text-blue-500 text-xl">★★★★☆</span> {/* Adjust for actual star ratings */}
          </div>
          <p className="text-gray-700 mb-4">
            Gray skate shoe. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
          <div className="text-2xl font-bold text-gray-900 mb-4">$15</div>
          <div className="flex gap-4">
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition">
              ❤️
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Other products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Example product cards */}
          <div className="border rounded p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Other product"
              className="mb-2"
            />
            <p className="text-sm text-gray-600">Product Name</p>
          </div>
          {/* Repeat the above div for more products */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
