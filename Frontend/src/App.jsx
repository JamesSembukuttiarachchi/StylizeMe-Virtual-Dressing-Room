import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SkinToneDetection from "./components/SkinToneDetection.jsx";
import AddSizes from "./components/AddSizes.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import dummy from "./components/dummy.jsx";
import Brands from "./components/Brands.jsx";
import SaveSizes from "./components/saveSizes.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UsageReport from "./components/UsageReport.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AddProduct from "./pages/AddProduct"; // Adjust the path as necessary
import ManageProducts from "./pages/ManageProducts"; // Adjust the path as necessary
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/detectskintone" element={<SkinToneDetection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute></AdminRoute>} />
          <Route path="/addsizes" element={<AddSizes />} />
          <Route path="/dummy" element={<dummy />} />
          <Route
            path="/brands"
            element={
              <AdminRoute>
                <Brands />
              </AdminRoute>
            }
          />
          <Route path="/savesizes" element={<SaveSizes />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/usagereport" element={<UsageReport />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/menu" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
