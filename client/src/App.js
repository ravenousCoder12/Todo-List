// import logo from "./logo.svg";
import Header from "./components/partials/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/partials/Home.jsx";
import Register from "./components/partials/Register.jsx";
import Login from "./components/partials/Login.jsx";
import { useState } from "react";

function App() {


  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
