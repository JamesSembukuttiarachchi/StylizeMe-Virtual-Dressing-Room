import React, { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/UserData";
import Layout from "../components/layout/Layout";
import headerImage from "../images/Header3.png"; // Importing the header image

const MyFeedback = () => {
  const { userData, loading: userLoading, error: userError } = useUserData(); // Fetch logged-in user details
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (userData && !userLoading) {
        setLoading(true); // Set loading to true when starting the fetch
        try {
          // Create a query to only fetch feedbacks for the logged-in user
          const feedbackQuery = query(
            collection(db, "feedback"),
            where("userName", "==", userData.name) // Filter by logged-in user's username
          );
          const feedbackSnapshot = await getDocs(feedbackQuery);
          const feedbackList = feedbackSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFeedbacks(feedbackList);
        } catch (err) {
          setError("Failed to fetch feedbacks.");
        } finally {
          setLoading(false); // Set loading to false after the fetch completes
        }
      }
    };

    fetchFeedbacks();
  }, [userData, userLoading]); // Only fetch feedbacks once userData is fully loaded and available

  const handleDelete = async (feedbackId) => {
    try {
      await deleteDoc(doc(db, "feedback", feedbackId));
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== feedbackId)); // Remove from state after deletion
      Swal.fire("Deleted!", "Your feedback has been deleted.", "success");
    } catch (err) {
      Swal.fire(
        "Error!",
        "There was an error deleting your feedback.",
        "error"
      );
    }
  };

  const handleUpdate = (feedbackId) => {
    navigate(`/feedbackupdate/${feedbackId}`); // Redirect to update feedback form
  };

  // Handle loading and error states
  if (userLoading || loading) return <p>Loading...</p>;
  if (userError || error) return <p>Error: {userError || error}</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
      <div className="mb-8">
          <img src={headerImage} alt="Feedback Header" className="w-full" />
        </div>
        <h2 className="text-2xl font-bold mb-6 mx-4">My Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p>No feedbacks available for you.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                {/* Only show fields except username */}
                <p>
                  <strong>Address:</strong> {feedback.userAddress}
                </p>
                <p>
                  <strong>Experience:</strong> {feedback.experience}
                </p>
                <p>
                  <strong>Ease of Use:</strong> {feedback.easeOfUse}
                </p>
                <p>
                  <strong>Pattern Selection:</strong>{" "}
                  {feedback.patternSelection}
                </p>

                {/* Update and Delete buttons */}
                <div className="mt-4">
                  <button
                    onClick={() => handleUpdate(feedback.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(feedback.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyFeedback;
