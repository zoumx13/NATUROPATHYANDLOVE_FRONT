import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import BgParallax4 from "../../assets/backgrounds/BgParallax4";
import { Button, Modal, Card, Form } from "react-bootstrap";
import "./style.css";

export default function Blog() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  const day = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const month = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  async function getArticles() {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("http://127.0.0.1:8080/getPosts/", options);
    let data = await response.json();
    if (!data) {
      return;
    } else {
      setArticles(data.reverse());
    }
  }
  const createArticle = async () => {
    let data = {
      title: title,
      subtitle: subtitle,
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
    let reponse = await fetch("http://127.0.0.1:8080/createPost", options);
    let donnees = await reponse.json();
    alert(`Article créé`);
    detailsArticle(donnees);
  };
  const detailsArticle = async (idArticle) => {
    navigate(`/blog/${idArticle}`);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="blog">
      <BgParallax4>
        <div>
          <h1>HELLLLLLLLLLLLLLLLLLLLLLO</h1>
        </div>
      </BgParallax4>
      {identifiant && (
        <Button onClick={() => setIsOpen(true)}>Créer un article</Button>
      )}
      <div className="blog">
        <div className="cards">
          {articles.map((article) => {
            if (article.display === true) {
              const newdate = article.date;
              const date = new Date(newdate);
              let aDay = date.getDay();
              if (aDay === 0) {
                aDay = 7;
              }
              const theday = Object.values(day)[aDay - 1];
              const thejour = date.getDate();
              const aMonth = date.getMonth();
              const themonth = Object.values(month)[aMonth];
              const theyear = date.getFullYear();
              return (
                <Card
                  className="card"
                  key={article._id}
                  style={{ width: "30rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
                  />
                  <p className="date">
                    {theday} {thejour} {themonth} {theyear}
                  </p>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.subtitle}</Card.Text>
                    <Button
                      value={article._id}
                      onClick={(e) => detailsArticle(e.target.value)}
                    >
                      {!identifiant ? "Lire" : "Détails"}
                    </Button>
                  </Card.Body>
                </Card>
              );
            }
          })}
        </div>
        {identifiant && (
          <div className="cards">
            {articles.map((article) => {
              if (article.display === false) {
                return (
                  <Card
                    className="card"
                    key={article._id}
                    style={{ width: "30rem" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
                    />
                    <p className="date">NON PUBLIE</p>
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Text>{article.subtitle}</Card.Text>
                      <Button
                        value={article._id}
                        onClick={(e) => detailsArticle(e.target.value)}
                      >
                        Détails
                      </Button>
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </div>
        )}
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
          <Modal.Title>Créer un article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className=""
              type="text"
              placeholder="Sujet"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control
              className=""
              type="text"
              placeholder="Description"
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => createArticle()}
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
