import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import * as THREE from "three";
import Layout from "./layout/Layout";
import PoseDetection from "./PoseDetection";
import FaceLandmarkAR from "./FaceMeshAR";
import ARCap from "./ARCap";
import ARFrock from "./ARFrock";
import useUserData from "../hooks/UserData";

// Debugging: Log model URL
const TShirtModel = ({ modelUrl }) => {
  console.log("TShirtModel received URL:", modelUrl);

  const { scene, animations } = useGLTF(modelUrl); // Fetch the GLB model with animations

  const mixer = new THREE.AnimationMixer(scene); // Create an animation mixer

  // Create and play animations
  useEffect(() => {
    if (animations && animations.length) {
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play(); // Play the animation
      });
    }
  }, [animations, mixer]);

  // Update mixer on each frame
  useFrame((state, delta) => {
    mixer.update(delta); // Update the mixer
  });

  return <primitive object={scene} scale={1.5} />;
};

const ProductDetails = () => {
  const { id } = useParams(); // Extract product ID from URL
  const [product, setProduct] = useState(null);
  const [recommendedSize, setRecommendedSize] = useState(""); // Recommended size
  const [show3DModel, setShow3DModel] = useState(false); // Control 3D model display
  const [showARView, setShowARView] = useState(false); // State for AR View
  const {
    userData,
    loading: loadingUserData,
    error: userDataError,
  } = useUserData(); // Fetch user data from the custom hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          console.log("Product data fetched:", productSnap.data());
          setProduct(productSnap.data());
        } else {
          console.error("Product does not exist!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const calculateRecommendedSize = async () => {
      if (!userData) return; // Wait until userData is fetched

      const userMeasurements = {
        length: parseInt(userData.length, 10),
        neckSize: parseInt(userData.neckSize, 10),
        shoulderWidth: parseInt(userData.shoulderWidth, 10),
      };

      const sizeChartsCollection = collection(db, "tshirt");
      const sizeChartsSnapshot = await getDocs(sizeChartsCollection);

      let brandSizeChart = null;
      console.log("Product Brand:", product.brand); // Debugging line

      // Log all fetched size charts
      sizeChartsSnapshot.forEach((doc) => {
        const sizeChartData = doc.data();
        console.log("Fetched Size Chart Data:", sizeChartData); // Log size charts
        if (
          sizeChartData.brandName.trim().toLowerCase() ===
          product.brand.trim().toLowerCase()
        ) {
          brandSizeChart = sizeChartData.sizes;
        }
      });

      if (!brandSizeChart) {
        console.error("No size chart found for this brand");
        return;
      }

      let bestSize = "";
      Object.keys(brandSizeChart).forEach((size) => {
        const brandSize = brandSizeChart[size];
        console.log(
          "Comparing user measurements:",
          userMeasurements,
          "with brand size:",
          brandSize
        );
        if (
          userMeasurements.length >= parseInt(brandSize.length, 10) &&
          userMeasurements.neckSize >= parseInt(brandSize.neckSize, 10) &&
          userMeasurements.shoulderWidth >=
            parseInt(brandSize.shoulderWidth, 10)
        ) {
          bestSize = size;
          console.log("Best size updated to:", bestSize);
        }
      });

      setRecommendedSize(bestSize || "No size match");
    };

    if (product && userData) {
      calculateRecommendedSize();
    }
  }, [product, userData]);

  // Cleanup when AR View is closed to stop the camera
  const handleCloseARView = () => {
    setShowARView(false);
    const stream = document.querySelector("video")?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop the camera
    }
  };

  // Check if product exists before rendering
  if (!product) {
    return <div>Loading...</div>;
  }

  // Debugging: Log product details
  console.log("Product details:", product);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <img
            src={product.imageUrl} // Product image
            alt="Product"
            className="w-full lg:w-1/2 rounded"
          />
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p>
              <strong>Recommended Size:</strong>{" "}
              {recommendedSize || "Loading size..."}
            </p>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              Rs.{product.price}
            </div>

            <div className="flex flex-col space-y-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                ADD TO WARDROBE
              </button>
              <button
                onClick={() => {
                  setShow3DModel(true);
                  console.log("3D View button clicked, showing model");
                }} // Show 3D model on button click
              >
                <a
                  className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring w-full"
                  href="#"
                >
                  <span className="absolute inset-0 border border-blue-900 group-active:border-red-500"></span>
                  <span className="block border border-red-600 bg-blue-900 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 text-center">
                    VIEW 3D MODEL
                  </span>
                </a>
              </button>

              <button onClick={() => setShowARView(true)}>
                <a
                  className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring w-full"
                  href="#"
                >
                  <span className="absolute inset-0 border border-blue-900 group-active:border-red-500"></span>
                  <span className="block border border-red-600 bg-blue-900 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 text-center">
                    AR VIEW
                  </span>
                </a>
              </button>
            </div>
          </div>
        </div>

        {/* Display the 3D Model modal if show3DModel is true */}
        {show3DModel && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
            <div className="relative w-full max-w-3xl h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setShow3DModel(false);
                  console.log("Closing 3D Model overlay");
                }} // Close modal
                className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-1 z-50"
              >
                ✕
              </button>
              {product.glbFileUrl ? (
                <Canvas
                  camera={{ position: [0, 1.5, 4], fov: 50 }} // Adjust camera position for better view
                  gl={{ toneMapping: THREE.LinearToneMapping }}
                  onCreated={({ gl }) => {
                    gl.outputEncoding = THREE.sRGBEncoding;
                    console.log("Canvas created");
                  }}
                >
                  <Bounds fit clip observe margin={1}>
                    <ambientLight intensity={0.3} color="#ffffff" />
                    <directionalLight
                      intensity={5.5}
                      color="#ffffff"
                      position={[10, 10, 5]}
                    />
                    <OrbitControls
                      makeDefault
                      minDistance={3}
                      maxDistance={10}
                    />
                    <TShirtModel modelUrl={product.glbFileUrl} />{" "}
                    {/* Use product.glbFileUrl */}
                  </Bounds>
                </Canvas>
              ) : (
                <p>No 3D model available</p> // Display message if no model URL is available
              )}
            </div>
          </div>
        )}

        {/* Display the AR View modal if showARView is true */}
        {showARView && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ">
            <div className="relative w-full max-w-5xl h-full bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={handleCloseARView} // Close AR View and stop the camera
                className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-1 z-50"
              >
                ✕
              </button>
              {/* Conditionally render the AR component based on product type */}
              {product.clothType === "T-shirt" ||
              product.clothType === "Blouse" || product.clothType === "Hoodie" ? (
                <PoseDetection imageUrl={product.imageUrl} />
              ) : product.clothType === "Shades" ? (
                <FaceLandmarkAR imageUrl={product.imageUrl} />
              ) : product.clothType === "Caps" ? (
                <ARCap imageUrl={product.imageUrl} />
              ) : product.clothType === "Frock" ? (
                <ARFrock imageUrl={product.imageUrl} />
              ) : (
                <p>AR view not available for this product type</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
