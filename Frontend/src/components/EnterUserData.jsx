import React, { useState } from "react";
import { db } from "../firebaseConfig";

const EnterUserData = () => {
  const [formData, setFormData] = useState({
    height: "",
    chest: "",
    waist: "",
    shoulder: "",
    neck: "",
    arm: "",
  });

  const [suggestedSize, setSuggestedSize] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    suggestClothingSize();
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <center>Enter Your Key Measurements</center>
        </h2>

        {/* Essential Fields */}
        <div className="space-y-4 mb-6">
          <label className="block">
            <span className="text-gray-700">Height (cm):</span>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">
              Chest/Bust Circumference (cm):
            </span>
            <input
              type="number"
              name="chest"
              value={formData.chest}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Waist Circumference (cm):</span>
            <input
              type="number"
              name="waist"
              value={formData.waist}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Shoulder Width (cm):</span>
            <input
              type="number"
              name="shoulder"
              value={formData.shoulder}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="space-y-4 mb-6">
          <label className="block">
            <span className="text-gray-600">Neck Circumference (cm):</span>
            <input
              type="number"
              name="neck"
              value={formData.neck}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Arm Length (cm):</span>
            <input
              type="number"
              name="arm"
              value={formData.arm}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Measurements
        </button>
      </form>
    </div>
  );
};

export default EnterUserData;
