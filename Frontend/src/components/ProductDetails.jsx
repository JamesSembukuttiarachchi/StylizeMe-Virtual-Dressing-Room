import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ProductDetails = () => {
  const { id } = useParams(); // Extract product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct(productSnap.data());
      } else {
        console.error("Product does not exist!");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className=" flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <img
          src={product.imageUrl} // Replace with actual image URL
          alt="Product"
          className="w-full lg:w-1/2 rounded"
        />
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
          <div className="flex items-center mb-4">
            {/* <span className="text-blue-500 text-xl">★★★★☆</span> Adjust for actual star ratings */}
          </div>
          <p className="text-gray-700 mb-4">
            {product.description}
            {/* Gray skate shoe. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. */}
          </p>
          <div className="text-2xl font-bold text-gray-900 mb-4">
            Rs.{product.price}
          </div>

          <div className="flex flex-col space-y-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              ADD TO WARDROBE
            </button>
            <a
              className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
              href="#"
            >
              <span className="absolute inset-0 border border-blue-900 group-active:border-red-500"></span>
              <span className="block border border-red-600 bg-blue-900 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 text-center">
                VIEW 3D MODEL
              </span>
            </a>

            <a
              className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
              href="#"
            >
              <span className="absolute inset-0 border border-blue-900 group-active:border-red-500"></span>
              <span className="block border border-red-600 bg-blue-900 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 text-center">
                AR VIEW 
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Other products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Example product cards */}
          <div className="border rounded p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Other product"
              className="mb-2"
            />
            <p className="text-sm text-gray-600">Product Name</p>
          </div>
          {/* Repeat the above div for more products */}
        </div>
      </div>
    </div>

    // <div className="p-6 max-w-screen-lg mx-auto">
    //   <h2 className="text-2xl font-bold mb-6">{product.name}</h2>
    //   <img
    //     src={product.imageUrl}
    //     alt={product.name}
    //     className="w-full h-64 object-cover mb-4 rounded-md"
    //   />
    //   <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
    //   <p className="text-gray-600 mb-2">Price: ${product.price}</p>
    //   <p className="text-gray-600 mb-4">Category: {product.category}</p>
    //   <div className="flex space-x-2">
    //     {product.colors.map((color, index) => (
    //       <div
    //         key={index}
    //         className="w-8 h-8 rounded-full"
    //         style={{ backgroundColor: color }}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};

export default ProductDetails;
