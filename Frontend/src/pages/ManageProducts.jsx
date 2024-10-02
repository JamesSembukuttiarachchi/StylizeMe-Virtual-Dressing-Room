import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import UpdateProductModal from "./UpdateProductModal";
import { generateProductsPDF } from "../components/generateProductsPDF";
import { Link } from "react-router-dom";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdate = () => {
    fetchProducts();
    handleCloseModal();
  };

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "products", id));
          setProducts(products.filter((product) => product.id !== id));
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "Failed to delete product. Please try again.", "error");
        }
      }
    });
  };

  const handleGeneratePDF = async () => {
    await generateProductsPDF(products);
    console.log("PDF generated successfully");
  };



  return (
    <div className="max-w-full mx-auto p-6 rounded-lg shadow-lg" style={{ backgroundImage: "url('/manageProducts-bg.jpg')" }}>
      <h2 className="text-3xl font-extrabold text-center text-white mb-6 bg-black p-2">MANAGE PRODUCTS</h2>

      {/* PDF Generator Button */}
      <div className="flex justify-end mb-4 gap-4 ">
      <Link to="/add-product">
      <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
        Add Product
      </button>
    </Link>

        <button
          onClick={() => handleGeneratePDF() } // Pass products to the function
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate PDF Report
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Product Image
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Product Name
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Brand
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Category
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Cloth Type
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Price
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Quantity
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Colors
            </th>
            <th className="py-3 px-4 bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider border-b w-1/6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">{product.name}</td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">{product.brand}</td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">{product.category}</td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">{product.clothType}</td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">${product.price}</td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">{product.quantity}</td>
              <td className="py-3 px-4 border-b text-gray-700 w-1/6">
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 border-b w-1/6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="px-4 py-1 text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-4 py-1 text-white font-semibold rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManageProducts;
