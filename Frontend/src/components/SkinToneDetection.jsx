import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import wallpaper from "../assets/wall.jpg";

const SkinToneDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recommendedColors, setRecommendedColors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 480,
            height: 640,
            facingMode: "user",
          },
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

  const analyzeSkinTone = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = context.getImageData(0, 0, canvas.width, canvas.height);

    const skinColor = detectSkinColor(frame.data);
    const colors = getRecommendedColors(skinColor);
    setRecommendedColors(colors);

    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        skinTone: skinColor,
        recommendedColors: colors,
      });
    }

    Swal.fire({
      title: `Detected Skin Tone: ${skinColor}`,
      html: `<h3>Recommended Dress Colors:</h3><ul>${colors
        .map((color) => `<li>${color}</li>`)
        .join("")}</ul>`,
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
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

    return rgRatio > 1.4 && rbRatio > 1.3 && r > 60 && g > 30 && b > 15;
  };

  const classifySkinTone = (r, g, b) => {
    if (r > 180 && g > 140 && b > 120) return "Light";
    if (r > 160 && g > 100 && b > 90) return "Medium";
    if (r > 100 && g > 60 && b > 40) return "Dark";
    return "Unknown";
  };

  const getRecommendedColors = (skinTone) => {
    const recommendations = {
      Light: ["Pastels", "Soft Pink", "Lavender", "Mint Green"],
      Medium: ["Jewel Tones", "Emerald", "Sapphire Blue", "Ruby Red"],
      Dark: ["Bright Colors", "Bold Yellow", "Vibrant Red", "Cobalt Blue"],
      Unknown: [],
    };
    return recommendations[skinTone] || [];
  };

  return (
    <div className="">
      <div
        style={{ backgroundImage: `url(${wallpaper})` }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#212e5a] from-0% to-[#656565] py-12 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Skin Tone Detection
        </h1>
        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center py-20 mx-auto p-4 shadow-lg rounded-lg border-4 border-gray-300">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            {/* Skin Tone Detection Section */}
            <div className="flex flex-col items-center">
              <div className="relative shadow-xl rounded-lg border-4 mb-4">
                <video
                  ref={videoRef}
                  width="480"
                  height="640"
                  autoPlay
                  className="rounded-lg"
                ></video>
              </div>
              <canvas
                ref={canvasRef}
                width="480"
                height="640"
                className="hidden"
              ></canvas>
              <button
                onClick={analyzeSkinTone}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md transition-all"
              >
                Detect Skin Tone
              </button>
            </div>

            {/* Instructions Section */}
            <div className="md:col-span-2 w-full py-6 px-6 sm:px-16">
              <div className="bg-white p-6 rounded-lg shadow-xl border-4 border-gray-800">
                <h2 className="text-2xl font-bold mb-4">
                  How to Use Skin Tone Detection
                </h2>
                <ul className="list-disc ml-6 text-left">
                  <li>
                    Ensure you're in a well-lit environment for best results.
                  </li>
                  <li>
                    Make sure your face and upper body are visible in the
                    camera.
                  </li>
                  <li>Click on "Detect Skin Tone" once you're ready.</li>
                  <li>
                    The app will analyze your skin tone and recommend dress
                    colors.
                  </li>
                  <li>
                    Once done, the results will be saved, and you can proceed to
                    the next step.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinToneDetection;
