import React from "react";
// import { BrowserRouter } from "react-router-dom";

import Navbar from "./Comonentes/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./Comonentes/Footer";

const App = () => {

  return (

    <>

      <Navbar />

      <AppRoutes />

      <Footer />

    </>


  );

};

export default App;