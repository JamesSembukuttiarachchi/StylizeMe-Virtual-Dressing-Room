import React from "react";
import { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; // Firestore DB config
import { doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2"; // Import SweetAlert

const SaveCard = ({ product }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Function to handle product deletion
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        // Delete the product from Firestore
        await deleteDoc(doc(db, "savedProducts", product.id));

        // Show success message
        Swal.fire(
          "Deleted!",
          "Your saved product has been removed.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
      Swal.fire("Error!", "Failed to delete the product.", "error");
    }
  };

  return (
    <div>
    <div className="card w-96 bg-base-100 shadow-xl">
      <Link to={`/product/${product.productId}`} className="card-image">
        <figure>
          <img
            src={product.imageUrl}
            alt="image"
            className="card-image hover:scale-105 transition duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body bg-slate-50">
        <Link to={`/product/${product.productId}`}>
          <h2 className="card-title">{product.name}</h2>
        </Link>
        <div className="card-actions justify-between items-center mt-2 flex">
          <h5 className="font-extralight text-gray-400">Rs.{product.price}</h5>

          {/* Delete Button on the right side */}
          <button
            className="btn bg-red-500 hover:bg-red-600 ml-auto text-sm p-2 text-white"
            onClick={handleDelete}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SaveCard;
