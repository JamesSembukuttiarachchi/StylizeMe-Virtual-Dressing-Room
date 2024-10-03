import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
//import glass from '../assets/sunglass.png';

const FaceLandmarkAR = ({imageUrl}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [previousLeftEye, setPreviousLeftEye] = useState(null);
  const [previousRightEye, setPreviousRightEye] = useState(null);

  const SMOOTHING_FACTOR = 0.8; // Adjust for more or less smoothing (0 to 1)

  const smoothLandmark = (prev, curr) => {
    return {
      x: prev ? prev.x * SMOOTHING_FACTOR + curr.x * (1 - SMOOTHING_FACTOR) : curr.x,
      y: prev ? prev.y * SMOOTHING_FACTOR + curr.y * (1 - SMOOTHING_FACTOR) : curr.y,
    };
  };

  const onResults = (results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiFaceLandmarks) {
      results.multiFaceLandmarks.forEach((landmarks) => {
        let leftEye = landmarks[33]; // Left eye landmark
        let rightEye = landmarks[263]; // Right eye landmark

        // Apply smoothing to the left and right eye positions
        leftEye = smoothLandmark(previousLeftEye, leftEye);
        rightEye = smoothLandmark(previousRightEye, rightEye);

        setPreviousLeftEye(leftEye);
        setPreviousRightEye(rightEye);

        const sunglassesWidth = Math.abs(rightEye.x - leftEye.x) * canvasElement.width * 2;
        const sunglassesHeight = sunglassesWidth / 2; // Aspect ratio of sunglasses

        const sunglassesX = leftEye.x * canvasElement.width - sunglassesWidth / 4;
        const sunglassesY = leftEye.y * canvasElement.height - sunglassesHeight / 2;

        const img = new Image();
        img.src = imageUrl; // Ensure this path is correct
        img.onload = () => {
          canvasCtx.drawImage(
            img,
            sunglassesX,
            sunglassesY,
            sunglassesWidth,
            sunglassesHeight
          );
        };
      });
    }

    canvasCtx.restore();
  };

  useEffect(() => {
    const initializeFaceMesh = () => {
      console.log("Initializing FaceMesh...");
      const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);

      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        console.log("Webcam ready.");
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        if (!camera) {
          const cameraInstance = new cam.Camera(webcamRef.current.video, {
            onFrame: async () => {
              await faceMesh.send({ image: webcamRef.current.video });
            },
            width: videoWidth,
            height: videoHeight,
          });
          cameraInstance.start();
          setCamera(cameraInstance);
        }
      } else {
        console.log("Webcam not ready yet.");
      }
    };

    const handleWebcamLoaded = () => {
      console.log("Webcam is loaded");
      initializeFaceMesh();
    };

    if (webcamRef.current) {
      webcamRef.current.video.addEventListener('loadeddata', handleWebcamLoaded);
    }

    return () => {
      if (webcamRef.current) {
        webcamRef.current.video.removeEventListener('loadeddata', handleWebcamLoaded);
      }
    };
  }, [camera]);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default FaceLandmarkAR;
