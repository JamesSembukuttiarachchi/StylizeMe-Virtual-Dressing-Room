import React, { useState } from "react";
import { db, storage } from "../firebaseConfig.js"; 
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [clothType, setClothType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [colors, setColors] = useState(["#000000"]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            text: "An error occurred while uploading the image. Please try again.",
          });
          console.error("Image upload failed:", error);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, "products"), {
            name,
            brand,
            category,
            clothType,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            colors,
            imageUrl,
          });

          Swal.fire({
            icon: "success",
            title: "Product Added",
            text: "The product has been added successfully.",
          });

          // Reset the form
          setName("");
          setBrand("");
          setCategory("");
          setClothType("");
          setPrice("");
          setImage(null);
          setQuantity("");
          setColors(["#000000"]);
        }
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Adding Product",
        text: "Failed to add product. Please try again.",
      });
      console.error("Error adding product:", error);
    }
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const addColorPicker = () => {
    setColors([...colors, "#000000"]);
  };

  const removeColorPicker = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                value={clothType}
                onChange={(e) => setClothType(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select Cloth Type</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Frock">Frock</option>
                <option value="Skirt">Skirt</option>
                {/* Add more types as needed */}
              </select>
            </div>
            
            {/* Right Column */}
            <div>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Available Colors:</label>
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-16 h-10 mr-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeColorPicker(index)}
                      className="text-red-500 hover:text-red-700"
                      disabled={colors.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addColorPicker}
                  className="mt-2 px-2 py-2 text-blue-400 font-semibold rounded-lg border-2 border-blue-500 hover:bg-blue-100 transition-colors"
                >
                  Add Color
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
