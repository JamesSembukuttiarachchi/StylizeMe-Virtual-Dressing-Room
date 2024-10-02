import React, { useState, useEffect } from "react";
import { db, storage } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState(product?.name || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");
  const [clothType, setClothType] = useState(product?.clothType || "");
  const [price, setPrice] = useState(product?.price || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [colors, setColors] = useState(product?.colors || ["#000000"]);
  const [description, setDescription] = useState(product?.description || ""); // New description field
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

  useEffect(() => {
    setImageUrl(product?.imageUrl || "");
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let newImageUrl = imageUrl;
      if (image) {
        const imageRef = ref(storage, `product-images/${product.id}/${image.name}`);
        await uploadBytes(imageRef, image);
        newImageUrl = await getDownloadURL(imageRef);
      }

      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        name,
        brand,
        category,
        clothType,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        colors,
        description, // Include description
        imageUrl: newImageUrl,
      });

      Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        onUpdate();
        onClose();
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                value={clothType}
                onChange={(e) => setClothType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>Select Cloth Type</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Frock">Frock</option>
                <option value="Skirt">Skirt</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows="4"
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
                  className="mt-2 px-4 py-2 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600"
                >
                  Add Color
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Product Image:</label>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Product"
                    className="w-32 h-32 object-cover mb-4"
                  />
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white font-semibold rounded-lg bg-blue-900 hover:bg-blue-950"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-white font-semibold rounded-lg bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
