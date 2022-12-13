import React, { useRef, useState, useEffect, useContext } from "react";
import { userContext } from "../../context/userContext";
import { Button, Modal } from "react-bootstrap";
import BgParallax3 from "../../assets/backgrounds/BgParallax3";
import "./style.css";

export default function Galerie() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const [refresh, setRefresh] = useState(false);
  const [galerie, setGalerie] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteImg, setDeleteImg] = useState(false);
  const [addImg, setAddImg] = useState(false);
  const [idImg, setIdImg] = useState();
  const [img, setImg] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();

  async function getGalerie() {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("http://127.0.0.1:8080/getGalerie/", options);
    let data = await response.json();
    if (!data) {
      return;
    } else {
      setGalerie(data);
    }
  }
  const deleteOk = async () => {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let reponse = await fetch(
      `http://127.0.0.1:8080/deleteGalerie/${idImg}`,
      options
    );
    await reponse.json();
    alert(`Photo supprimé`);
    setRefresh(!refresh);
    clear();
  };

  const addOk = async () => {
    if (!img) {
      alert("Veuillez selectionner un fichier");
    } else {
      let data = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
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
      let reponse = await fetch("http://127.0.0.1:8080/createGalerie", options);
      let donnes = await reponse.json();
      if (donnes) {
        const id = donnes._id;
        if (img.data) {
          const formData = new FormData();
          formData.append("file", img.data);
          let options = {
            method: "POST",
            // // headers : headers,
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
              // "Content-Type": "multipart/form-data boundary=something",
            },
            body: formData,
          };
          const response = await fetch(
            `http://127.0.0.1:8080/createImageGalerie/${id}`,
            options
          );
          let result = await response.json();
          const res = JSON.stringify(result);
          if (res !== '{"message":"Echec"}') {
            setImg([]);
          }
        }
      }
      alert(`Photo publiée`);
      clear();
      setRefresh(!refresh);
    }
  };

  const clear = async () => {
    setIsOpen(false);
    setAddImg(false);
    setDeleteImg(false);
    setIdImg("");
    setImg([]);
  };
  const UploadImages = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };

  useEffect(() => {
    getGalerie();
  }, [refresh]);

  return (
    <div>
      <BgParallax3 />
      <div className="galerie">
        {identifiant && (
          <Button
            onClick={() => {
              setAddImg(true);
              setIsOpen(true);
            }}
          >
            Ajouter photo
          </Button>
        )}
        <div className="pictures">
          {galerie.map((picture) => {
            return (
              <img
                onClick={() => {
                  if (identifiant) {
                    setIdImg(picture._id);
                    setDeleteImg(true);
                    setIsOpen(true);
                    return;
                  }
                }}
                alt=""
                className="imgGalerie"
                src={`http://127.0.0.1:8080/galerie/${picture.imgIllustration}`}
              />
            );
          })}
        </div>
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
          <Modal.Title>
            {deleteImg === true && "Supprimer photo"}
            {addImg === true && "Ajouter photo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteImg === true && "Voulez vous supprimer la photo ?"}
          {addImg === true && (
            <div className="modalBody">
              {img && <img className="addImg" alt="" src={img.preview} />}
              <div className="Image1">
                <input
                  type="text"
                  name="title"
                  placeholder="Titre"
                  className="form-control"
                  ref={titleRef}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control"
                  ref={descriptionRef}
                />{" "}
                <input
                  type="file"
                  name="image"
                  onChange={UploadImages}
                  className="form-control"
                  id="uploadBtn"
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="warning"
            className="btnLog"
            onClick={() => {
              if (deleteImg === true) {
                deleteOk();
              }
              if (addImg === true) {
                addOk();
              }
            }}
          >
            Valider
          </Button>
          <Button variant="secondary" onClick={() => clear()}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
