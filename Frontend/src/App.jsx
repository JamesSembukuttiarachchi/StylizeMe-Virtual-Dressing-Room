import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PoseDetection from './components/PoseDetection'
import ViewTshirt from './pages/ViewTshirt'
import ProductCard from './components/Product'
import ShoppingHome from './pages/ShoppingHome';
import FaceMeshAR from './components/FaceMeshAR';
import ARHoodie from './components/ARHoodie';
import ARCap from './components/ARCap';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="/view" element={<ViewTshirt />} />
          <Route path="/home" element={<ShoppingHome/>}/>
          <Route path="/glass" element={<FaceMeshAR/>}/>
          <Route path="/hood" element={<ARHoodie/>}/>
          <Route path="/cap" element={<ARCap/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App