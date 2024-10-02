import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Card from "./Card";
import Banner1 from "./banner1";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Local state for category
  const [selectedClothType, setSelectedClothType] = useState(""); // New state for clothing type
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Number of products per page

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
        setFilteredProducts(productsList); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by search query, category, and brand
  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by selected category (with case handling)
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // Filter by selected brand
      if (selectedBrand) {
        filtered = filtered.filter(
          (product) =>
            product.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
      }

      // Filter by selected clothing type
      if (selectedClothType) {
        filtered = filtered.filter(
          (product) =>
            product.clothType.toLowerCase() === selectedClothType.toLowerCase()
        );
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedClothType,
    products,
  ]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pt-2">
      {/* Search and Filter Section */}
      <div className="mb-4 p-2 bg-gray-300 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/3 focus:ring focus:ring-blue-200"
          />
          <div className="flex space-x-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="">All Categories</option>
              <option value="Male">Men</option>
              <option value="Female">Women</option>
            </select>

            {/* Clothing Type Filter */}
            <select
              value={selectedClothType}
              onChange={(e) => setSelectedClothType(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="">All Clothing Types</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Frock">Frock</option>
              <option value="Skirt">Skirt</option>
            </select>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="">All Brands</option>
              <option value="OVS">OVS</option>
              <option value="H&M">H&M</option>
              <option value="Adidas">Adidas</option>
              <option value="AVM">AVM</option>
            </select>
          </div>
        </div>
      </div>

      <div>
      <Banner1 />
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center">
  {currentProducts.map((product) => (
    <Card key={product.id} product={product} />
  ))}
</div>


      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            } font-semibold rounded-lg mx-1 transition-colors`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
