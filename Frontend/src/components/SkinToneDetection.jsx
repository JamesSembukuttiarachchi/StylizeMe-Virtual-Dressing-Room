import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const SkinToneDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recommendedColors, setRecommendedColors] = useState([]);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the webcam: ", err);
      }
    };

    startWebcam();
  }, []);

  const analyzeSkinTone = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = context.getImageData(0, 0, canvas.width, canvas.height);

    // Detect the skin color
    const skinColor = detectSkinColor(frame.data);
    const colors = getRecommendedColors(skinColor);
    setRecommendedColors(colors);

    // Show SweetAlert with detected skin tone and recommended colors
    Swal.fire({
      title: `Detected Skin Tone: ${skinColor}`,
      html: `<h3>Recommended Dress Colors:</h3><ul>${colors
        .map((color) => `<li>${color}</li>`)
        .join("")}</ul>`,
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const detectSkinColor = (data) => {
    let rTotal = 0,
      gTotal = 0,
      bTotal = 0,
      count = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (isSkinColor(r, g, b)) {
        rTotal += r;
        gTotal += g;
        bTotal += b;
        count++;
      }
    }

    if (count === 0) return "No skin tone detected";

    const avgR = rTotal / count;
    const avgG = gTotal / count;
    const avgB = bTotal / count;

    return classifySkinTone(avgR, avgG, avgB);
  };

  const isSkinColor = (r, g, b) => {
    const rgRatio = r / (g + 1);
    const rbRatio = r / (b + 1);

    // Simple skin color detection rule
    return rgRatio > 1.4 && rbRatio > 1.3 && r > 60 && g > 30 && b > 15;
  };

  const classifySkinTone = (r, g, b) => {
    if (r > 180 && g > 140 && b > 120) return "Light";
    if (r > 160 && g > 100 && b > 90) return "Medium";
    if (r > 100 && g > 60 && b > 40) return "Dark";
    return "Unknown";
  };

  const getRecommendedColors = (skinTone) => {
    // Define color recommendations based on skin tone
    const recommendations = {
      Light: ["Pastels", "Soft Pink", "Lavender", "Mint Green"],
      Medium: ["Jewel Tones", "Emerald", "Sapphire Blue", "Ruby Red"],
      Dark: ["Bright Colors", "Bold Yellow", "Vibrant Red", "Cobalt Blue"],
      Unknown: [],
    };
    return recommendations[skinTone] || [];
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Skin Tone Detection</h1>
      <video
        id="video"
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        className="border-2 border-gray-800 mb-4"
      ></video>
      <canvas
        id="canvas"
        ref={canvasRef}
        width="640"
        height="480"
        className="hidden"
      ></canvas>
      <button
        onClick={analyzeSkinTone}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Detect Skin Tone
      </button>
    </div>
  );
};

export default SkinToneDetection;
