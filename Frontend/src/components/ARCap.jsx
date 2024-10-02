import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import bean from '../assets/bean.png'; // Make sure this path is correct

const ARCap = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceMesh, setFaceMesh] = useState(null);

  useEffect(() => {
    const loadFaceMesh = async () => {
      const faceMeshModel = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });
      faceMeshModel.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMeshModel.onResults(onResults);
      setFaceMesh(faceMeshModel);
    };

    loadFaceMesh();
  }, []);

  const onResults = (results) => {
    if (!canvasRef.current || !webcamRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const keypoints = results.multiFaceLandmarks[0];

      const forehead = keypoints[10]; // Forehead point
      const leftTemple = keypoints[234];
      const rightTemple = keypoints[454];

      const width = Math.abs(leftTemple.x - rightTemple.x) * canvasRef.current.width * 1.7;
      const height = width * 1; // Adjust height

      const capImage = new Image();
      capImage.src = bean; // Ensure the image path is correct
      capImage.onload = () => {
        ctx.drawImage(
          capImage,
          forehead.x * canvasRef.current.width - width / 2, // X position
          forehead.y * canvasRef.current.height - height / 2 - 35, // Y position
          width,
          height
        );
        console.log('Drawing cap at:', forehead.x * canvasRef.current.width, forehead.y * canvasRef.current.height);
      };
    }
  };

  useEffect(() => {
    if (faceMesh && webcamRef.current) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [faceMesh]);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 8, // Lower z-index for webcam
          width: '100%',
          height: '100%',
        }}
        videoConstraints={{
          facingMode: 'user',
        }}
      />
      <canvas
        ref={canvasRef}
        width="640px"
        height="480px"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9, // Higher z-index for canvas
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default ARCap;
