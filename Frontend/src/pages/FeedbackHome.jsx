import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import headerImage from "../assets/headerFeedback.png";
import footerImage from "../images/feedbackhome.png";
import Layout from "../components/layout/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication

// Register the Chart.js components
Chart.register(...registerables);

const FeedbackHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chartData, setChartData] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track if user is logged in

  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 6;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbackList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbacks(feedbackList);
        setFilteredFeedbacks(feedbackList); // Set the initial filtered feedbacks to all feedbacks

        // Count experiences for chart
        const experienceCount = {
          excellent: 0,
          average: 0,
          good: 0,
          poor: 0,
        };

        feedbackList.forEach((feedback) => {
          const exp = feedback.experience.toLowerCase();
          if (experienceCount.hasOwnProperty(exp)) {
            experienceCount[exp]++;
          }
        });

        setChartData({
          labels: Object.keys(experienceCount),
          datasets: [
            {
              label: "User Experience",
              data: Object.values(experienceCount),
              backgroundColor: [
                "rgba(75, 192, 192, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(255, 99, 132, 0.7)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Update the filtered feedbacks whenever the search term changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = feedbacks.filter(
      (feedback) =>
        feedback.experience &&
        feedback.experience.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredFeedbacks(filtered);
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, feedbacks]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user); // Set true if user is logged in
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen  text-black bg-gray-100">
        <div className="">
          <img
            src={headerImage}
            alt="Header"
            className="w-full mb-8 shadow-lg"
          />

          <div className="flex justify-between items-center w-full mb-8 px-4">
            {/* Search Bar */}
            <div className="flex items-center w-full max-w-xl border-2 border-gray-300 rounded-md overflow-hidden shadow-sm focus-within:ring focus-within:ring-blue-200">
              {/* Search Icon */}
              <div className="px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="20px"
                  className="fill-gray-600"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search by experience (e.g. good, excellent)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 text-gray-700 border-none focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Add Feedback Button */}
            <div className="flex">
              {isUserLoggedIn && (
                <>
                  <div className="ml-4">
                    <a
                      href="/MyFeedback"
                      className="px-6 py-3 text-white transition-transform duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
                    >
                      View My Feedback
                    </a>
                  </div>
                  <div className="ml-4">
                    <a
                      href="/Feedback"
                      className="px-6 py-3 text-white transition-transform duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
                    >
                      Add My Feedback
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Display Filtered Feedbacks */}
          {/* Display Feedbacks */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mx-5">
            {currentFeedbacks.length > 0 ? (
              currentFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-6 bg-white rounded-lg shadow-lg"
                >
                  <p className="mb-4 text-lg italic font-semibold text-center text-gray-700">
                    <b>"{feedback.comments}"</b>
                  </p>
                  <div className="text-center">
                    <p className="text-xl font-bold text-blue-900">
                      {feedback.userName || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {feedback.userRole || "User"}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm font-bold text-gray-600">
                      Overall Experience:
                    </p>
                    <p className="text-lg font-semibold text-blue-700">
                      {feedback.experience || "Not provided"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No feedback matches the search criteria.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-2 ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-2 bg-gray-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-2 ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-center">
              User Experience Ratings
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                {chartData.labels && chartData.labels.length > 0 ? (
                  <Pie
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: true,
                          labels: {
                            font: {
                              size: 14,
                            },
                          },
                        },
                        tooltip: {
                          bodyFont: {
                            size: 14,
                          },
                        },
                      },
                    }}
                    height={250}
                    width={250}
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    No data available for the chart.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackHome;
