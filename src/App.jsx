import React from "react";
// import { BrowserRouter } from "react-router-dom";

import Navbar from "./Comonentes/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./Comonentes/Footer";
import ScrollToTop from "./Comonentes/ScrollToTop";

const App = () => {

  return (

    <>

      <Navbar />
      <ScrollToTop />

      <AppRoutes />

      <Footer />

    </>


  );

};

export default App;