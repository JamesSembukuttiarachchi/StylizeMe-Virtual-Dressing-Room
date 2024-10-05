import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore functions
import { GoBookmarkFill } from "react-icons/go";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(); // Track admin status
  const [username, setUsername] = useState(""); // Track username
  const auth = getAuth();
  const db = getFirestore(); // Firestore instance

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in

        let displayName = currentUser.displayName;
        // Fetch admin status from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.isAdmin || false); // Set isAdmin based on Firestore
          displayName = userData.name;
        }
        setUsername(displayName);
      } else {
        setUser(null); // User is logged out
        setIsAdmin(false); // Reset admin status
        setUsername("");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth, db]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Set user to null after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {user && !isAdmin && (
        <div className="navbar bg-gradient-to-r from-[#97a7d7] from-0% to-[#212e5a] px-5 py-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/home">HOME</Link>
                </li>
                <li>
                  <Link to="/menu">SHOP</Link>
                </li>
                <li>
                  <Link to="/Feedhome">FEEDBACK</Link>
                </li>
                <li>
                  <Link to="/contact">CONTACT US</Link>
                </li>
              </ul>
            </div>
            {/* Replace the text with the logo */}
            <a className="">
              <img
                src="src/assets/StylizeMe.png"
                alt="Logo"
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white font-semibold text-[15px]">
              <li>
                <Link to="/home">HOME</Link>
              </li>
              <li>
                <Link to="/menu">SHOP</Link>
              </li>
              <li>
                <Link to="/Feedhome">FEEDBACK</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT US</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-2">
            {/* Conditionally render button */}
            <Link to="/saved">
              <GoBookmarkFill className="h-7 w-7 text-white rounded-md cursor z-[99]" />
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/userprofile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>{username}</a>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <a>Logout</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {isAdmin && (
        <div className="navbar bg-gradient-to-r from-[#97a7d7] from-0% to-[#212e5a] px-5 py-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/dashboard">Dashoboard</Link>
                </li>
                <li>
                  <Link to="/manage-products">Manage Products</Link>
                </li>
                <li>
                  <Link to="/addsizes">Manage Sizes</Link>
                </li>
                <li>
                  <Link to="/brands">View Brands</Link>
                </li>
                <li>
                  <Link to="/users">User Management</Link>
                </li>
              </ul>
            </div>
            {/* Replace the text with the logo */}
            <a className="">
              <img
                src="src/assets/StylizeMe.png"
                alt="Logo"
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white font-semibold text-[15px]">
              <li>
                <Link to="/dashboard">Dashoboard</Link>
              </li>
              <li>
                <Link to="/manage-products">Manage Products</Link>
              </li>
              <li>
                <Link to="/addsizes">Manage Sizes</Link>
              </li>
              <li>
                <Link to="/brands">View Brands</Link>
              </li>
              <li>
                <Link to="/users">User Management</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {/* Conditionally render button */}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <a>Logout</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="navbar bg-gradient-to-r from-[#97a7d7] from-0% to-[#212e5a] px-5 py-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/home">HOME</Link>
                </li>
                <li>
                  <Link to="/menu">SHOP</Link>
                </li>
                <li>
                  <Link to="/Feedhome">FEEDBACK</Link>
                </li>
                <li>
                  <Link to="/contact">CONTACT US</Link>
                </li>
              </ul>
            </div>
            {/* Replace the text with the logo */}
            <a className="">
              <img
                src="src/assets/StylizeMe.png"
                alt="Logo"
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white font-semibold text-[15px]">
              <li>
                <Link to="/home">HOME</Link>
              </li>
              <li>
                <Link to="/menu">SHOP</Link>
              </li>
              <li>
                <Link to="/Feedhome">FEEDBACK</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT US</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {/* Conditionally render button */}

            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Navbar;
