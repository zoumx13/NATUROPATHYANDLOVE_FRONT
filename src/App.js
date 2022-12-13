import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import ContactForm from "./Components/ContactForm/ContactForm";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import QuiSuisJe from "./pages/QuiSuiJe/QuiSuisJe";
import Concept from "./pages/Concept/Concept";
import Prestations from "./pages/Prestations/Prestations";
import DetailsPrestation from "./pages/Prestations/Details/DetailsPrestation";
import Galerie from "./pages/Galerie/Galerie";
import Blog from "./pages/Blog/Blog";
import DetailsArticle from "./pages/Blog/DetailsArticle/DetailsArticle";
import Contact from "./pages/Contact/Contact";
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
        <Route
          path="/blog/:idArticle"
          element={<DetailsArticle></DetailsArticle>}
        ></Route>

        <Route path="/contact" element={<Contact></Contact>}></Route>
      </Routes>
      <ContactForm />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
