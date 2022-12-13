import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import BgParallax2 from "../../assets/backgrounds/BgParallax2";
import { Button, Modal, Form } from "react-bootstrap";
import "./style.css";

export default function Prestations() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const navigate = useNavigate();
  const [allPrestations, setAllPrestations] = useState([]);
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [resume, setResume] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
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
      setAllPrestations(data);
    }
  }
  const createPrestation = async () => {
    let data = {
      title: title,
      subtitle: subtitle,
      resume: resume,
    };
    const body = JSON.stringify(data);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: body,
    };
    let reponse = await fetch(
      "http://127.0.0.1:8080/createPrestation",
      options
    );
    let donnees = await reponse.json();
    alert(`Prestation créée`);
    detailsPrestation(donnees);
  };
  const detailsPrestation = async (idPrestation) => {
    navigate(`/prestations/${idPrestation}`);
  };

  useEffect(() => {
    getAllPrestations();
  }, []);

  return (
    <div>
      {" "}
      <BgParallax2 />
      {identifiant && (
        <Button onClick={() => setIsOpen(true)}>Ajouter une prestation</Button>
      )}
      <div className="prestations">
        {allPrestations.map((prestation) => {
          if (allPrestations.indexOf(prestation) % 2 === 0) {
            return (
              <div key={prestation._id} className="prestation">
                <div className="picture">
                  <img
                    className="img"
                    src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
                    alt=""
                  />
                </div>
                <div className="data">
                  <h3 className="titlePrestations">{prestation.title}</h3>
                  <h4 className="subtitlePrestations">{prestation.subtitle}</h4>
                  <div className="seperate">
                    <div className="seperateExt"></div>
                    <div className="seperateMiddle"></div>
                    <div className="seperateExt"></div>
                  </div>
                  <p className="resume">{prestation.resume}</p>
                  <div className="btn">
                    {" "}
                    <Button
                      value={prestation._id}
                      onClick={(e) => {
                        detailsPrestation(e.target.value);
                      }}
                    >
                      {identifiant ? "Détails" : "Lire la suite"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={prestation._id} className="prestation">
                <div className="data">
                  <h3 className="titlePrestations">{prestation.title}</h3>
                  <h4 className="subtitlePrestations">{prestation.subtitle}</h4>
                  <div className="seperate">
                    <div className="seperateExt"></div>
                    <div className="seperateMiddle"></div>
                    <div className="seperateExt"></div>
                  </div>
                  <p className="resume">{prestation.resume}</p>
                  <div className="btn">
                    {" "}
                    <Button
                      value={prestation._id}
                      onClick={(e) => {
                        detailsPrestation(e.target.value);
                      }}
                    >
                      {identifiant ? "Détails" : "Lire la suite"}
                    </Button>
                  </div>
                </div>
                <div className="picture">
                  <img
                    className="img"
                    src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
                    alt=""
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="seperate">
        <div className="seperateExt"></div>
        <div className="seperateMiddle"></div>
        <div className="seperateExt"></div>
      </div>
      <Modal
        show={modalIsOpen}
        onHide={() => setIsOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className=""
              type="text"
              placeholder="Prestation"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control
              className=""
              type="text"
              placeholder="Sous-titre"
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <Form.Control
              className=""
              type="text"
              placeholder="Résumé"
              onChange={(e) => setResume(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => createPrestation()}
            type="submit"
            className="btnLog"
          >
            Valider
          </Button>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
