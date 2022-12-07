import React, { useState, useEffect } from "react";
import BgParallax1 from "../../assets/backgrounds/BgParallax1";
import "./style.css";

export default function Concept() {
  const [concept, setConcept] = useState([]);
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
      setConcept(data[0].concept);
    }
  }

  useEffect(() => {
    getPresentation();
  }, []);

  return (
    <div>
      <BgParallax1 />
      {concept.length > 0 ? (
        <div>
          <h2>{concept[0].resume}</h2>
          {concept[0].description.map((description) => {
            return (
              <div>
                <h3>{description.subtitle}</h3>
                <p>{description.paragraphe}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
