import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import GBP from "../assets/GBP.png";
import Linkedin from "../assets/Linkedin.png";
import Insta from "../assets/Instagram.png";
import "./style.css";

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light sticky-top" className="w-100%">
      <Container className="navbar">
        <Navbar.Brand href="/">
          <p className="navbarItem">Naturopathy & Love</p>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">
            <p className="navbarItem">Accueil</p>
          </Nav.Link>
          <Nav.Link href="">
            <p className="navbarItem">Qui suis-je ?</p>
          </Nav.Link>
          <Nav.Link href="">
            <p className="navbarItem">Naturopathie et NaturopathyAndLove</p>
          </Nav.Link>
          <Nav.Link href="">
            <p className="navbarItem">Mes prestations</p>
          </Nav.Link>
          <Nav.Link href="">
            <p className="navbarItem">Galerie photos</p>
          </Nav.Link>
          <Nav.Link href="">
            <p className="navbarItem">Blog</p>
          </Nav.Link>
          <Nav.Link href="/contact">
            <p className="navbarItem">Contact</p>
          </Nav.Link>
        </Nav>
        <Nav className="linkSocialNetworks">
          <Nav.Link href="">
            <img alt="" src={Insta} />
          </Nav.Link>
          <Nav.Link href="">
            <img alt="" src={Linkedin} />
          </Nav.Link>
          <Nav.Link href="">
            <img alt="" src={GBP} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
