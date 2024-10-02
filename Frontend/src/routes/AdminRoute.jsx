import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData && userData.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate("/not-authorized"); // Redirect if not admin
        }
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  return isAdmin ? (
    children
  ) : (
    <div>You are not authorized to access this page.</div>
  );
};

export default AdminRoute;
