import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

const UserReport = () => {
  const { feedbackId } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [chartData, setChartData] = useState({});
  const [experienceCount, setExperienceCount] = useState({
    excellent: 0,
    average: 0,
    good: 0,
    poor: 0,
  });
  const chartRef = useRef(null);

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
        const feedbackList = querySnapshot.docs.map(doc => doc.data());

        const experienceCount = {
          excellent: 0,
          average: 0,
          good: 0,
          poor: 0,
        };

        feedbackList.forEach(feedback => {
          const exp = feedback.experience ? feedback.experience.toLowerCase() : "";
          if (experienceCount.hasOwnProperty(exp)) {
            experienceCount[exp]++;
          }
        });

        setExperienceCount(experienceCount);

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
        console.error("Error fetching all feedback: ", error);
      }
    };

    fetchFeedbackById();
    fetchAllFeedback();
  }, [feedbackId]);

  const generatePDF = () => {
    if (!feedbackData || !chartData.labels) return;

    html2canvas(chartRef.current).then(canvas => {
      const chartImage = canvas.toDataURL("image/png");
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text('User Feedback Report', 14, 22);

      // Table with feedback data
      doc.autoTable({
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Name', feedbackData.userName || 'N/A'],
          ['Address', feedbackData.userAddress || 'N/A'],
          ['Overall Experience', feedbackData.experience || 'N/A'],
          ['Ease of Use', feedbackData.easeOfUse || 'N/A'],
          ['Pattern Selection', feedbackData.patternSelection || 'N/A'],
          ['Comments', feedbackData.comments || 'N/A'],
        ],
      });

      // Summary Table for Experience Count
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [['Experience Type', 'Count']],
        body: [
          ['Excellent', experienceCount.excellent],
          ['Good', experienceCount.good],
          ['Average', experienceCount.average],
          ['Poor', experienceCount.poor],
        ],
      });

      // Add chart image to PDF
      doc.addImage(chartImage, 'PNG', 14, doc.autoTable.previous.finalY + 10, 180, 90);

      // Save the PDF
      doc.save('User_Feedback_Report.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-800">SytlezMe User Feedback Report</h2>

        {feedbackData ? (
          <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
            {/* Pie Chart */}
            <div className="w-full md:w-1/2">
              <h3 className="mb-4 text-2xl font-bold text-center">User Experience Ratings</h3>
              <div className="flex justify-center">
                <div ref={chartRef} className="w-full max-w-xs">
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

            {/* Feedback Details */}
            <div className="w-full space-y-4 md:w-1/2">
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <p className="text-lg font-semibold text-gray-600"><strong>Name:</strong> {feedbackData.userName}</p>
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <p className="text-lg font-semibold text-gray-600"><strong>Address:</strong> {feedbackData.userAddress}</p>
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <p className="text-lg font-semibold text-gray-600"><strong>Overall Experience:</strong> {feedbackData.experience}</p>
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <p className="text-lg font-semibold text-gray-600"><strong>Ease of Use:</strong> {feedbackData.easeOfUse}</p>
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <p className="text-lg font-semibold text-gray-600"><strong>Pattern Selection:</strong> {feedbackData.patternSelection}</p>
              </div>
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <p className="text-lg font-semibold text-gray-600"><strong>Comments:</strong> {feedbackData.comments}</p>
              </div>

              {/* Summary */}
              <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
                <h4 className="text-lg font-semibold text-gray-600">Feedback Summary</h4>
                <ul>
                  <li><strong>Excellent:</strong> {experienceCount.excellent}</li>
                  <li><strong>Good:</strong> {experienceCount.good}</li>
                  <li><strong>Average:</strong> {experienceCount.average}</li>
                  <li><strong>Poor:</strong> {experienceCount.poor}</li>
                </ul>
              </div>

              <div className="flex justify-end mt-4 space-x-4">
                <button
                  onClick={generatePDF}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                >
                  Generate PDF
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading feedback data...</p>
        )}
      </div>
    </div>
  );
};

export default UserReport;
