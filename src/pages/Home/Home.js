import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Button } from "react-bootstrap";
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
      setQuiSuisJe(data[0].quiSuisJe);
      setConcept(data[0].concept);
    }
  }

  useEffect(() => {
    getAllPrestations();
  }, []);
  useEffect(() => {
    getPresentation();
  }, []);

  return (
    <div className="home">
      <header className="backgroundVideo">
        <div className="overlay"></div>
        <video src={Lotus} autoPlay loop muted />
        <div className="content">
          <h1 className="heading">Naturopathy And Love</h1>
        </div>
      </header>{" "}
      <div className="category">
        <h2>Qui suis-je ?</h2>
        {quiSuisJe.length > 0 && <p>{quiSuisJe[0].resume}</p>}
        <Button
          onClick={() => {
            navigate("/quisuisje");
          }}
        >
          Lire la suite
        </Button>
      </div>
      <BgParallax1 />
      <div className="category">
        <h2>Naturopathy And Love : le concept</h2>
        {concept.length > 0 && <p>{concept[0].resume}</p>}
        <Button
          onClick={() => {
            navigate("/concept");
          }}
        >
          Lire la suite
        </Button>
      </div>
      <BgParallax2 />
      <div className="prestations">
        <div className="picturesPrestation">
          <Carousel>
            {allPrestations.map((prestation) => {
              return (
                <Carousel.Item>
                  <img
                    className="imgCarrousel"
                    src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
                    alt=""
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="detailsPrestation">
          <h2>Mes prestations</h2>
          <div className="seperate">
            <div className="seperateExt"></div>
            <div className="seperateMiddle"></div>
            <div className="seperateExt"></div>
          </div>
          <ul>
            {allPrestations.map((prestation) => {
              return (
                <li className="liPrestations" key={prestation._id}>
                  <a href="">{prestation.title}</a>
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
          <h2>Blog</h2>
        </div>
      </div>
      <BgParallax4 />
      <div className="category">
        <div className="subtitle">
          {" "}
          <h2>Galerie photos</h2>
        </div>
      </div>
      CONTACT
    </div>
  );
}
