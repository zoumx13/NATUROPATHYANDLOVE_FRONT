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
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import BgParallax4 from "../../../assets/backgrounds/BgParallax4";
import "draft-js/dist/Draft.css";
import "./style.css";

export default function DetailsArticle() {
  const { identifiant, setIdentifiant } = useContext(userContext);
  const navigate = useNavigate();
  let { idArticle } = useParams();
  const [modifyArticle, setModifyArticle] = useState(false);
  const [publish, setPublish] = useState();
  const [checked, setChecked] = useState();
  const [article, setArticle] = useState([]);
  const [text, setText] = useState([]);
  const [edit, setEdit] = useState();
  const [titleModify, setTitleModify] = useState();
  const [subtitleModify, setSubtitleModify] = useState();
  const [textModify, setTextModify] = useState();
  const [displayModify, setDisplayModify] = useState();
  const [concat, setConcat] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
              setTextModify(result);
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
  async function getArticleDetails(idArticle) {
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      `http://127.0.0.1:8080/getPost/${idArticle}`,
      options
    );
    let donnees = await response.json();
    if (!donnees) {
      return;
    } else {
      setArticle(donnees);
      if (donnees.display === true) {
        setPublish("En ligne");
        setChecked(true);
      } else {
        setPublish("Hors ligne");
        setChecked(false);
      }
      let textToParse = JSON.parse(donnees.text);
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
  const deletePost = async (idArticle) => {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let response = await fetch(
      `http://127.0.0.1:8080/deletePost/${idArticle}`,
      options
    );
    await response.json();
    alert(`Article supprimé.`);
    navigate("/blog");
  };
  const updateArticle = async () => {
    let data = {
      title: titleModify,
      subtitle: subtitleModify,
      text: textModify,
      display: displayModify,
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
      `http://127.0.0.1:8080/modifyPost/${article._id}/`,
      options
    );
    let donnees = await reponse.json();
    console.log("DONNEES", JSON.parse(donnees.docs.text));
    alert(`Article mis à jour`);
    clear();
    setRefresh(!refresh);
  };
  const updatePublish = async (props) => {
    let data = {
      title: titleModify,
      subtitle: subtitleModify,
      text: textModify,
      display: props,
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
      `http://127.0.0.1:8080/modifyPost/${article._id}/`,
      options
    );
    await reponse.json();
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
        `http://127.0.0.1:8080/createImageArticle/${idArticle}`,
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
    setTextModify();
    setDisplayModify();
    setModifyArticle(false);
    setIsOpen(false);
    setAddImg(false);
    setImg();
  };

  useEffect(() => {
    getArticleDetails(idArticle);
  }, [refresh]);

  return (
    <div>
      {" "}
      <BgParallax4 />
      <div className="prestationDetails">
        <div className="bigtitleDetails">
          {/* BTN SUPP ARTICLE */}
          {identifiant && (
            <>
              <Form.Check
                type="switch"
                id="custom-switch"
                label={publish}
                checked={checked}
                onChange={(e) => {
                  setChecked(!checked);
                  setDisplayModify(!checked);
                  updatePublish(e.target.checked);
                }}
              />

              <div className="btnAdminArticle ">
                {" "}
                <Button
                  value={idArticle}
                  onClick={(e) => {
                    deletePost(e.target.value);
                  }}
                >
                  Supprimer l'article
                </Button>
                <Button
                  value={idArticle}
                  onClick={() => {
                    setModifyArticle(true);
                  }}
                >
                  Modifier l'article
                </Button>
              </div>
            </>
          )}
          {/* INPUT MODIF TITLE*/}
          <div className={hover()}>
            {edit === article.title && identifiant ? (
              <>
                <input
                  placeholder={article.title}
                  defaultValue={article.title}
                  onChange={(e) => setTitleModify(e.target.value)}
                />
                <Button onClick={() => updateArticle()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : (
              <h3
                onClick={() => {
                  setEdit(article.title);
                }}
                className="titlePrestation"
              >
                {article.title}{" "}
              </h3>
            )}
          </div>
          {/* INPUT MODIF SUBTITLE*/}
          <div className={hover()}>
            {edit === article.subtitle && identifiant ? (
              <>
                <input
                  placeholder={article.subtitle}
                  defaultValue={article.subtitle}
                  onChange={(e) => setSubtitleModify(e.target.value)}
                />
                <Button onClick={() => updateArticle()}>Valider</Button>
                <Button onClick={() => clear()}>Annuler</Button>
              </>
            ) : (
              <h4
                onClick={() => {
                  setEdit(article.subtitle);
                }}
                className="subtitlePrestation"
              >
                {article.subtitle}{" "}
              </h4>
            )}
          </div>
        </div>
        <div className="seperate">
          <div className="seperateExt"></div>
          <div className="seperateMiddle"></div>
          <div className="seperateExt"></div>
        </div>

        {/* TEXT ARTICLE */}
        {modifyArticle === false ? (
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
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Tooltip!</Tooltip>
                      }
                    >
                      <img
                        onClick={() => {
                          setAddImg(true);
                          setIsOpen(true);
                        }}
                        className="imgDetails"
                        src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
                        alt=""
                      />
                    </OverlayTrigger>
                  ) : (
                    <img
                      className="imgDetails"
                      src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
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
                src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
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
              onClick={() => updateArticle()}
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
