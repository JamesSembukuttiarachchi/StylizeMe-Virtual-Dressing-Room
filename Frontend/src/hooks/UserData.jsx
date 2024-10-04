import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged for real-time user state
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user details from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setError("User document not found.");
          }
        } catch (err) {
          setError("Failed to fetch user data: " + err.message);
        }
      } else {
        setError("No user is logged in.");
      }

      setLoading(false);
    });

    // Cleanup the auth listener on unmount
    return () => unsubscribe();
  }, []);

  return { userData, loading, error };
};

export default useUserData;
