import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const UsageReport = () => {
  const [usersData, setUsersData] = useState([]);
  const [genderData, setGenderData] = useState(null);
  const [heightData, setHeightData] = useState(null);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const usersList = userSnapshot.docs.map((doc) => doc.data());
        setUsersData(usersList);
        processChartsData(usersList);
      } catch (error) {
        console.error("Error fetching users data: ", error);
      }
    };

    fetchUsersData();
  }, []);

  // Process data for the charts
  const processChartsData = (usersList) => {
    // Gender Chart Data
    const genderCount = { Male: 0, Female: 0, Other: 0 };

    const heightGroups = {
      "150-160cm": 0,
      "161-170cm": 0,
      "171-180cm": 0,
      "181+": 0,
    };

    usersList.forEach((user) => {
      // Count genders
      genderCount[user.gender] = (genderCount[user.gender] || 0) + 1;

      // Height in cm ranges
      const height = parseInt(user.height);
      if (height >= 150 && height <= 160) heightGroups["150-160cm"]++;
      else if (height >= 161 && height <= 170) heightGroups["161-170cm"]++;
      else if (height >= 171 && height <= 180) heightGroups["171-180cm"]++;
      else if (height > 180) heightGroups["181+"]++;
    });

    setGenderData({
      labels: ["Male", "Female", "Other"],
      datasets: [
        {
          label: "Gender Distribution",
          data: [genderCount.Male, genderCount.Female, genderCount.Other],
          backgroundColor: ["#3498db", "#e74c3c", "#9b59b6"],
        },
      ],
    });

    setHeightData({
      labels: ["150-160cm", "161-170cm", "171-180cm", "181+"],
      datasets: [
        {
          label: "Height Distribution",
          data: [
            heightGroups["150-160cm"],
            heightGroups["161-170cm"],
            heightGroups["171-180cm"],
            heightGroups["181+"],
          ],
          backgroundColor: ["#34495e", "#e67e22", "#2980b9", "#e74c3c"],
        },
      ],
    });
  };

  // Generate and download PDF
  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Capture the charts using html2canvas
    const genderChart = document.getElementById("genderChart");
    const heightChart = document.getElementById("heightChart");

    if (genderChart && heightChart) {
      // Capture Gender Distribution chart
      const genderCanvas = await html2canvas(genderChart);
      const genderImage = genderCanvas.toDataURL("image/png");

      // Capture Height Distribution chart
      const heightCanvas = await html2canvas(heightChart);
      const heightImage = heightCanvas.toDataURL("image/png");

      // Add content to PDF
      pdf.text("User Data Analytics", 10, 10);
      pdf.addImage(genderImage, "PNG", 10, 20, 180, 90); // Adjust dimensions as needed
      pdf.addImage(heightImage, "PNG", 10, 120, 180, 90);

      // Save the PDF
      pdf.save("UserDataAnalytics.pdf");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h5 className="text-xl font-bold text-center mb-6">StylizeMe</h5>
      <h1 className="text-3xl font-bold text-center mb-6">
        User Data Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Gender Distribution */}
        {genderData && (
          <div
            id="genderChart"
            className="p-4 w-3/5 shadow-lg rounded-lg bg-white mx-auto flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Gender Distribution
            </h2>
            <Pie data={genderData} />
          </div>
        )}

        {/* Height Distribution */}
        {heightData && (
          <div
            id="heightChart"
            className="p-4 shadow-lg rounded-lg bg-white mx-auto flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Height Distribution
            </h2>
            <Bar data={heightData} />
          </div>
        )}
      </div>

      {/* Download PDF Button */}
      <div className="text-center mt-8">
        <button
          onClick={generatePDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default UsageReport;
