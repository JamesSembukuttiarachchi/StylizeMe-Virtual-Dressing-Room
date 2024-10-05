import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SkinToneDetection from "./components/SkinToneDetection.jsx";
import AddSizes from "./components/AddSizes.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import dummy from "./components/dummy.jsx";
import Brands from "./components/Brands.jsx";
import SaveSizes from "./components/SaveSizes.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UsageReport from "./components/UsageReport.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AddProduct from "./pages/AddProduct"; // Adjust the path as necessary
import ManageProducts from "./pages/ManageProducts"; // Adjust the path as necessary
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import PoseDetection from "./components/PoseDetection";
import ViewTshirt from "./pages/ViewTshirt";
import ProductCard from "./components/Product";
import ShoppingHome from "./pages/ShoppingHome";
import FaceMeshAR from "./components/FaceMeshAR";
import ARHoodie from "./components/ARHoodie";
import ARCap from "./components/ARCap";
import FeedbackForm from "./pages/Feedback";
import Feedbackview from "./pages/Feedbackview";
import Feedbackupdate from "./pages/Feedbackupdate";
import Feedbackdelete from "./pages/Feedbackdelete";
import FeedbackHome from "./pages/FeedbackHome";
import UserReport from "./pages/UserReport";
import MyFeedback from "./pages/MyFeedback.jsx";
import UserManagement from "./components/UserManagement.jsx";
import Contact from "./pages/Contact_us.jsx";
import SavedProducts from "./components/SavedProducts.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/*James*/}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/detectskintone" element={<SkinToneDetection />} />
          <Route path="/home" element={<ShoppingHome />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/Feedhome" element={<FeedbackHome />} />
          <Route path="/Feedback" element={<FeedbackForm />} />
          <Route path="/MyFeedback" element={<MyFeedback/>}/>
          <Route path="/Feedbackview/:feedbackId" element={<Feedbackview />} />
          <Route
            path="/Feedbackupdate/:feedbackId"
            element={<Feedbackupdate />}
          />
          <Route
            path="/Feedbackdelete/:feedbackId"
            element={<Feedbackdelete />}
          />
          <Route path="/feedbackview/:id" element={<UserReport />} />
          <Route path="/savesizes" element={<SaveSizes />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/menu" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/saved" element={<SavedProducts/>}/>

          <Route path="/admin" element={<AdminRoute></AdminRoute>} />
          <Route path="/users" element={<UserManagement/>}/>
          <Route
            path="/addsizes"
            element={
              <AdminRoute>
                <AddSizes />
              </AdminRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <AdminRoute>
                <Brands />
              </AdminRoute>
            }
          />

          <Route
            path="/usagereport"
            element={
              <AdminRoute>
                <UsageReport />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/*Amaya*/}
          <Route
            path="/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/manage-products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />

          {/*Rakindu*/}

          {/* <Route path="/view" element={<ViewTshirt />} />

          <Route path="/glass" element={<FaceMeshAR />} />
          <Route path="/hood" element={<ARHoodie />} />
          <Route path="/cap" element={<ARCap />} /> */}

          {/*Hiruni*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
