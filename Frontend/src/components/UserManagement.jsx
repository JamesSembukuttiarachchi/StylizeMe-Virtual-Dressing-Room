// UserManagement.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import bgImage from "../assets/store-bg-image.jpg";
import Layout from "./layout/Layout";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, "users"); // Adjust 'users' to your Firestore collection name
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    setUsers(users.filter((user) => user.id !== id)); // Update state to remove deleted user
  };

  return (
    <Layout>
      <div
        className=" mx-auto p-8"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          overflow: "hidden",
        }}
      >
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto"></div>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Username
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Email Address
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Is Admin
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4 text-[15px] text-gray-800">{user.name}</td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {user.email}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {user.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    <button
                      class="mr-4"
                      title="Delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 fill-red-500 hover:fill-red-700"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        />
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
