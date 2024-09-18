import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import headerImage from '../images/Header3.png'; // Importing the header image

const FeedbackView = () => {
  const { feedbackId } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackById = async () => {
      try {
        const docRef = doc(db, "feedback", feedbackId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFeedbackData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchFeedbackById();
  }, [feedbackId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-8">
        <img src={headerImage} alt="Feedback Header" className="w-full" />
      </div>

      <div className="max-w-3xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-800">Feedback Details</h2>

        {feedbackData ? (
          <div className="space-y-4">
            <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
              <p className="text-lg font-semibold text-gray-600"><strong>Name:</strong> {feedbackData.userName}</p>
            
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
              <p className="text-lg font-semibold text-gray-600"><strong>Address:</strong> {feedbackData.userAddress}</p>
             
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
              <p className="text-lg font-semibold text-gray-600"><strong>Overall Experience:</strong></p>
              <p className="text-gray-600">{feedbackData.experience}</p>
            </div>

            <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
              <p className="text-lg font-semibold text-gray-600"><strong>Ease of Use:</strong></p>
              <p className="text-gray-600">{feedbackData.easeOfUse}</p>
            </div>

            <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
              <p className="text-lg font-semibold text-gray-600"><strong>Pattern Selection:</strong></p>
              <p className="text-gray-600">{feedbackData.patternSelection}</p>
            </div>

            <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
              <p className="text-lg font-semibold text-gray-600"><strong>Comments:</strong></p>
              <p className="text-gray-600">{feedbackData.comments}</p>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => navigate(`/feedbackupdate/${feedbackId}`)}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Feedback
              </button>

              <button
                onClick={() => navigate(`/feedbackdelete/${feedbackId}`)}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Delete Feedback
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading feedback data...</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackView;
