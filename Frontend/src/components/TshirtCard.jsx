import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei"; // Import Bounds helper
import * as THREE from "three";
import tshirtModel from "../assets/Animated Walking Tshirt.glb";

const TShirtModel = () => {
  const { scene, animations } = useGLTF(tshirtModel); // Load the GLB model
  const mixer = useRef();

  // Set up the AnimationMixer and play the animation
  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]); // Assume the first animation
      action.play();
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
      }
    };
  }, [scene, animations]);

  // Update the animation mixer every frame
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} scale={1.5} />;
};

const TShirtCard = ({ title, image, onShowOverlay }) => {
  const [show3DModel, setShow3DModel] = useState(false);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
      <img src={image} alt={title} className="p-4 w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <button
          onClick={onShowOverlay}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
            <Canvas
              camera={{ position: [0, 1.5, 4], fov: 50 }} // Adjust camera position for a better initial view
              gl={{ toneMapping: THREE.LinearToneMapping }}
              onCreated={({ gl }) => {
                gl.outputEncoding = THREE.sRGBEncoding;
              }}
            >
              {/* Center the object in view */}
              <Bounds fit clip observe margin={1}>
                <ambientLight intensity={0.3} color="#ffffff" />
                <directionalLight intensity={5.5} color="#ffffff" position={[10, 10, 5]} />
                <OrbitControls makeDefault minDistance={3} maxDistance={10} />
                <TShirtModel />
              </Bounds>
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default TShirtCard;
