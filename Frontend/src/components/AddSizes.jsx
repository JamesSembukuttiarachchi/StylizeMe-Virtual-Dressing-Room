import React from "react";

const AddSizes = () => {
  // List of available clothes types
  const clothes = [
    { name: "T-shirt", img: "https://via.placeholder.com/150?text=T-shirt" },
    { name: "Shirt", img: "https://via.placeholder.com/150?text=Shirt" },
    { name: "Skirt", img: "https://via.placeholder.com/150?text=Skirt" },
    { name: "Blouse", img: "https://via.placeholder.com/150?text=Blouse" },
    { name: "Trousers", img: "https://via.placeholder.com/150?text=Trousers" },
    { name: "Jacket", img: "https://via.placeholder.com/150?text=Jacket" },
  ];

  const handleUpdateClick = (clothe) => {
    // Handle the click for updating sizes of the selected clothe
    console.log(`Update clicked for ${clothe}`);
    alert(`Update clicked for ${clothe}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Select a Clothing Item to Update
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {clothes.map((clothe) => (
          <div
            key={clothe.name}
            className="bg-white shadow-lg rounded-xl p-6 transform hover:-translate-y-2 transition duration-300 ease-in-out relative overflow-hidden"
          >
            <div className="h-40 w-full bg-gray-200 rounded-md mb-4">
              <img
                src={clothe.img}
                alt={clothe.name}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              {clothe.name}
            </h3>
            <button
              onClick={() => handleUpdateClick(clothe.name)}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Update
            </button>
            <div className="absolute inset-0 bg-indigo-500 opacity-0 hover:opacity-10 transition duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSizes;
