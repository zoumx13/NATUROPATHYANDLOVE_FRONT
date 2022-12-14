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
        <div className="detailsQui">
          <h2 className="resumeQui">{quiSuisJe[0].resume}</h2>
          {quiSuisJe[0].description.map((description) => {
            return (
              <div className="textQui">
                <h3 className="subtitleQui">{description.subtitle}</h3>
                <p className="paragrapheQui">{description.paragraphe}</p>
              </div>
            );
          })}
          <div className="containerImgConcept">
            {quiSuisJe[0].imgIllustration.map((img) => {
              return (
                <img
                  className="imgQui"
                  src={`http://127.0.0.1:8080/quisuisje/${img}`}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="seperate">
        <div className="seperateExt"></div>
        <div className="seperateMiddle"></div>
        <div className="seperateExt"></div>
      </div>
    </div>
  );
}
