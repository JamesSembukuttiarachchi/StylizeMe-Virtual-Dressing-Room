import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PoseDetection from './components/PoseDetection'
import ViewTshirt from './pages/ViewTshirt'
import ProductCard from './components/Product'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="/view" element={<ViewTshirt />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App