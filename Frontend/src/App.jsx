import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnterUserData from "./components/EnterUserData.jsx";
import UserSizeRecm from "./components/UserSizeRecm.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterUserData />} />
          <Route path="/size" element={<UserSizeRecm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
