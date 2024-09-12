import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import bgImage from "../assets/store-bg-image.jpg"; // Import the background image

const Brands = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dresses, setDresses] = useState({
    tshirts: [],
    shirts: [],
    blouses: [],
  });
  const [editData, setEditData] = useState(null);

  // Fetching all dress types from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const tshirtsSnapshot = await getDocs(collection(db, "tshirt"));
      const shirtsSnapshot = await getDocs(collection(db, "shirt"));
      const blousesSnapshot = await getDocs(collection(db, "blouse"));

      setDresses({
        tshirts: tshirtsSnapshot.docs.map((doc) => ({
          id: doc.id,
          brandName: doc.data().brandName,
          ...doc.data(),
        })),
        shirts: shirtsSnapshot.docs.map((doc) => ({
          id: doc.id,
          brandName: doc.data().brandName,
          ...doc.data(),
        })),
        blouses: blousesSnapshot.docs.map((doc) => ({
          id: doc.id,
          brandName: doc.data().brandName,
          ...doc.data(),
        })),
      });
    };

    fetchData();
  }, []);

  // Handling delete
  const handleDelete = async (id, type) => {
    try {
      await deleteDoc(doc(db, type, id));
      setDresses((prevState) => ({
        ...prevState,
        [type]: prevState[type].filter((item) => item.id !== id),
      }));
      Swal.fire({
        title: "Deleted!",
        text: "The item has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the item.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Handling edit
  const handleEdit = (item, type) => {
    setEditData({ ...item, type });
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, editData.type, editData.id);
      await updateDoc(docRef, { sizes: editData.sizes });

      setDresses((prevState) => ({
        ...prevState,
        [editData.type]: prevState[editData.type].map((item) =>
          item.id === editData.id ? editData : item
        ),
      }));

      Swal.fire({
        title: "Updated!",
        text: "The item has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setEditData(null);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update the item.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Rendering each tab content
  const renderTable = (data, type) => (
    <table className="min-w-full table-auto bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Brand</th>
          <th className="px-4 py-2">Small</th>
          <th className="px-4 py-2">Medium</th>
          <th className="px-4 py-2">Large</th>
          <th className="px-4 py-2">Extra Large</th>
          <th className="px-4 py-2">Edit</th>
          <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center border-b">
            <td className="px-4 py-2">{item.brandName || "No Brand Name"}</td>
            <td className="px-4 py-2">{formatSize(item.sizes.Small)}</td>
            <td className="px-4 py-2">{formatSize(item.sizes.Medium)}</td>
            <td className="px-4 py-2">{formatSize(item.sizes.Large)}</td>
            <td className="px-4 py-2">{formatSize(item.sizes.ExtraLarge)}</td>
            <td className="px-4 py-2">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => handleEdit(item, type)}
              >
                Edit
              </button>
            </td>
            <td className="px-4 py-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id, type)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Helper function to format sizes
  const formatSize = (size) => {
    return `Neck: ${size?.neckSize || "-"}, Shoulder: ${
      size?.shoulderWidth || "-"
    }, Length: ${size?.length || "-"}`;
  };

  return (
    <div
      className="container mx-auto p-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Dress Sizes
      </h1>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
      >
        <TabList className="flex justify-center mb-6">
          <Tab className="text-white font-semibold text-lg px-6 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
            T-Shirts
          </Tab>
          <Tab className="text-white font-semibold text-lg px-6 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
            Shirts
          </Tab>
          <Tab className="text-white font-semibold text-lg px-6 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
            Blouses
          </Tab>
        </TabList>

        {/* T-Shirt Tab */}
        <TabPanel>
          <h2 className="text-2xl font-semibold mb-4 text-white"></h2>
          {dresses.tshirts.length > 0 ? (
            renderTable(dresses.tshirts, "tshirt")
          ) : (
            <p className="text-center text-white">No T-Shirts found</p>
          )}
        </TabPanel>

        {/* Shirt Tab */}
        <TabPanel>
          <h2 className="text-2xl font-semibold mb-4 text-white"></h2>
          {dresses.shirts.length > 0 ? (
            renderTable(dresses.shirts, "shirt")
          ) : (
            <p className="text-center text-white">No Shirts found</p>
          )}
        </TabPanel>

        {/* Blouse Tab */}
        <TabPanel>
          <h2 className="text-2xl font-semibold mb-4 text-white"></h2>
          {dresses.blouses.length > 0 ? (
            renderTable(dresses.blouses, "blouse")
          ) : (
            <p className="text-center text-white">No Blouses found</p>
          )}
        </TabPanel>
      </Tabs>

      {editData && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Edit {editData.brandName}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-300">
                Small Size - Neck Size (inches):
              </label>
              <input
                type="number"
                value={editData.sizes.Small.neckSize}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    sizes: {
                      ...editData.sizes,
                      Small: {
                        ...editData.sizes.Small,
                        neckSize: e.target.value,
                      },
                    },
                  })
                }
                className="border border-gray-300 p-3 rounded w-full"
              />
            </div>
            {/* Add more input fields for other sizes (Medium, Large, etc.) */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
