import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnterUserData from "./components/EnterUserData.jsx";
import UserSizeRecm from "./components/UserSizeRecm.jsx";
import SizeRecomSystem from "./pages/SizeRecomSystem.jsx";
import SkinToneDetection from "./components/SkinToneDetection.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterUserData />} />
          <Route path="/size" element={<UserSizeRecm />} />
          <Route path="/detectskintone" element={<SkinToneDetection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
