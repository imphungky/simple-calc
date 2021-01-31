import React from "react";

import Footer from "./Footer";
import NavBar from "./NavBar";

function PageWrapper({ children }) {
  return (
    <>
      <NavBar />
      <div style={{ height: "45vw" }}>{children}</div>
      <Footer />
    </>
  );
}

export default PageWrapper;
