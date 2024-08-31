import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnterUserData from "./components/EnterUserData.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterUserData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
