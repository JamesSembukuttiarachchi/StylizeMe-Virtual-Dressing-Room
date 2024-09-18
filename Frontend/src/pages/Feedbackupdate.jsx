import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import headerImage from '../images/Header4.png'; // Importing the header image
import Swal from 'sweetalert2'; // Import SweetAlert2

const FeedbackUpdate = () => {
  const { feedbackId } = useParams();
  const [formData, setFormData] = useState({
    userName: '', // New field for user's name
    userAddress: '', // New field for user's address
    experience: '',
    easeOfUse: '',
    patternSelection: '',
    comments: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (feedbackId) {
      const fetchFeedbackById = async () => {
        try {
          const docRef = doc(db, "feedback", feedbackId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      };

      fetchFeedbackById();
    }
  }, [feedbackId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "feedback", feedbackId);
      await updateDoc(docRef, formData);
      console.log('Feedback updated:', formData);

      // Show SweetAlert success message
      Swal.fire({
        title: 'Success!',
        text: 'Your feedback has been updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate(`/feedbackview/${feedbackId}`);
      });
    } catch (error) {
      console.error("Error updating document: ", error);

      // Show SweetAlert error message
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating your feedback. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-8">
        <img src={headerImage} alt="Update Feedback Header" className="w-full" />
      </div>

      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Update Feedback</h2>
        <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              <option value="good">very Good </option>
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
              className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md shadow w-half hover:bg-indigo-700"
            >
              Update Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackUpdate;
