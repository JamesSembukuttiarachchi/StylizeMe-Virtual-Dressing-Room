import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Import the Firebase configuration
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const UserSizeRecm = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedSize, setSuggestedSize] = useState("");

  // Function to suggest clothing size based on measurements
  const suggestClothingSize = (data) => {
    const { chest, waist, shoulder } = data;

    const chestNum = Number(chest);
    const waistNum = Number(waist);
    const shoulderNum = Number(shoulder);

    if (
      chestNum >= 76 &&
      chestNum <= 82 &&
      waistNum >= 58 &&
      waistNum <= 64 &&
      shoulderNum >= 35 &&
      shoulderNum <= 38
    ) {
      setSuggestedSize("XS");
    } else if (
      chestNum >= 83 &&
      chestNum <= 89 &&
      waistNum >= 65 &&
      waistNum <= 71 &&
      shoulderNum >= 39 &&
      shoulderNum <= 42
    ) {
      setSuggestedSize("S");
    } else if (
      chestNum >= 90 &&
      chestNum <= 96 &&
      waistNum >= 72 &&
      waistNum <= 78 &&
      shoulderNum >= 43 &&
      shoulderNum <= 45
    ) {
      setSuggestedSize("M");
    } else if (
      chestNum >= 97 &&
      chestNum <= 103 &&
      waistNum >= 79 &&
      waistNum <= 85 &&
      shoulderNum >= 46 &&
      shoulderNum <= 48
    ) {
      setSuggestedSize("L");
    } else if (
      chestNum >= 104 &&
      chestNum <= 110 &&
      waistNum >= 86 &&
      waistNum <= 92 &&
      shoulderNum >= 49 &&
      shoulderNum <= 51
    ) {
      setSuggestedSize("XL");
    } else if (
      chestNum >= 111 &&
      chestNum <= 117 &&
      waistNum >= 93 &&
      waistNum <= 99 &&
      shoulderNum >= 52 &&
      shoulderNum <= 54
    ) {
      setSuggestedSize("XXL");
    } else {
      setSuggestedSize("Size Not Found");
    }
  };

  // Fetch the most recent data from Firestore
  const fetchMostRecentUserData = async () => {
    try {
      // Create a query to get the most recent document based on timestamp
      const q = query(
        collection(db, "userdata"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const recentData = querySnapshot.docs[0].data();
        setUserData(recentData);
        suggestClothingSize(recentData); // Suggest size based on the retrieved data
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setLoading(false);
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchMostRecentUserData();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <center>Size Recommendation</center>
        </h2>
        <br />

        {/* Display loading message while fetching */}
        {loading ? (
          <p>Loading data...</p>
        ) : userData ? (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2">Height (cm)</th>
                  <th className="px-4 py-2">Chest (cm)</th>
                  <th className="px-4 py-2">Waist (cm)</th>
                  <th className="px-4 py-2">Shoulder (cm)</th>
                  <th className="px-4 py-2">Neck (cm)</th>
                  <th className="px-4 py-2">Arm (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">{userData.height}</td>
                  <td className="border px-4 py-2">{userData.chest}</td>
                  <td className="border px-4 py-2">{userData.waist}</td>
                  <td className="border px-4 py-2">{userData.shoulder}</td>
                  <td className="border px-4 py-2">{userData.neck}</td>
                  <td className="border px-4 py-2">{userData.arm}</td>
                </tr>
              </tbody>
            </table>

            {/* Display Suggested Size */}
            <p className="mt-4 text-blue-500 text-xl font-bold">
              Suggested Clothing Size:{" "}
              <span className="text-blue-600 text-2xl">{suggestedSize}</span>
            </p>
            <br />
            <p className="text-m text-gray-600 mt-4">
              <b className="text-red-500">Please note:</b> The suggested size is
              based on general sizing standards commonly used worldwide. It
              serves as a guideline to help you get an idea of your potential
              size, but may not perfectly match all individual body shapes or
              garment styles.
            </p>
          </>
        ) : (
          <p>No recent data found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSizeRecm;
