import React, { useEffect, useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';
import hoodie from '../assets/hoodie.png'; // Hoodie image

const ARHoodie = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const hoodieImg = new Image();

  useEffect(() => {
    hoodieImg.src = hoodie;

    hoodieImg.onload = () => {
      console.log('Hoodie image loaded successfully.');
      setupCamera();
    };

    return () => {
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

        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (pose && pose.keypoints) {
          const leftShoulder = pose.keypoints.find(point => point.part === 'leftShoulder')?.position;
          const rightShoulder = pose.keypoints.find(point => point.part === 'rightShoulder')?.position;
          const nose = pose.keypoints.find(point => point.part === 'nose')?.position;

          if (leftShoulder && rightShoulder) {
            drawHoodie([leftShoulder.x, leftShoulder.y], [rightShoulder.x, rightShoulder.y], nose);
          }
        }

        requestAnimationFrame(detect);
      } catch (error) {
        console.error('Error detecting pose:', error);
      }
    };

    detect();
  };

  const drawHoodie = (leftShoulder, rightShoulder, nose) => {
    if (!nose) return;

    const [shoulderX1, shoulderY1] = leftShoulder;
    const [shoulderX2, shoulderY2] = rightShoulder;
    const [noseX, noseY] = [nose.x, nose.y];

    const shoulderWidth = Math.abs(shoulderX2 - shoulderX1);
    const centerX = (shoulderX1 + shoulderX2) / 2;
    const neckY = Math.min(shoulderY1, shoulderY2) + (0.1 * shoulderWidth);
    const hoodieWidth = shoulderWidth * 2.4; // Width of the hoodie

    const topLeftX = centerX - hoodieWidth / 2;
    const topLeftY = neckY - hoodieWidth / 1.5; // Position the hood above the neck

    if (topLeftY >= 0 && topLeftY + hoodieWidth <= canvasRef.current.height &&
      topLeftX >= 0 && topLeftX + hoodieWidth <= canvasRef.current.width) {
      ctxRef.current.drawImage(hoodieImg, topLeftX, topLeftY, hoodieWidth, hoodieWidth);
    }
  };

  return (
    <div>
      <video
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

export default ARHoodie;
