import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnterUserData from "./components/EnterUserData.jsx";
import UserSizeRecm from "./components/UserSizeRecm.jsx";
import SkinToneDetection from "./components/SkinToneDetection.jsx";
import CheckSize from "./components/CheckSize.jsx";
import TShirtForm from "./components/TShirtForm.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TShirtForm />} />
          <Route path="/userdata" element={<EnterUserData />} />
          <Route path="/size" element={<UserSizeRecm />} />
          <Route path="/detectskintone" element={<SkinToneDetection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
