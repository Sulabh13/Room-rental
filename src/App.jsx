import React from "react";
import Navbar from "./Comonentes/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./Comonentes/ScrollToTop";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
};

export default App;
