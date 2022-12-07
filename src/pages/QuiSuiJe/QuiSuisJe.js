import React, { useEffect, useState } from "react";
import BgParallax1 from "../../assets/backgrounds/BgParallax1";
import "./style.css";

export default function QuiSuisJe() {
  const [quiSuisJe, setQuiSuisJe] = useState([]);
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
    }
  }

  useEffect(() => {
    getPresentation();
  }, []);
  return (
    <div>
      <BgParallax1 />
      {quiSuisJe.length > 0 ? (
        <div>
          <h2>{quiSuisJe[0].resume}</h2>
          {quiSuisJe[0].description.map((description) => {
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
