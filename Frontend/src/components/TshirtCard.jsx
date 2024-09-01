// src/components/TShirtCard.js
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import tshirtModel from "../assets/AnimateTshirt.glb";

const TShirtCard = ({ title, image, onShowOverlay }) => {
  const [show3DModel, setShow3DModel] = useState(false);

  function TShirtModel() {
    const { scene } = useGLTF(tshirtModel); // Replace with your model path
    return <primitive object={scene} scale={1.5} />;
  }
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <button
          onClick={onShowOverlay}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Show in Camera
        </button>
        <button
          onClick={() => setShow3DModel(!show3DModel)}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View 3D Model
        </button>

      </div>

      {show3DModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative w-full max-w-3xl h-3/4 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setShow3DModel(false)}
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-1"
            >
              ✕
            </button>
            <Canvas>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <OrbitControls />
              <TShirtModel />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default TShirtCard;
