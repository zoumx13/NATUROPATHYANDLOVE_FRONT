import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./style.css";

export default function Connexion() {
  const navigate = useNavigate();
  const passwordRef = React.useRef();
  const identifiantRef = React.useRef();
  const login = async (identifiant, password) => {
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
      alert("Connecté");
      navigate("/admin");
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const identifiant = e.target.elements.identifiant.value;
    const password = e.target.elements.password.value;
    login(identifiant, password);
  }
  return (
    <div className="connexion">
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
        <Button
          type="submit"
          variant="warning"
          className="btnLog"
          onClick={login}
        >
          <span className="button__text">Connexion</span>
          <i className="button__icon fas fa-chevron-right"></i>
        </Button>
      </Form>
    </div>
  );
}
