import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../../context/userContext";
import {
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Button, Modal, Form } from "react-bootstrap";
import BgParallax2 from "../../../assets/backgrounds/BgParallax2";
import "draft-js/dist/Draft.css";
import "./style.css";

export default function DetailsPrestation() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const navigate = useNavigate();
  let { idPrestation } = useParams();
  const [prestation, setPrestation] = useState([]);
  const [edit, setEdit] = useState();
  const [titleModify, setTitleModify] = useState();
  const [subtitleModify, setSubtitleModify] = useState();
  const [resumeModify, setResumeModify] = useState();
  const [prestationModify, setPrestationModify] = useState(false);
  const [descriptionModify, setDescriptionModify] = useState();
  const [refresh, setRefresh] = useState(false);
  const [paragraphe, setParagraphe] = useState([]);
  const [concat, setConcat] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addImg, setAddImg] = useState(false);
  const [img, setImg] = useState();

  function TextEditor() {
    const [editorState, setEditorState] = useState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(concat))
      )
    );
    const editor = useRef(null);

    const BLOCK_TYPES = [
      { label: "Sous-titre", style: "header-five" },
      { label: "Puce", style: "unordered-list-item" },
    ];
    const INLINE_STYLES = [
      { label: "Gras", style: "BOLD" },
      { label: "Italique", style: "ITALIC" },
      { label: "Souligné", style: "UNDERLINE" },
    ];
    // function focusEditor() {
    //   editor.current.focus();
    // }
    const StyleButton = (props) => {
      let onClickButton = (e) => {
        e.preventDefault();
        props.onToggle(props.style);
      };
      return <button onMouseDown={onClickButton}>{props.label}</button>;
    };
    const BlockStyleControls = (props) => {
      return (
        <div>
          {BLOCK_TYPES.map((type) => (
            <StyleButton
              key={type.label}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          ))}
        </div>
      );
    };
    const InlineStyleControls = (props) => {
      return (
        <div>
          {INLINE_STYLES.map((type) => (
            <StyleButton
              key={type.label}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          ))}
        </div>
      );
    };

    const onInlineClick = (e) => {
      let nextState = RichUtils.toggleInlineStyle(editorState, e);
      setEditorState(nextState);
    };
    const onBlockClick = (e) => {
      let nextState = RichUtils.toggleBlockType(editorState, e);
      setEditorState(nextState);
    };
    // useEffect(() => {
    //   focusEditor();
    // }, []);

    return (
      <div>
        <div className="blockTextEditor">
          <BlockStyleControls onToggle={onBlockClick} />
          <InlineStyleControls onToggle={onInlineClick} />
        </div>
        <div className="blockTextEditor">
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={(editorState) => {
              setEditorState(editorState);
            }}
          />
          <Button
            onClick={() => {
              let current = editorState.getCurrentContent();
              let result = JSON.stringify(convertToRaw(current));
              // console.log(test2); /*ARRAY OF OBJECT */
              setEdit("");
              setDescriptionModify(result);
              setIsOpen(true);
            }}
          >
            Valider
          </Button>
          <Button onClick={() => clear()}>Annuler</Button>
        </div>
      </div>
    );
  }
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
      let textToParse = JSON.parse(donnees.description);
      let onlyText = textToParse.blocks;
      setParagraphe(onlyText);
      let concat = "";
      onlyText.map((item) => {
        if (item.type === "header-five" && item.text !== "") {
          concat = concat + `<h5>${item.text}</h5>`;
        }
        if (item.type === "unstyled" && item.text !== "") {
          concat = concat + `<p>${item.text}</p>`;
        }
        if (item.text === "") {
          concat =
            concat +
            `<p>${item.text}<p>
                `;
        }
        setConcat(concat);
      });
    }
  }
  const deletePrestation = async (idPrestation) => {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let response = await fetch(
      `http://127.0.0.1:8080/deletePrestation/${idPrestation}`,
      options
    );
    await response.json();
    alert(`Prestation supprimée.`);
    navigate("/prestations");
  };
  const updatePrestation = async () => {
    let data = {
      title: titleModify,
      subtitle: subtitleModify,
      resume: resumeModify,
      description: descriptionModify,
    };
    console.log("data", data);
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
    let reponse = await fetch(
      `http://127.0.0.1:8080/modifyPrestation/${idPrestation}/`,
      options
    );
    let donnees = await reponse.json();
    alert(`Article mis à jour`);
    clear();
    setRefresh(!refresh);
  };
  const UploadImages = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };
  const updatePhoto = async () => {
    if (img.data) {
      const formData = new FormData();
      formData.append("file", img.data);
      let options = {
        method: "POST",
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: formData,
      };
      const response = await fetch(
        `http://127.0.0.1:8080/createImagePrestation/${idPrestation}`,
        options
      );
      let result = await response.json();
      const res = JSON.stringify(result);
      if (res !== '{"message":"Echec"}') {
        alert(`Photo mise à jour`);
        clear();
        setRefresh(!refresh);
      }
    }
  };
  const hover = () => {
    if (identifiant) {
      return "hover";
    } else {
      return "";
    }
  };
  const clear = () => {
    setEdit();
    setTitleModify();
    setSubtitleModify();
    setResumeModify();
    setDescriptionModify();
    setPrestationModify(false);
    setIsOpen(false);
    setAddImg(false);
    setImg();
  };
  useEffect(() => {
    getPrestationDetails(idPrestation);
  }, [refresh]);

  return (
    <div>
      {" "}
      <BgParallax2 />
      <div className="prestationDetails">
        <div className="bigtitleDetails">
          {identifiant && (
            <>
              <div className="btnAdminArticle ">
                {" "}
                <Button
                  value={idPrestation}
                  onClick={(e) => {
                    deletePrestation(e.target.value);
                  }}
                >
                  Supprimer la prestation
                </Button>
                <Button
                  value={idPrestation}
                  onClick={() => {
                    setPrestationModify(true);
                  }}
                >
                  Modifier la prestation
                </Button>
              </div>
            </>
          )}
          {/* INPUT MODIF TITLE*/}
          <div className={hover()}>
            {edit === prestation.title && identifiant ? (
              <>
                <input
                  placeholder={prestation.title}
                  defaultValue={prestation.title}
                  onChange={(e) => setTitleModify(e.target.value)}
                />
                <Button onClick={() => updatePrestation()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : (
              <h3
                onClick={() => {
                  setEdit(prestation.title);
                }}
                className="titlePrestation"
              >
                {prestation.title}{" "}
              </h3>
            )}
          </div>
          {/* INPUT MODIF SUBTITLE*/}
          <div className={hover()}>
            {edit === prestation.subtitle && identifiant ? (
              <>
                <input
                  placeholder={prestation.subtitle}
                  defaultValue={prestation.subtitle}
                  onChange={(e) => setSubtitleModify(e.target.value)}
                />
                <Button onClick={() => updatePrestation()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : (
              <h4
                onClick={() => {
                  setEdit(prestation.subtitle);
                }}
                className="subtitlePrestation"
              >
                {prestation.subtitle}{" "}
              </h4>
            )}
          </div>
          {/* INPUT MODIF RESUME*/}
          <div className={hover()}>
            {edit === prestation.resume && identifiant ? (
              <>
                <input
                  placeholder={prestation.resume}
                  defaultValue={prestation.resume}
                  onChange={(e) => setResumeModify(e.target.value)}
                />
                <Button onClick={() => updatePrestation()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : identifiant ? (
              <p
                onClick={() => {
                  setEdit(prestation.resume);
                }}
              >
                {`(Résumé : ${prestation.resume})`}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="seperate">
          <div className="seperateExt"></div>
          <div className="seperateMiddle"></div>
          <div className="seperateExt"></div>
        </div>

        {/* PARAGRAPHE PRESTATION */}
        {prestationModify === false ? (
          <>
            {paragraphe.length > 0 && (
              <>
                <div className="textDetails">
                  {paragraphe.map((text) => {
                    if (text.type === "unstyled") {
                      return (
                        <p key={text.text} className="paragraphePrestation">
                          {text.text}
                        </p>
                      );
                    } else if (text.type === "header-five") {
                      return (
                        <h5 key={text.text} className="subtitlePara">
                          {text.text}
                        </h5>
                      );
                    }
                  })}
                </div>

                <div className="pictureDetails">
                  {identifiant ? (
                    <img
                      onClick={() => {
                        setAddImg(true);
                        setIsOpen(true);
                      }}
                      className="imgDetails"
                      src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
                      alt=""
                    />
                  ) : (
                    <img
                      className="imgDetails"
                      src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
                      alt=""
                    />
                  )}
                </div>
              </>
            )}{" "}
          </>
        ) : (
          <TextEditor />
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
          <Modal.Title>Modifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {addImg && !img && (
              <img
                className="addImg"
                alt=""
                src={`http://127.0.0.1:8080/prestations/${prestation.imgIllustration}`}
              />
            )}
            {addImg && img && (
              <img className="addImg" alt="" src={img.preview} />
            )}
            {addImg && (
              <input
                type="file"
                name="image"
                onChange={UploadImages}
                className="form-control"
                id="uploadBtn"
              />
            )}
            {!addImg && "Voulez-vous valider les modifications ?"}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {addImg ? (
            <Button
              onClick={() => updatePhoto()}
              type="submit"
              className="btnLog"
            >
              Valider
            </Button>
          ) : (
            <Button
              onClick={() => updatePrestation()}
              type="submit"
              className="btnLog"
            >
              Valider
            </Button>
          )}
          <Button variant="secondary" onClick={() => clear()}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
