import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ReCAPTCHA from "react-google-recaptcha";
import "./style.css";

export default function ContactForm() {
  const [prestations, setPrestations] = useState([]);
  const [validated, setValidated] = useState(false);
  const [captcha, setCaptcha] = useState();
  const captchaRef = useRef(null);

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
  const handleSubmit = async (event) => {
    console.log(captchaRef);
    const form = event.currentTarget;
    const civilite = document.querySelector("#civilite").value;
    const nom = document.querySelector("#nom").value;
    const prenom = document.querySelector("#prenom").value;
    const telephone = document.querySelector("#telephone").value;
    const email = document.querySelector("#email").value;
    const interet = document.querySelector("#interet").value;
    const message = document.querySelector("#message").value;
    const token = captcha;
    if (form.checkValidity() === false) {
      alert("Veuillez remplir les champs");
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (!captcha) {
      alert("Sécurité non validée");
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      let data = {
        civilite: civilite,
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        email: email,
        interet: interet,
        message: message,
        token: token,
      };
      const body = JSON.stringify(data);
      setValidated(true);
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };
      let response = await fetch("http://127.0.0.1:8080/mail", options);
      let donnees = await response.json();
      if (donnees.success === true) {
        alert("Formulaire envoyé");
      } else {
        alert("Erreur lors de l'envoi");
      }
    }
    setCaptcha("");
  };

  async function onChange(value) {
    setCaptcha(value);
  }

  useEffect(() => {
    getAllPrestations();
  }, []);

  return (
    <div className="contact">
      <Form
        className="formulaire"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="mb-12">
          <Col>
            <Form.Group as={Col} md="12">
              <Form.Select id="civilite">
                <option>Civilité</option>
                <option>M.</option>
                <option>Mme</option>
                <option>Mlle</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Control
                required
                type="text"
                placeholder="Nom"
                defaultValue=""
                id="nom"
              />
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Control
                required
                type="text"
                placeholder="Prénom"
                defaultValue=""
                id="prenom"
              />
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Control
                type="tel"
                placeholder="Téléphone"
                id="telephone"
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="12">
              <InputGroup hasValidation>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="email"
                  id="email"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12">
              <Form.Select id="interet">
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
            <Form.Group className="inputMessage" as={Col} md="12">
              <FloatingLabel label="Message">
                <Form.Control
                  as="textarea"
                  type="text"
                  // placeholder="Message *"
                  style={{ height: "100px" }}
                  required
                  id="message"
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
            <div>
              <Button type="submit">Envoyer</Button>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                ref={captchaRef}
                onChange={onChange}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
