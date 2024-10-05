import React from "react";
import { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; // Firestore DB config
import { doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Card = ({ product }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleHeartClick = async () => {
    if (currentUser) {
      setIsHeartFilled(!isHeartFilled);

      // Create a reference to the 'savedProducts' collection
      const savedProductRef = doc(db, "savedProducts", product.id + "_" + currentUser.uid);

      try {
        // Save the product and user information to the 'savedProducts' collection
        await setDoc(savedProductRef, {
          userId: currentUser.uid,       // Reference to the user who saved the product
          productId: product.id,         // Product ID
          name: product.name,     // Product Name
          price: product.price,   // Product Price
          imageUrl: product.imageUrl, // Product Image URL
        });

        console.log("Product saved successfully!");
      } catch (error) {
        console.error("Error saving product: ", error);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div
          className={`rating gap-1 absolute right-2 top-2 p-4 heartStar ${
            isHeartFilled ? "text-rose-500" : "text-black"
          }`}
          onClick={handleHeartClick}
        >
          <GoBookmark className="h-5 w-5 cursor z-[99]" />
        </div>
        <Link to={`/product/${product.id}`} className="card-image">
          <figure>
            <img
              src={product.imageUrl}
              alt="image"
              className="card-image hover:scale-105 transition duration-200 md:h-72"
            />
          </figure>
        </Link>
        <div className="card-body bg-slate-50">
          <Link to={`/product/${product.id}`}>
            <h2 className="card-title">{product.name}</h2>
          </Link>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-extralight text-gray-400">
              Rs.{product.price}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
