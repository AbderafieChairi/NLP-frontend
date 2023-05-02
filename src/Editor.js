import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";


export default function Editor(props) {
  const {
    displayName,
    value,
    onChange,
    language,
  } = props;
  const [open, setOpen] = useState(
    true
  );
  const handleChange = (
    editor,
    data,
    value
  ) => {
    onChange(value);
  };
  return (
    <div
      className={"editor-container"}
    >

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}

        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          indentWithTabs: true,
          theme: "material",
          lineNumbers: true,
          autoCloseTags: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {'Ctrl-Space': 'autocomplete'}
        }}
      />
    </div>
  );
}
