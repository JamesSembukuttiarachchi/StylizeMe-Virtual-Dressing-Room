import React, { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import useUserData from "../hooks/UserData"; // Custom hook for fetching user data
import Modal from "react-modal"; // Import Modal from react-modal
import { db } from "../firebaseConfig"; // Firestore instance from your Firebase setup
import { doc, updateDoc } from "firebase/firestore"; // Firestore functions

// Modal styles
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
  },
};

const UserProfile = () => {
  const { userData, loading, error } = useUserData(); // Fetch user data
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [updatedData, setUpdatedData] = useState({}); // Local state for form input

  // Initialize form fields with user data when modal is opened
  useEffect(() => {
    if (userData) {
      setUpdatedData(userData); // Set form fields with current user data
    }
  }, [userData]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle input change in the form
  const handleInputChange = (field, value) => {
    setUpdatedData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Function to update user data in Firestore
  const updateUserData = async () => {
    try {
      const userRef = doc(db, "users", userData.uid); // Assuming userData has the user ID
      await updateDoc(userRef, updatedData); // Update Firestore with new data
      closeModal(); // Close modal on success
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
        <div className="flex space-x-6 w-full max-w-7xl">
          {/* First Card - Profile Picture and Username */}
          <div className="w-2/5 bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col justify-center items-center min-h-[300px]">
            <img
              className="w-64 h-64 rounded-full"
              src={
                userData?.profilePicture ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={openModal}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Updating Profile */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Update Profile"
      >
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              value={updatedData?.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              value={updatedData?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Gender:</label>
            <input
              type="text"
              value={updatedData?.gender || ""}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Height:</label>
            <input
              type="number"
              value={updatedData?.height || ""}
              onChange={(e) => handleInputChange("height", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Length:</label>
            <input
              type="number"
              value={updatedData?.length || ""}
              onChange={(e) => handleInputChange("length", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Neck Size:</label>
            <input
              type="number"
              value={updatedData?.neckSize || ""}
              onChange={(e) => handleInputChange("neckSize", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Shoulder Width:</label>
            <input
              type="number"
              value={updatedData?.shoulderWidth || ""}
              onChange={(e) => handleInputChange("shoulderWidth", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <button
            type="button"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={updateUserData}
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </Layout>
  );
};

export default UserProfile;
