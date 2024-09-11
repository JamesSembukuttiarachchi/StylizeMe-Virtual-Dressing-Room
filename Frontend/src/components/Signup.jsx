import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import signupImage from "../assets/signup-image.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user info to Firestore with isAdmin set to false by default
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        isAdmin: false, // By default, the user is not an admin
        skinTone: null, // Placeholder for skin tone to be added later
      });

      // SweetAlert success for signup
      Swal.fire({
        title: "Sign Up Successful!",
        text: "Account created successfully. Redirecting to skin tone detection...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // Redirect to skin tone detection page
        navigate("/detectskintone");
      });
    } catch (err) {
      setError(err.message);
      // SweetAlert error for signup failure
      Swal.fire({
        title: "Sign Up Failed!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-2/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${signupImage})` }}
      >
        {/* You can add additional content or styling here if needed */}
      </div>
      <div className="w-3/5 flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
            Sign Up
          </h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
              <a
                href="/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
