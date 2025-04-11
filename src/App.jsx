
import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { Privacy } from "@/pages/Privacy";
import { Imprint } from "@/pages/Imprint";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/imprint" element={<Imprint />} />
      </Routes>
  );
}

export default App;
