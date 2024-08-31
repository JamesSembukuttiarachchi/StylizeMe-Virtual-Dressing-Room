import React, { useEffect, useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';
import orange from '../assets/orange.png'

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const tshirtImg = new Image();

  useEffect(() => {
    tshirtImg.src = orange // Ensure this path is correct and the image is accessible
    tshirtImg.onload = () => {
      console.log('T-shirt image loaded successfully.');
      setupCamera();
    };
    tshirtImg.onerror = () => {
      console.error('Failed to load T-shirt image.');
    };

    return () => {
      // Cleanup function to stop the camera stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        setupPoseNet();
      };
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const setupPoseNet = async () => {
    try {
      const net = await posenet.load();
      ctxRef.current = canvasRef.current.getContext('2d');

      // Set canvas and video dimensions
      videoRef.current.width = videoRef.current.videoWidth;
      videoRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      detectPose(net);
    } catch (error) {
      console.error('Error loading PoseNet:', error);
    }
  };

  const detectPose = (net) => {
    const detect = async () => {
      try {
        const pose = await net.estimateSinglePose(videoRef.current, {
          flipHorizontal: false,
        });

        // Clear canvas before drawing
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (pose && pose.keypoints) {
          const leftShoulder = pose.keypoints.find(point => point.part === 'leftShoulder')?.position;
          const rightShoulder = pose.keypoints.find(point => point.part === 'rightShoulder')?.position;

          if (leftShoulder && rightShoulder) {
            drawTShirt([leftShoulder.x, leftShoulder.y], [rightShoulder.x, rightShoulder.y]);
          }
        }

        requestAnimationFrame(detect);
      } catch (error) {
        console.error('Error detecting pose:', error);
      }
    };

    detect();
  };

  const drawTShirt = (leftShoulder, rightShoulder) => {
    const [shoulderX1, shoulderY1] = leftShoulder;
    const [shoulderX2, shoulderY2] = rightShoulder;

    const shoulderWidth = Math.abs(shoulderX2 - shoulderX1);
    const centerX = (shoulderX1 + shoulderX2) / 2;
    const neckY = Math.min(shoulderY1, shoulderY2) + (0.23 * shoulderWidth);

    const tshirtAspectRatio = tshirtImg.width / tshirtImg.height;
    const tshirtWidth = shoulderWidth * 2.6;
    const tshirtHeight = tshirtWidth / tshirtAspectRatio;

    const topLeftX = centerX - tshirtWidth / 2;
    const topLeftY = neckY - tshirtHeight / 3;

    if (topLeftY >= 0 && topLeftY + tshirtHeight <= canvasRef.current.height &&
      topLeftX >= 0 && topLeftX + tshirtWidth <= canvasRef.current.width) {
      ctxRef.current.drawImage(tshirtImg, topLeftX, topLeftY, tshirtWidth, tshirtHeight);
    }
  };

  return (
    <div>
      <video
        id="video"
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover'
        }}
        autoPlay
        playsInline
      ></video>
      <canvas
        id="canvas"
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none'
        }}
      ></canvas>
    </div>
  );
};

export default PoseDetection;
