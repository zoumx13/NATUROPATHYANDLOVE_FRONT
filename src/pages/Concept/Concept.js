import React, { useEffect, useState, useContext, useRef } from "react";
import { userContext } from "../../context/userContext";
import {
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Modal, Form } from "react-bootstrap";
import BgParallax1 from "../../assets/backgrounds/BgParallax1";
import "./style.css";

export default function Concept() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const [concept, setConcept] = useState([]);
  const [concat, setConcat] = useState("");
  const [titleModify, setTitleModify] = useState()
  const [resumeModify, setResumeModify] = useState()
  const [descriptionModify, setDescriptionModify] = useState();
  const [text, setText] = useState([]);
  const [modifyPresentation, setModifyPresentation] = useState(false);
  const [addImg, setAddImg] = useState(false);
  const [img, setImg] = useState();
  const [edit, setEdit] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
  async function getPresentation() {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      `http://127.0.0.1:8080/getPresentation/`,
      options
    );
    let data = await response.json();
    if (!data) {
      return;
    } else {
      setConcept(data[1]);
      let textToParse = JSON.parse(data[0].description);
      let onlyText = textToParse.blocks;
      setText(onlyText);
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
  const updatePresentation = async () => {
    console.log(concept._id, titleModify, resumeModify, descriptionModify)
    let data = {
      title: titleModify,
      resume: resumeModify,
      description: descriptionModify
    };
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
    let reponse = await fetch(
      `http://127.0.0.1:8080/modifyPresentation/${concept._id}/`,
      options
    );
    let donnees = await reponse.json();
    console.log("DONNEES", JSON.parse(donnees.docs.description));
    alert(`"Qui suis-je" mis à jour`);
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
        `http://127.0.0.1:8080/createImagePresentation/${concept._id}`,
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
    setResumeModify();
    setDescriptionModify()
    setModifyPresentation(false);
    setIsOpen(false);
    setAddImg(false);
    setImg();
  };


  useEffect(() => {
    getPresentation();
  }, [refresh]);

  return (
    <div>
      <BgParallax1 />
      <div className="prestationDetails">
        <div className="bigtitleDetails">
          {/* BTN MOD PRESENTATION */}
          {identifiant && (
            <div className="btnAdminArticle ">
              {" "}
              <Button
                value={concept._id}
                onClick={() => {
                  setModifyPresentation(true);
                }}
              >
                Modifier la présentation
              </Button>
            </div>
          )}
          {/* INPUT MODIF TITLE*/}
          <div className={hover()}>
            {edit === concept.title && identifiant ? (
              <>
                <input
                  placeholder={concept.title}
                  defaultValue={concept.title}
                  onChange={(e) => setTitleModify(e.target.value)}
                />
                <Button onClick={() => updatePresentation()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : (
              <h2
                onClick={() => {
                  setEdit(concept.title);
                }}
                className="titlePrestation"
              >
                {concept.title}{" "}
              </h2>
            )}
          </div>
          {/* INPUT MODIF SUBTITLE*/}
          <div className={hover()}>
            {edit === concept.resume && identifiant ? (
              <>
                <input
                  placeholder={concept.resume}
                  defaultValue={concept.resume}
                  onChange={(e) => setResumeModify(e.target.value)}
                />
                <Button onClick={() => updatePresentation()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : (
              <h3
                onClick={() => {
                  setEdit(concept.resume);
                }}
                className="subtitlePrestation"
              >
                {concept.resume}{" "}
              </h3>
            )}
          </div>
        </div>
        <div className="seperate">
          <div className="seperateExt"></div>
          <div className="seperateMiddle"></div>
          <div className="seperateExt"></div>
        </div>

        {/* TEXT PRESENTATION */}
        {modifyPresentation === false ? (
          <>
            {text.length > 0 && (
              <>
                <div className="textDetails">
                  {text.map((text) => {
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
                      src={`http://127.0.0.1:8080/presentation/${concept.imgIllustration}`}
                      alt=""
                    />
                  ) : (
                    <img
                      className="imgDetails"
                      src={`http://127.0.0.1:8080/presentation/${concept.imgIllustration}`}
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
                src={`http://127.0.0.1:8080/presentation/${concept.imgIllustration}`}
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
              onClick={() => updatePresentation()}
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
