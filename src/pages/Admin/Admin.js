import React from "react";
import { Accordion } from "react-bootstrap";
import Galerie from "./Components/Galerie/Galerie";
import "./style.css";

export default function Admin() {
  return (
    <Accordion defaultActiveKey={[""]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordionHeader">Accueil</Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="accordionHeader">
          Qui suis-je
        </Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className="accordionHeader">
          Prestations
        </Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header className="accordionHeader">Galerie</Accordion.Header>
        <Accordion.Body>
          <Galerie />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header className="accordionHeader">Blog</Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header className="accordionHeader">Contact</Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
