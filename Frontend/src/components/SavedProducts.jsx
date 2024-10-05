import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from "./Card";
import SaveCard from "./SaveCard";
import Layout from "./layout/Layout";

const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState(null); // Store the current user

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the current user
      } else {
        console.log("User not authenticated");
        setUser(null);
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      if (user) {
        try {
          // Query Firestore to get the products saved by the current user
          const q = query(
            collection(db, "savedProducts"),
            where("userId", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("Fetched saved products:", products); // Debug: log fetched products
          setSavedProducts(products);
        } catch (error) {
          console.error("Error fetching saved products:", error);
        }
      } else {
        setSavedProducts([]); // Reset saved products if the user is not logged in
      }

      setLoading(false); // Set loading to false after fetching
    };

    fetchSavedProducts();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <Layout>
      <div className="section-container my-20 mx-20">
        <h1 className="text-3xl font-bold">WARDROBE</h1>
        <div className="grid grid-cols-3 gap-4 mt-10">
          {savedProducts.length > 0 ? (
            savedProducts.map((product) => (
              <SaveCard key={product.id} product={product} />
            ))
          ) : (
            <p>No saved products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SavedProducts;
