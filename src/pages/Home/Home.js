import React from "react";
import Lotus from "../../assets/Lotus.mp4";
import "./style.css";

export default function Home() {
  return (
    <div>
      <header className="backgroundVideo">
        <div className="overlay"></div>
        <video src={Lotus} autoPlay loop muted />
        <div className="content">
          <h1 className="heading">Naturopathy And Love</h1>
        </div>
      </header>
      <body>
        <div>
          <div>
            <h2>TEXTE PRESENTATION</h2>
            <h2>LOGO DIPLOME CERTIF</h2>
          </div>
        </div>
        <h2>NATURO & NATUROANDLOVE ????????????</h2>
        <div>
          <h2>MES PRESTATION</h2>
          <h2>PHOTOS DES PRESTATIONS</h2>
        </div>
        <h2>GALERIE PHOTO</h2>
        <h2>BLOG CARROUSSEL</h2>
      </body>
    </div>
  );
}
