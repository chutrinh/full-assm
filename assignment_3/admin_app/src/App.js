import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainavigate from "./components/mainavigate";
import DashBoard from "./pages/dashboard";
import Product from "./pages/product";
import Chat from "./pages/chat";
import AddNewProduct from "./pages/addNewProduct";
import Auth from "./components/formAuth";

function App() {
  const [editProd, setEditProd] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Mainavigate>
          <Routes>
            <Route path="/" element={<Auth setEditProd={setEditProd} />} />
            <Route
              path="/dashboard"
              element={<DashBoard setEditProd={setEditProd} />}
            />
            <Route
              path="/product"
              element={<Product setEditProd={setEditProd} />}
            />
            <Route path="/chat" element={<Chat setEditProd={setEditProd} />} />
            <Route
              path="/add-new-product"
              element={<AddNewProduct editProd={editProd} />}
            />
          </Routes>
        </Mainavigate>
      </BrowserRouter>
    </div>
  );
}

export default App;
