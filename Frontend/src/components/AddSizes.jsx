import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import bgImage from "../assets/store-bg-image.jpg";
import Layout from "./layout/Layout";

const AddSizes = () => {
  const navigate = useNavigate();

  const goToDashboard = () => navigate("/dashboard");

  const [brandName, setBrandName] = useState("");
  const [dress, setDress] = useState("");
  const [sizes, setSizes] = useState({
    Small: { neckSize: "", shoulderWidth: "", length: "" },
    Medium: { neckSize: "", shoulderWidth: "", length: "" },
    Large: { neckSize: "", shoulderWidth: "", length: "" },
    ExtraLarge: { neckSize: "", shoulderWidth: "", length: "" },
  });

  const isFormComplete = Object.values(sizes).every((size) =>
    Object.values(size).every((value) => value !== "")
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      brandName,
      sizes: {
        Small: sizes.Small,
        Medium: sizes.Medium,
        Large: sizes.Large,
        ExtraLarge: sizes.ExtraLarge,
      },
    };

    try {
      const collectionRef = collection(db, dress);
      await addDoc(collectionRef, data);

      Swal.fire({
        title: "Success!",
        text: "The size recommendation for the brand has been successfully added.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error writing document: ", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to add data. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleSizeChange = (event, size) => {
    const { name, value } = event.target;
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: { ...prevSizes[size], [name]: value },
    }));
  };

  return (
    <Layout>
      <div
        className="mx-auto p-8"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          overflow: "hidden",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto my-10 relative"
        >
          <div className="flex justify-between space-x-5">
            <div className="mb-6 w-3/5">
              <label className="block text-gray-700 font-semibold mb-2">
                Brand Name:
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
                placeholder="Enter brand name"
                className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="mb-6 w-2/5">
              <label className="block text-gray-700 font-semibold mb-2">
                Dress Type:
              </label>
              <select
                value={dress}
                onChange={(e) => setDress(e.target.value)}
                required
                className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="" disabled>
                  Select Dress Type
                </option>
                <option value="tshirt">T-shirt</option>
                <option value="shirt">Shirt</option>
                <option value="blouse">Blouse</option>
              </select>
            </div>
          </div>

          <Tabs className="">
            <TabList className="flex justify-center mb-6">
              <Tab className="font-semibold text-xl px-10 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
                S
              </Tab>
              <Tab className="font-semibold text-xl px-10 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
                M
              </Tab>
              <Tab className="font-semibold text-xl px-10 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
                L
              </Tab>
              <Tab className="font-semibold text-xl px-10 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer transition duration-300">
                XL
              </Tab>
            </TabList>

            <TabPanel>
              <h4 className="text-center font-semibold text-xl mb-4 text-gray-800">
                Small Size:
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Neck Size (inches):
                  </label>
                  <input
                    type="number"
                    name="neckSize"
                    value={sizes.Small.neckSize}
                    onChange={(e) => handleSizeChange(e, "Small")}
                    required
                    placeholder="Circumference of your neck (in inches)."
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Shoulder Width (inches):
                  </label>
                  <input
                    type="number"
                    name="shoulderWidth"
                    value={sizes.Small.shoulderWidth}
                    onChange={(e) => handleSizeChange(e, "Small")}
                    required
                    placeholder="Measure the shoulder width (in inches)."
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Length (inches):
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={sizes.Small.length}
                    onChange={(e) => handleSizeChange(e, "Small")}
                    required
                    placeholder="Length from shoulder to hem (in inches)"
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <h4 className="text-center font-semibold text-xl mb-4 text-gray-800">
                Medium Size:
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Neck Size (inches):
                  </label>
                  <input
                    type="number"
                    name="neckSize"
                    value={sizes.Medium.neckSize}
                    onChange={(e) => handleSizeChange(e, "Medium")}
                    required
                    placeholder="Circumference of your neck (in inches)."
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Shoulder Width (inches):
                  </label>
                  <input
                    type="number"
                    name="shoulderWidth"
                    value={sizes.Medium.shoulderWidth}
                    onChange={(e) => handleSizeChange(e, "Medium")}
                    required
                    placeholder="Measure the shoulder width (in inches)."
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Length (inches):
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={sizes.Medium.length}
                    onChange={(e) => handleSizeChange(e, "Medium")}
                    required
                    placeholder="Length from shoulder to hem (in inches)"
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <h4 className="text-center font-semibold text-xl mb-4 text-gray-800">
                Large Size:
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Neck Size (inches):
                  </label>
                  <input
                    type="number"
                    name="neckSize"
                    value={sizes.Large.neckSize}
                    onChange={(e) => handleSizeChange(e, "Large")}
                    required
                    placeholder="Circumference of your neck (in inches)."
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Shoulder Width (inches):
                  </label>
                  <input
                    type="number"
                    name="shoulderWidth"
                    value={sizes.Large.shoulderWidth}
                    onChange={(e) => handleSizeChange(e, "Large")}
                    required
                    placeholder="Measure the shoulder width (in inches)."
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Length (inches):
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={sizes.Large.length}
                    onChange={(e) => handleSizeChange(e, "Large")}
                    required
                    placeholder="Length from shoulder to hem (in inches)"
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <h4 className="text-center font-semibold text-xl mb-4 text-gray-800">
                Extra Large Size:
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Neck Size (inches):
                  </label>
                  <input
                    type="number"
                    name="neckSize"
                    value={sizes.ExtraLarge.neckSize}
                    onChange={(e) => handleSizeChange(e, "ExtraLarge")}
                    required
                    placeholder="Circumference of your neck (in inches)."
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Shoulder Width (inches):
                  </label>
                  <input
                    type="number"
                    name="shoulderWidth"
                    value={sizes.ExtraLarge.shoulderWidth}
                    onChange={(e) => handleSizeChange(e, "ExtraLarge")}
                    required
                    placeholder="Measure the shoulder width (in inches)."
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    Length (inches):
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={sizes.ExtraLarge.length}
                    onChange={(e) => handleSizeChange(e, "ExtraLarge")}
                    required
                    placeholder="Length from shoulder to hem (in inches)"
                    className="border border-gray-300 p-3 rounded w-full"
                  />
                </div>
              </div>
            </TabPanel>
          </Tabs>

          <button
            type="submit"
            disabled={!isFormComplete}
            className={`w-full mt-6 p-3 rounded-lg bg-${
              isFormComplete ? "blue-500" : "gray-400"
            } text-white font-bold transition-colors duration-300`}
          >
            Submit
          </button>
          <button
            onClick={goToDashboard}
            className="w-full mt-4 p-3 rounded-lg bg-gray-500 text-white font-bold transition-colors duration-300"
          >
            Dashboard
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddSizes;
