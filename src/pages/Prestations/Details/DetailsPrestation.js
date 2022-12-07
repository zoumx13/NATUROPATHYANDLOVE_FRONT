import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BgParallax2 from "../../../assets/backgrounds/BgParallax2";
import "./style.css";

export default function DetailsPrestation() {
  let { idPrestation } = useParams();
  const [prestation, setPrestation] = useState([]);
  const [paragraphe, setParagraphe] = useState([]);
  async function getPrestationDetails(idPrestation) {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      `http://127.0.0.1:8080/getPrestationDetails/${idPrestation}`,
      options
    );
    let donnees = await response.json();
    if (!donnees) {
      return;
    } else {
      setPrestation(donnees);
      setParagraphe(donnees.description);
    }
  }

  useEffect(() => {
    getPrestationDetails(idPrestation);
  }, []);

  return (
    <div>
      {" "}
      <BgParallax2 />
      <div className="prestationDetails">
        <div className="bigtitleDetails">
          <h3>{prestation.title}</h3>
          <h4>{prestation.subtitle}</h4>
        </div>
        <div className="textDetails">
          {paragraphe.map((paragraphe) => {
            return <p>{paragraphe.paragraphe}</p>;
          })}
        </div>
        <div className="pictureDetails">
          <img
            className="imgDetails"
            src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
