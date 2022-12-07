import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgParallax2 from "../../assets/backgrounds/BgParallax2";
import { Button } from "react-bootstrap";
import "./style.css";

export default function Prestations() {
  const navigate = useNavigate();
  const [allPrestations, setAllPrestations] = useState([]);
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
  const detailsPrestation = async (idPrestation) => {
    console.log(idPrestation, "idpresta");
    navigate(`/prestations/${idPrestation}`);
  };

  useEffect(() => {
    getAllPrestations();
  }, []);

  return (
    <div>
      {" "}
      <BgParallax2 />
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
                  <h3 className="title">{prestation.title}</h3>
                  <h4 className="subtitle">{prestation.subtitle}</h4>
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
                      Lire la suite
                    </Button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={prestation._id} className="prestation">
                <div className="data">
                  <h3 className="title">{prestation.title}</h3>
                  <h4 className="subtitle">{prestation.subtitle}</h4>
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
                      Lire la suite
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
        {/* <div className="prestation">
          <div className="picture">
            <img className="img" src={picture} alt="" />
          </div>
          <div className="data">
            <h3 className="title">Lorem, ipsum.</h3>
            <h4 className="subtitle">
              Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p className="resume">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At,
              praesentium?
            </p>
          </div>
        </div>
        <div className="prestation">
          <div className="data">
            <h3 className="title">Lorem, ipsum.</h3>
            <h4 className="subtitle">
              Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p className="resume">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At,
              praesentium?
            </p>
          </div>
          <div className="picture">
            <img className="img" src={picture} alt="" />
          </div>
        </div>
        <div className="prestation">
          <div className="picture">
            {" "}
            <img className="img" src={picture} alt="" />
          </div>
          <div className="data">
            <h3 className="title">Lorem, ipsum.</h3>
            <h4 className="subtitle">
              Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p className="resume">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At,
              praesentium?
            </p>
          </div>
        </div>
        <div className="prestation">
          <div className="data">
            <h3 className="title">Lorem, ipsum.</h3>
            <h4 className="subtitle">
              Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p className="resume">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At,
              praesentium?
            </p>
          </div>
          <div className="picture">
            {" "}
            <img className="img" src={picture} alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
