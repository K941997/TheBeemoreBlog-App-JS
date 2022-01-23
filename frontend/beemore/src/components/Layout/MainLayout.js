import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="mt-4">{children}</div>
      <Footer />
    </div>
  );
}
