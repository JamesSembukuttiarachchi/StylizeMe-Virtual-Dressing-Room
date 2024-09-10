import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnterUserData from "./components/EnterUserData.jsx";
import UserSizeRecm from "./components/UserSizeRecm.jsx";
import SkinToneDetection from "./components/SkinToneDetection.jsx";
import TShirtForm from "./components/TShirtForm.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import dummy from "./components/dummy.jsx";
import AddSizes from "./components/AddSizes.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AddSizes />
              </AdminRoute>
            }
          />
          <Route path="/tshirt" element={<TShirtForm />} />
          <Route path="/userdata" element={<EnterUserData />} />
          <Route path="/size" element={<UserSizeRecm />} />
          <Route path="/detectskintone" element={<SkinToneDetection />} />
          <Route path="/dummy" element={<dummy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
