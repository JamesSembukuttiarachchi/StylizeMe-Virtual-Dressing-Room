import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { auth } from "../firebaseConfig";

const SaveSizes = ({ user }) => {
  const [neckSize, setNeckSize] = useState("");
  const [shoulderWidth, setShoulderWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          neckSize,
          shoulderWidth,
          length,
          height,
          gender
        });
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Measurements updated successfully!",
        confirmButtonText: "Next",
      }).then(() => {
        navigate("/userprofile");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update measurements.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Save Your Measurements
        </h2>

        <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="height"
              >
                Height (in cm)
              </label>
              <input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="neckSize"
          >
            Neck Size (in cm)
          </label>
          <input
            type="number"
            id="neckSize"
            value={neckSize}
            onChange={(e) => setNeckSize(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="shoulderLength"
          >
            Shoulder Width (in cm)
          </label>
          <input
            type="number"
            id="shoulderWidth"
            value={shoulderWidth}
            onChange={(e) => setShoulderWidth(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lengthInCm"
          >
            Length (in cm)
          </label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaveSizes;
