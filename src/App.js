import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Home from "./pages/Home/Home";
import QuiSuisJe from "./pages/QuiSuiJe/QuiSuisJe";
import Concept from "./pages/Concept/Concept";
import Prestations from "./pages/Prestations/Prestations";
import DetailsPrestation from "./pages/Prestations/Details/DetailsPrestation";
import Galerie from "./pages/Galerie/Galerie";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Connexion from "./pages/Connexion/Connexion";
import Admin from "./pages/Admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home></Home>}></Route>
        <Route
          path="/quisuisje"
          exact
          element={<QuiSuisJe></QuiSuisJe>}
        ></Route>
        <Route path="/concept" exact element={<Concept></Concept>}></Route>
        <Route
          path="/prestations"
          element={<Prestations></Prestations>}
        ></Route>
        <Route
          path="/prestations/:idPrestation"
          element={<DetailsPrestation></DetailsPrestation>}
        ></Route>
        <Route path="/galerie" element={<Galerie></Galerie>}></Route>
        <Route path="/blog" element={<Blog></Blog>}></Route>

        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/connexion" element={<Connexion></Connexion>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
      {/* <div><Footer></Footer></div> */}
    </BrowserRouter>
  );
}

export default App;
