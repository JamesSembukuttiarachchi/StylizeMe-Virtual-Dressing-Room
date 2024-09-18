import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import headerImage from '../images/Header.png'; // Importing the header image

const FeedbackHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbackList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen py-12 text-black bg-gray-300">
      <div className="container px-4 mx-auto">
        <img src={headerImage} alt="Header" className="mb-8"/> {/* Displaying the header image */}
        <h1 className="mb-8 text-4xl font-bold text-center">Feedbacks and Testimonials</h1>

        <div className="flex justify-center mb-12">
          <a
            href="/Feedback"
            className="px-6 py-3 text-white bg-blue-600 rounded-full shadow hover:bg-blue-700"
          >
            Add My Feedback
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="p-6 text-gray-900 bg-white rounded-lg shadow-lg">
              <p className="mb-4 text-lg italic">
                "{feedback.comments}"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={feedback.userImage || "https://via.placeholder.com/150"}
                    alt={feedback.userName}
                  />
                </div>
                <div>
                  <p className="font-bold">{feedback.userName || "Anonymous"}</p>
                  <p className="text-gray-600">{feedback.userRole || "User"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackHome;
