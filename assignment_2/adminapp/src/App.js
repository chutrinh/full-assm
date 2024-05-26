import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./pages/auth";
import HomAdmin from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<HomAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
