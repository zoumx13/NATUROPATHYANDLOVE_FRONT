import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import GBP from "./assets/GBP.png";
import Linkedin from "./assets/Linkedin.png";
import Insta from "./assets/Instagram.png";
import Logo from "./assets/Logo.jpg";
import { NavDropdown, Nav, Navbar, Form } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

export default function NavBar() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const passwordRef = React.useRef();
  const identifiantRef = React.useRef();

  const login = async (identifiant, password) => {
    console.log(identifiant, password);
    let data = {
      password: passwordRef.current.value,
      identifiant: identifiantRef.current.value,
    };
    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    };
    let reponse = await fetch("http://127.0.0.1:8080/connexion", options);
    let donnees = await reponse.json();
    // Enregistrement du token dans le localStorage
    localStorage.setItem("token", donnees.token);
    if (donnees.message !== "Connecté") {
      alert("Identifiant ou Mot de Passe incorrect!");
    } else {
      setIdentifiant(identifiant);
      alert("Connecté");
      setIsOpen(false);
      navigate("/");
    }
  };
  function deconnexion() {
    setIdentifiant("");
    //On vide le token pour la déconnexion
    localStorage.clear("token");
    //Avec un retour sur la page Home
    navigate("/");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const identifiant = e.target.elements.identifiant.value;
    const password = e.target.elements.password.value;
    login(identifiant, password);
  }
  return (
    <Navbar bg="white" expand="lg" className="navbar sticky-top gap-3 px-3">
      {identifiant ? (
        <Button type="submit" variant="warning" onClick={deconnexion}>
          Déconnexion
        </Button>
      ) : (
        <Navbar.Brand className="logo" href="/">
          <img src={Logo} alt="logo" height="80" />
        </Navbar.Brand>
      )}
      <Navbar.Collapse>
        <Nav className="itemsNavbar me-auto flex-grow-1 justify-content-evenly">
          <Nav.Link className="item" href="/">
            Accueil
          </Nav.Link>
          <NavDropdown
            className="item"
            title="Présentation"
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item className="item" href="/quisuisje">
              Qui suis-je ?
            </NavDropdown.Item>
            <NavDropdown.Item className="item" href="/concept">
              Le concept
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="item" href="/prestations">
            Mes prestations
          </Nav.Link>
          <Nav.Link className="item" href="/blog">
            Blog
          </Nav.Link>
          <Nav.Link className="item" href="/galerie">
            Galerie photos
          </Nav.Link>
          <Nav.Link className="item" href="/contact">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="linkSocialNetworks justify-content-end flex-row">
        <img
          alt=""
          src={Insta}
          height="30"
          width="30"
          onClick={() => {
            window.location.href =
              "https://www.instagram.com/naturopathyandlove/";
          }}
        />
        <img alt="" src={Linkedin} height="30" width="30" />
        <img
          onClick={() => setIsOpen(true)}
          alt=""
          src={GBP}
          height="30"
          width="30"
        />
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Modal
        show={modalIsOpen}
        onHide={() => setIsOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="login" onSubmit={handleSubmit}>
            <Form.Label>Saisissez vos identifiants et mot de passe</Form.Label>
            <Form.Control
              className="log"
              id="mail"
              type="text"
              placeholder="Email"
              required
              ref={identifiantRef}
            />
            <Form.Control
              className="log"
              id="password"
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />

            <div className="réinitialiser">
              <a href="">Réinitialiser Password</a>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="warning"
            className="btnLog"
            onClick={login}
          >
            <span className="button__text">Connexion</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
