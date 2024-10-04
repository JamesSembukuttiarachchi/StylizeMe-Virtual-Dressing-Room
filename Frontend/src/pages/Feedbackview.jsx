import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf"; // Importing jsPDF
import "jspdf-autotable"; // Importing jsPDF AutoTable
import { Pie } from "react-chartjs-2"; // Importing Pie for the chart
import { Chart, registerables } from "chart.js"; // Importing Chart.js components
import headerImage from "../images/Header3.png"; // Importing the header image
import Layout from "../components/layout/Layout";

// Register the Chart.js components
Chart.register(...registerables);

const FeedbackView = () => {
  const { feedbackId } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [allFeedbackData, setAllFeedbackData] = useState([]); // State to store all feedback
  const [chartData, setChartData] = useState({}); // State for chart data
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

    const fetchAllFeedback = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbackList = querySnapshot.docs.map((doc) => doc.data());
        setAllFeedbackData(feedbackList); // Set all feedback data

        // Count experiences for chart
        const experienceCount = {
          excellent: 0,
          average: 0,
          good: 0,
          poor: 0,
        };

        feedbackList.forEach((feedback) => {
          const exp = feedback.experience
            ? feedback.experience.toLowerCase()
            : "";
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
        console.error("Error fetching all feedback: ", error);
      }
    };

    fetchFeedbackById();
    fetchAllFeedback();
  }, [feedbackId]);

  // Function to generate PDF report
  const generatePDF = () => {
    if (!feedbackData) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("User Feedback Report", 14, 22);

    // Table with feedback data
    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Name", feedbackData.userName || "N/A"],
        ["Address", feedbackData.userAddress || "N/A"],
        ["Overall Experience", feedbackData.experience || "N/A"],
        ["Ease of Use", feedbackData.easeOfUse || "N/A"],
        ["Pattern Selection", feedbackData.patternSelection || "N/A"],
        ["Comments", feedbackData.comments || "N/A"],
      ],
    });

    // Save the PDF file
    doc.save("User_Feedback_Report.pdf");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="mb-8">
          <img src={headerImage} alt="Feedback Header" className="w-full" />
        </div>

        <div className="max-w-4xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-bold text-center text-blue-800">
            Feedback Details
          </h2>

          {feedbackData ? (
            <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
              {/* Pie Chart */}
              <div className="w-full md:w-1/2">
                <h3 className="mb-4 text-2xl font-bold text-center">
                  User Experience Ratings
                </h3>
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

              {/* Feedback Details */}
              <div className="w-full space-y-4 md:w-1/2">
                <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                  <p className="text-lg font-semibold text-gray-600">
                    <strong>Name:</strong> {feedbackData.userName}
                  </p>
                </div>
                <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                  <p className="text-lg font-semibold text-gray-600">
                    <strong>Address:</strong> {feedbackData.userAddress}
                  </p>
                </div>
                <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                  <p className="text-lg font-semibold text-gray-600">
                    <strong>Overall Experience:</strong>
                  </p>
                  <p className="text-gray-600">{feedbackData.experience}</p>
                </div>
                <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                  <p className="text-lg font-semibold text-gray-600">
                    <strong>Ease of Use:</strong>
                  </p>
                  <p className="text-gray-600">{feedbackData.easeOfUse}</p>
                </div>
                <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                  <p className="text-lg font-semibold text-gray-600">
                    <strong>Pattern Selection:</strong>
                  </p>
                  <p className="text-gray-600">
                    {feedbackData.patternSelection}
                  </p>
                </div>
                <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                  <p className="text-lg font-semibold text-gray-600">
                    <strong>Comments:</strong>
                  </p>
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
                    Delete My Feedback
                  </button>

                  <button
                    onClick={generatePDF}
                    className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Generate report
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Loading feedback data...
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackView;
