import React, { useEffect, useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

const PoseDetection = ({ imageUrl, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const tshirtImg = new Image();

  useEffect(() => {
    if (imageUrl) {
      tshirtImg.src = imageUrl; // Use the image URL passed as a prop
      tshirtImg.onload = () => {
        console.log('T-shirt image loaded successfully.');
        setupCamera();
      };
      tshirtImg.onerror = () => {
        console.error('Failed to load T-shirt image.');
      };
    }

    return () => {
      // Cleanup function to stop the camera stream when the component unmounts
      stopCameraStream();
    };
  }, [imageUrl]);

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

    // Calculate shoulder width and midpoint
    const shoulderWidth = Math.abs(shoulderX2 - shoulderX1);
    let centerX = (shoulderX1 + shoulderX2) / 2;

    // Adjust horizontal alignment if necessary (experiment with the offset value)
    const horizontalOffset = -0.84 * shoulderWidth; // Adjust based on the problem (negative moves left)
    centerX += horizontalOffset;

    // Calculate vertical alignment (neck area) and apply an offset if needed
    let neckY = Math.min(shoulderY1, shoulderY2) + (0.23 * shoulderWidth);
    const verticalOffset = 0; // Fine-tune this value to adjust vertical alignment (negative moves up)
    neckY += verticalOffset;

    // Calculate T-shirt size based on shoulder width
    const tshirtAspectRatio = tshirtImg.width / tshirtImg.height;
    const tshirtWidth = shoulderWidth * 2.2; // Adjust multiplier if necessary
    const tshirtHeight = tshirtWidth / tshirtAspectRatio;

    // Calculate the top-left corner of the T-shirt
    const topLeftX = centerX - tshirtWidth / 2;
    const topLeftY = neckY - tshirtHeight / 3;

    // Draw the T-shirt if it fits within the canvas boundaries
    if (
      topLeftY >= 0 &&
      topLeftY + tshirtHeight <= canvasRef.current.height &&
      topLeftX >= 0 &&
      topLeftX + tshirtWidth <= canvasRef.current.width
    ) {
      ctxRef.current.drawImage(tshirtImg, topLeftX, topLeftY, tshirtWidth, tshirtHeight);
    }
  };


  const stopCameraStream = () => {
    // Stop the camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop()); // Stops the camera
      videoRef.current.srcObject = null; // Clears the stream reference
      console.log('Camera stream stopped.');
    }
  };

  return (
    <div>
      <button onClick={onClose}>Close AR View</button>
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
