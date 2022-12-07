import React from "react";
import GBP from "./assets/GBP.png";
import Linkedin from "./assets/Linkedin.png";
import Insta from "./assets/Instagram.png";
import Logo from "./assets/Logo.jpg";
import { NavDropdown, Nav, Navbar } from "react-bootstrap";
import "./style.css";

export default function NavBar() {
  return (
    <Navbar bg="white" expand="lg" className="sticky-top gap-3 px-3">
      <Navbar.Brand className="logo" href="/">
        <img src={Logo} alt="logo" height="80" />
      </Navbar.Brand>
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
        <img alt="" src={Insta} height="30" width="30" />
        <img alt="" src={Linkedin} height="30" width="30" />
        <img alt="" src={GBP} height="30" width="30" />
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}
