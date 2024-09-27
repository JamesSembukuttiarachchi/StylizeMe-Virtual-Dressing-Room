import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct"; // Adjust the path as necessary
import ManageProducts from "./pages/ManageProducts"; // Adjust the path as necessary
import Menu from "./pages/Menu"; // Adjust the path as necessary
import Header from "./components/Header";
//import Header from "./components/Header";

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
