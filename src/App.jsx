import React from "react";
import Nav from "./Comonentes/Nav";
import Hero from "./Comonentes/Hero";
import Loging from "./Comonentes/Loging";
import Signup from "./Comonentes/Singup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Rooms from "./Pages/Rooms";
import Contact from "./Pages/Contact"; // correct import
import Home from "./Pages/Home";
import About from "./Pages/Aboute";

const App = () => {
  return (
    <Router>

      <Nav />

      <Routes>

        {/* <Route path="/" element={<Hero />} /> */}
        
        <Route path="/" element={<Home />} />
        

        <Route path="/login" element={<Loging />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/rooms" element={<Rooms />} />

        <Route path="/aboute" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </Router>
  );
};

export default App;