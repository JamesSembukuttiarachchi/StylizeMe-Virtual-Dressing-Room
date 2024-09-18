import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Swal from 'sweetalert2'; // Importing SweetAlert2
import headerImage from '../images/Header2.png'; // Importing the header image

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    userName: '', // New field for user's name
    userAddress: '', // New field for user's address
    experience: '',
    easeOfUse: '',
    patternSelection: '',
    comments: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "feedback"), formData);
      console.log('Feedback submitted:', formData);

      // Success alert using SweetAlert2
      Swal.fire({
        title: 'Thank you!',
        text: 'Your feedback has been successfully submitted.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate(`/feedbackview/${docRef.id}`);
      });
    } catch (error) {
      console.error("Error adding document: ", error);

      // Error alert using SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your feedback. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-8">
        <img src={headerImage} alt="Feedback Header" className="w-full" />
      </div>

      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Stylezme - Virtual Dressing Room Feedback</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* First column */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Address:</label>
            <input
              type="text"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Second column */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Overall Experience:</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Ease of Use:</label>
            <select
              name="easeOfUse"
              value={formData.easeOfUse}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option value="">Select</option>
              <option value="veryEasy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="neutral">Neutral</option>
              <option value="difficult">Difficult</option>
              <option value="veryDifficult">Very Difficult</option>
            </select>
          </div>

          {/* Full width textarea */}
          <div className="col-span-2 mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Pattern Selection:</label>
            <select
              name="patternSelection"
              value={formData.patternSelection}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option value="">Select</option>
              <option value="easyToFind">Yes, easily</option>
              <option value="tookTime">Yes, but it took some time</option>
              <option value="notFound">No, I couldn’t find them</option>
            </select>
          </div>

          <div className="col-span-2 mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Additional Comments:</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Share any additional feedback here"
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              rows="4"
            />
          </div>

          <div className="flex col-span-2 space-x-4">
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md shadow w-150 hover:bg-indigo-700"
            >
              Submit My Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
