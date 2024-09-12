import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import loginImage from "../assets/login-image.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData && userData.isAdmin) {
        // SweetAlert success for admin login
        Swal.fire({
          title: "Login Successful!",
          text: "Redirecting to Admin Dashboard...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Redirect to admin page if user is an admin
          navigate("/brands");
        });
      } else {
        // SweetAlert success for non-admin user login
        Swal.fire({
          title: "Login Successful!",
          text: "Redirecting to User Page...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Redirect to normal user page if user is not an admin
          navigate("/dummy");
        });
      }
    } catch (err) {
      setError(err.message);
      // SweetAlert error for login failure
      Swal.fire({
        title: "Login Failed!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className="w-2/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        {/* You can add additional content or styling here if needed */}
      </div>
      <div className="w-3/5 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleLogin}>
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
                Login
              </button>
              <a
                href="/signup"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Don't have an account? Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
