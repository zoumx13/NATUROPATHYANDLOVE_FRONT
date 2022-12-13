import React, { useState, useRef, useEffect } from "react";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { Button } from "react-bootstrap";
import "draft-js/dist/Draft.css";
import "./style.css";

export default function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  function focusEditor() {
    editor.current.focus();
  }
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

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div onClick={focusEditor}>
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
            let test = editorState.getCurrentContent();
            let test2 = JSON.stringify(convertToRaw(test));
            console.log(convertToRaw(test)); /*ARRAY OF OBJECT */
          }}
        >
          Valider
        </Button>
      </div>
    </div>
  );
}
