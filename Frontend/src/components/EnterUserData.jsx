import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import serverTimestamp
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Suggest clothing size based on measurements
  const suggestClothingSize = () => {
    const { chest, waist, shoulder } = formData;

    const chestNum = Number(chest);
    const waistNum = Number(waist);
    const shoulderNum = Number(shoulder);

    if (
      chestNum >= 76 &&
      chestNum <= 82 &&
      waistNum >= 58 &&
      waistNum <= 64 &&
      shoulderNum >= 35 &&
      shoulderNum <= 38
    ) {
      setSuggestedSize("XS");
    } else if (
      chestNum >= 83 &&
      chestNum <= 89 &&
      waistNum >= 65 &&
      waistNum <= 71 &&
      shoulderNum >= 39 &&
      shoulderNum <= 42
    ) {
      setSuggestedSize("S");
    } else if (
      chestNum >= 90 &&
      chestNum <= 96 &&
      waistNum >= 72 &&
      waistNum <= 78 &&
      shoulderNum >= 43 &&
      shoulderNum <= 45
    ) {
      setSuggestedSize("M");
    } else if (
      chestNum >= 97 &&
      chestNum <= 103 &&
      waistNum >= 79 &&
      waistNum <= 85 &&
      shoulderNum >= 46 &&
      shoulderNum <= 48
    ) {
      setSuggestedSize("L");
    } else if (
      chestNum >= 104 &&
      chestNum <= 110 &&
      waistNum >= 86 &&
      waistNum <= 92 &&
      shoulderNum >= 49 &&
      shoulderNum <= 51
    ) {
      setSuggestedSize("XL");
    } else if (
      chestNum >= 111 &&
      chestNum <= 117 &&
      waistNum >= 93 &&
      waistNum <= 99 &&
      shoulderNum >= 52 &&
      shoulderNum <= 54
    ) {
      setSuggestedSize("XXL");
    } else {
      setSuggestedSize("Size Not Found");
    }
  };

  // Function to send data to Firestore
  const sendDataToFirestore = async () => {
    try {
      // Add a timestamp to the data
      const dataWithTimestamp = { ...formData, timestamp: serverTimestamp() };

      // Reference to the "userdata" collection
      const docRef = await addDoc(
        collection(db, "userdata"),
        dataWithTimestamp
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    suggestClothingSize(); // Suggest size before submitting
    await sendDataToFirestore();

    // Redirect to UserSizeRecm page after successful submission
    navigate("/size");
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Enter Your Key Measurements
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

          {/* Centered Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Measurements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterUserData;
