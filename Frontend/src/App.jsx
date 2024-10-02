import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct"; // Adjust the path as necessary
import ManageProducts from "./pages/ManageProducts"; // Adjust the path as necessary
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/menu" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
