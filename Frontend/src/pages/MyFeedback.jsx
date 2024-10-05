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
import headerImage from "../assets/FeedbackBnr.png"; // Importing the header image

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
        <h2 className="text-2xl font-bold mb-4 mx-4">My Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p>No feedbacks available for you.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-4 pb-20">
            {feedbacks.map((feedback) => (
              // <div
              //   key={feedback.id}
              //   className="bg-white p-6 rounded-lg shadow-md"
              // >
              //   {/* Only show fields except username */}
              //   <p>
              //     <strong>Address:</strong> {feedback.userAddress}
              //   </p>
              //   <p>
              //     <strong>Experience:</strong> {feedback.experience}
              //   </p>
              //   <p>
              //     <strong>Ease of Use:</strong> {feedback.easeOfUse}
              //   </p>
              //   <p>
              //     <strong>Pattern Selection:</strong>{" "}
              //     {feedback.patternSelection}
              //   </p>

              //   {/* Update and Delete buttons */}
              //   <div className="mt-4">
              //     <button
              //       onClick={() => handleUpdate(feedback.id)}
              //       className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              //     >
              //       Update
              //     </button>
              //     <button
              //       onClick={() => handleDelete(feedback.id)}
              //       className="bg-red-500 text-white px-4 py-2 rounded-md"
              //     >
              //       Delete
              //     </button>
              //   </div>
              // </div>
              <div
                key={feedback.id}
                class="font-[sans-serif] max-w-[410px] h-auto p-6 rounded-lg mx-auto shadow-[0_6px_18px_-6px_rgba(193,195,248)] bg-white relative mt-12 w-full"
              >
                <img
                  src="https://readymadeui.com/profile_2.webp"
                  class="w-16 h-16 rounded-full absolute right-0 left-0 mx-auto -top-7"
                />
                <div class="mt-6 text-center">
                  <div>
                    <h4 class="text-sm font-extrabold text-gray-800">
                      {feedback.userName}
                    </h4>
                    <p class="text-xs text-gray-500 mt-0.5"></p>
                  </div>

                  <div class="mt-4">
                    <h2 class="text-lg font-extrabold text-blue-800 mb-2 text-transform: uppercase">
                      <strong>Experience:</strong>
                      {feedback.experience}
                    </h2>
                    <p class="text-sm text-gray-800 leading-relaxed mb-4">
                      {feedback.comments}
                    </p>
                    <p className="leading-relaxed">
                      <strong>Address:</strong> {feedback.userAddress}
                    </p>
                    <p className="leading-relaxed">
                      <strong>Ease of Use:</strong> {feedback.easeOfUse}
                    </p>
                    <p className="leading-relaxed">
                      <strong>Ease of Use:</strong> {feedback.easeOfUse}
                    </p>
                  </div>

                  {feedback.experience == "excellent" && (
                    <div class="flex justify-center space-x-1 mt-4">
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  )}
                  {feedback.experience == "good" && (
                    <div class="flex justify-center space-x-1 mt-4">
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  )}
                  {feedback.experience == "average" && (
                    <div class="flex justify-center space-x-1 mt-4">
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  )}
                  {feedback.experience == "poor" && (
                    <div class="flex justify-center space-x-1 mt-4">
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Update and Delete buttons */}
                 <div className="flex justify-center mt-4">
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
