import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import headerImage from '../images/Header.png';
import footerImage from '../images/feedbackhome.png';

// Register the Chart.js components
Chart.register(...registerables);

const FeedbackHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbackList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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

        feedbackList.forEach(feedback => {
          const exp = feedback.experience.toLowerCase();
          if (experienceCount.hasOwnProperty(exp)) {
            experienceCount[exp]++;
          }
        });

        setChartData({
          labels: Object.keys(experienceCount),
          datasets: [
            {
              label: 'User Experience',
              data: Object.values(experienceCount),
              backgroundColor: [
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
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
    const filtered = feedbacks.filter(feedback => 
      feedback.experience && feedback.experience.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredFeedbacks(filtered);
  }, [searchTerm, feedbacks]);

  return (
    <div className="min-h-screen py-12 text-black bg-gray-100">
      <div className="container px-4 mx-auto">
        <img src={headerImage} alt="Header" className="w-full mb-8 rounded-lg shadow-lg" />

        <h1 className="mb-8 text-5xl font-extrabold text-center text-black-700">Feedbacks and Testimonials</h1>

        <div className="flex justify-center mb-12">
          <a
            href="/Feedback"
            className="px-6 py-3 text-white transition-transform duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
          >
            Add My Feedback
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by experience (e.g. good, excellent)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-center">User Experience Ratings</h2>
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
                <p className="text-center text-gray-500">No data available for the chart.</p>
              )}
            </div>
          </div>
        </div>

        {/* Display Filtered Feedbacks */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <div 
                key={feedback.id} 
                className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl"
              >
                <p className="mb-4 text-lg italic font-semibold text-center text-gray-700">
                  <b>"{feedback.comments}"</b>
                </p>

                <div className="flex items-center justify-center mt-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-blue-900">{feedback.userName || "Anonymous"}</p>
                    <p className="text-sm text-gray-500">{feedback.userRole || "User"}</p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm font-bold text-gray-600">Overall Experience:</p>
                  <p className="text-lg font-semibold text-blue-700">{feedback.experience || "Not provided"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No feedback matches the search criteria.</p>
          )}
        </div>

        <div className="mt-12">
          <img src={footerImage} alt="Footer" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default FeedbackHome;
