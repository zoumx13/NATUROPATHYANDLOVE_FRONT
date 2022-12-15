import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Button, Card } from "react-bootstrap";
import Lotus from "../../assets/backgrounds/Lotus.mp4";
import BgParallax1 from "../../assets/backgrounds/BgParallax1";
import BgParallax2 from "../../assets/backgrounds/BgParallax2";
import BgParallax3 from "../../assets/backgrounds/BgParallax3";
import BgParallax4 from "../../assets/backgrounds/BgParallax4";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();
  const [allPrestations, setAllPrestations] = useState([]);
  const [quiSuisJe, setQuiSuisJe] = useState([]);
  const [concept, setConcept] = useState([]);
  const [galerie, setGalerie] = useState([]);
  const [article, setArticle] = useState([]);
  const [dateBlog, setDateBlog] = useState();
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
  async function getArticle() {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("http://127.0.0.1:8080/getPosts/", options);
    let data = await response.json();
    if (!data) {
      return;
    } else {
      const res = data.reverse();
      const result = res.find((article) => {
        return article.display === true;
      });
      let thedate;
      const newdate = result.date;
      const date = new Date(newdate);
      const aDay = date.getDay();
      const theday = Object.values(day)[aDay - 1];
      const thejour = date.getDate();
      const aMonth = date.getMonth();
      const themonth = Object.values(month)[aMonth];
      const theyear = date.getFullYear();
      thedate = theday + " " + thejour + " " + themonth + " " + theyear;
      setArticle(result);
      setDateBlog(thedate);
    }
  }
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
  async function getPresentation() {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      "http://127.0.0.1:8080/getPresentation/",
      options
    );
    let data = await response.json();
    if (!data) {
      return;
    } else {
      setQuiSuisJe(data[0]);
      setConcept(data[1]);
    }
  }
  async function getGalerie() {
    let array = [];
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("http://127.0.0.1:8080/getGalerie/", options);
    let data = await response.json();
    if (!data) {
      return;
    } else {
      for (let i = 0; i < 3; i++) {
        array.push(data[i]);
      }
      setGalerie(array);
    }
  }
  const detailsArticle = async (idArticle) => {
    navigate(`/blog/${idArticle}`);
  };

  useEffect(() => {
    getAllPrestations();
  }, []);
  useEffect(() => {
    getPresentation();
  }, []);
  useEffect(() => {
    getGalerie();
  }, []);
  useEffect(() => {
    getArticle();
  }, []);
  return (
    <div className="home">
      <header className="backgroundVideo">
        <div className="overlay"></div>
        <video src={Lotus} autoPlay loop muted />
        <div className="content">
          <h1 className="heading-title">Naturopathy And Love</h1>
          <p className="heading-subtitle">
            La santé par la force du coeur et de la nature
          </p>
          <Button
            onClick={() =>
            (window.location.href =
              "https://www.crenolib.fr/therapeute/naturopathe/marseille/13007/66066-sophie_leotard")
            }
          >
            Prendre rendez-vous
          </Button>
        </div>
      </header>{" "}
      <div className="category">
        {quiSuisJe && (
          <div className="quisuije">
            <h2 className="h2home">Qui suis-je ?</h2>
            <div className="seperate">
              <div className="seperateExt"></div>
              <div className="seperateMiddle"></div>
              <div className="seperateExt"></div>
            </div>
            <p>{quiSuisJe.resume}</p>
            <Button
              onClick={() => {
                navigate("/quisuisje");
              }}
            >
              Lire la suite
            </Button>
          </div>
        )}
      </div>
      <BgParallax1 />
      <div className="category">
        {concept && (
          <div className="concept">
            <h2 className="h2home">
              Naturopathie et Naturopathy And Love : concept
            </h2>
            <div className="seperate">
              <div className="seperateExt"></div>
              <div className="seperateMiddle"></div>
              <div className="seperateExt"></div>
            </div>
            <p>{concept.resume}</p>
            <Button
              onClick={() => {
                navigate("/concept");
              }}
            >
              Lire la suite
            </Button>
          </div>
        )}
      </div>
      <BgParallax2 />
      <div className="prestations">
        <div className="picturesPrestation">
          <Carousel className="carousselPrestation">
            {allPrestations.map((prestation) => {
              return (
                <Carousel.Item key={"home" + prestation._id + "img"}>
                  <img
                    className="imgCaroussel"
                    src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
                    alt=""
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="detailsPrestation">
          <h2 className="h2home">Mes prestations</h2>
          <div className="seperate">
            <div className="seperateExt"></div>
            <div className="seperateMiddle"></div>
            <div className="seperateExt"></div>
          </div>
          <ul>
            {allPrestations.map((prestation) => {
              return (
                <li className="liPrestations" key={"home" + prestation._id}>
                  <a className="" href={`/prestations/${prestation._id}`}>
                    {prestation.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <BgParallax3 />
      <div className="category">
        <div className="subtitle">
          {" "}
          <h2 className="h2home">Blog</h2>
          <div className="seperate">
            <div className="seperateExt"></div>
            <div className="seperateMiddle"></div>
            <div className="seperateExt"></div>
          </div>
          {article && dateBlog && (
            <div className="cards">
              <Card
                className="card"
                key={article._id}
                style={{ width: "30rem" }}
              >
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
                />
                <p className="date">{dateBlog} </p>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.subtitle}</Card.Text>
                  <Button
                    value={article._id}
                    onClick={(e) => detailsArticle(e.target.value)}
                  >
                    Lire
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
      <BgParallax4 />
      <div className="category">
        {galerie.length > 0 && (
          <div className="quisuije">
            <h2 className="h2home">Galerie photos</h2>
            <div className="seperate">
              <div className="seperateExt"></div>
              <div className="seperateMiddle"></div>
              <div className="seperateExt"></div>
            </div>
            <div className="containerImgQui">
              {galerie.map((img) => {
                return (
                  <img
                    key={"imgQui" + img.imgIllustration}
                    className="imgQui"
                    src={`http://127.0.0.1:8080/galerie/${img.imgIllustration}`}
                    alt=""
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
      <div className="seperate">
        <div className="seperateExt"></div>
        <div className="seperateMiddle"></div>
        <div className="seperateExt"></div>
      </div>
    </div>
  );
}

