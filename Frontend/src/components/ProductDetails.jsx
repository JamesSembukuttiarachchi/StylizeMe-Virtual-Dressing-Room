import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import * as THREE from "three";
import Layout from "./layout/Layout";

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
  const [show3DModel, setShow3DModel] = useState(false); // Control 3D model display

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
                  className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                  href="#"
                >
                  <span className="absolute inset-0 border border-blue-900 group-active:border-red-500"></span>
                  <span className="block border border-red-600 bg-blue-900 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 text-center">
                    VIEW 3D MODEL
                  </span>
                </a>
              </button>

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

        {/* Display the 3D Model modal if show3DModel is true */}
        {show3DModel && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-49">
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
