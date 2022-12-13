import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./style.css";

export default function ContactForm() {
  const [prestations, setPrestations] = useState([]);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    setValidated(true);
    alert("SUBMIT OK");
  };
  async function getAllPrestations() {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      "http://127.0.0.1:8080/getPrestations/",
      options
    );
    let data = await response.json();
    if (!data) {
      return;
    } else {
      setPrestations(data);
    }
  }

  useEffect(() => {
    getAllPrestations();
  }, []);

  return (
    <div className="contact">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-12">
          <Col>
            <Form.Group as={Col} md="12" controlId="validationCustom04">
              <Form.Select>
                <option>Civilité</option>
                <option>M.</option>
                <option>Mme</option>
                <option>Mlle</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                placeholder="Nom *"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                placeholder="Prénom"
                defaultValue=""
              />
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Control type="tel" placeholder="Téléphone *" required />
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomEmail">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email *"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Select>
                <option>Je suis interessé(e) par </option>
                {prestations.map((prestation) => {
                  return (
                    <option key={prestation._id}>{prestation.title}</option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="inputMessage"
              as={Col}
              md="12"
              controlId="validationCustom06"
            >
              <FloatingLabel controlId="floatingTextarea2" label="Message">
                <Form.Control
                  as="textarea"
                  type="text"
                  // placeholder="Message *"
                  style={{ height: "100px" }}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <div>
              <p className="RGPD">
                Les informations recueillies font l’objet d’un traitement
                informatique destiné à Sophie LEOTARD, responsable du
                traitement, afin de donner suite à votre demande et de vous
                recontacter. Conformément à la réglementation en vigueur, vous
                disposez notamment d'un droit d'accès, de rectification,
                d'opposition et d'effacement sur les données personnelles qui
                vous concernent.
              </p>
            </div>
            <Button type="submit">Envoyer</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
