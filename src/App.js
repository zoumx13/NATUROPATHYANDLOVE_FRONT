import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact";
import Connexion from "./pages/Connexion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home></Home>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/admin" element={<Connexion></Connexion>}></Route>
      </Routes>
      {/* <div><Footer></Footer></div> */}
    </BrowserRouter>
  );
}

export default App;
