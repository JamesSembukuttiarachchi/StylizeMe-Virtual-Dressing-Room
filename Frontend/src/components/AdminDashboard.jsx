import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/store-bg-image.jpg";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigation functions
  const goToProductCatalog = () => navigate("/manage-products");
  const goToAddDressSizes = () => navigate("/addsizes");
  const goToUserDataAnalytics = () => navigate("/usagereport");
  const goToBrands = () => navigate("/brands");

  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensures full-screen height
        width: "100vw", // Ensures full-screen width
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Welcome to the Admin's Dashboard
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mx-4">
          {/* Card 1: Product Catalog */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Product Catalog</h2>
            <p className="text-gray-600 mb-6">
              You can efficiently manage the catalog of dresses and accessories
              by adding, updating, or removing products. Each item you upload
              will be equipped with AR and 3D models allowing customers to
              virtually try on outfits and accessories in real-time.
            </p>
            <button
              onClick={goToProductCatalog}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Manage Products
            </button>
          </div>

          {/* Card 2: Add Dress Sizes */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Dress Sizes</h2>
            <p className="text-gray-600 mb-6">
              You can update the size options for various dress brands allowing
              you to assign brand-specific size recommendations for different
              dress types, ensuring customers receive accurate sizing
              information tailored to each brand.
            </p>
            <button
              onClick={goToAddDressSizes}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Manage Sizes
            </button>
          </div>

          {/* Card 3: Brands */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Brands</h2>
            <p className="text-gray-600 mb-6">
              All the brands that have been added to the size recommendation
              system. You can view, edit, and delete brand details, ensuring
              that size recommendations for each brand are accurate and
              up-to-date for a better customer experience.
            </p>
            <button
              onClick={goToBrands}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              View Brands
            </button>
          </div>

          {/* Card 4: User Data Analytics */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">User Data Analytics</h2>
            <p className="text-gray-600 mb-6">
              Analyze user interactions based on gender, height, and more. This
              section provides insights into how different user groups engage
              with products, helping you identify trends and optimize the
              virtual try-on experience for specific audiences.
            </p>
            <button
              onClick={goToUserDataAnalytics}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
