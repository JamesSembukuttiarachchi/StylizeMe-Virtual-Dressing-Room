import React from "react";
import Layout from "./layout/Layout";
import useUserData from "../hooks/UserData"; // Import the custom hook

const UserProfile = () => {
  const { userData, loading, error } = useUserData(); // Use the hook to get user data

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If userData is available, display it
  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
        <div className="flex space-x-6 w-full max-w-7xl">
          {/* First Card - Profile Picture and Username */}
          <div className="w-2/5 bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col justify-center items-center min-h-[300px]">
            <img
              className="w-32 h-32 rounded-full"
              src={
                userData?.profilePicture || "https://via.placeholder.com/150"
              } // Default if no profile picture
              alt="Profile"
            />
            <h2 className="mt-4 text-xl font-bold text-center">
              {userData?.name || "Username"}
            </h2>
          </div>

          {/* Second Card - Profile Details */}
          <div className="w-3/5 bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col justify-between min-h-[300px]">
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{userData?.name || "N/A"}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{userData?.email || "N/A"}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Gender:</span>
                <span>{userData?.gender || "N/A"}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span>{userData?.height || "N/A"}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Length:</span>
                <span>{userData?.length || "N/A"}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Neck Size:</span>
                <span>{userData?.neckSize || "N/A"}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Shoulder Width:</span>
                <span>{userData?.shoulderWidth || "N/A"}</span>
              </div>
              <hr />
            </div>
            <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
