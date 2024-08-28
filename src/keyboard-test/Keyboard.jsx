import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInputValue,
  openOrCloseKeyboard,
} from "../store/slices/keyboardSlice";
import inputMask from "simple-keyboard-input-mask";
import KeyboardReact from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";

function Keyboard({ enterKeyPress, inputMode, input, inputValue }) {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.keyboard);
  const [layout, setLayout] = useState({ name: "default", key: "" });
  const [keyboard, setKeyboard] = useState(null);

  // console.log(keyboard);

  const handleKeyPress = (key) => {
    key === "{shift}" &&
      setLayout({ name: layout?.name === "shift" ? "default" : "shift", key });

    key === "{lock}" &&
      setLayout({ name: layout?.name === "shift" ? "default" : "shift", key });

    key !== "{shift}" &&
      key !== "{lock}" &&
      layout?.name === "shift" &&
      layout?.key === "{shift}" &&
      setLayout({ name: "default", key: "" });

    key === "{enter}" && enterKeyPress();

    key === "{close}" && dispatch(openOrCloseKeyboard(false));
  };

  const handleChangeKeyboard = (e) => {
    // const changeKeyboardInput = new CustomEvent("change-keyboard-input", {
    //   bubbles: true,
    //   detail: { input, value: e },
    // });

    // dispatchEvent(changeKeyboardInput);
    // dispatch(changeInputValue(e));
  };

  useEffect(() => {
    keyboard?.setInput(input?.value);
  }, [input]);

  switch (inputMode) {
    case "tel":
      return (
        <div style={{ width: "20rem", margin: "0 auto" }}>
          <KeyboardReact
            mergeDisplay={true}
            modules={[inputMask]}
            inputMask={{
              default: {
                mask: "+998 99 999 99 99",
                regex: /^[0-9]+$/,
              },
            }}
            layoutName="tel"
            onKeyPress={handleKeyPress}
            onChange={handleChangeKeyboard}
            keyboardRef={(e) => setKeyboard(e)}
            disableCaretPositioning={true}
            layout={{
              tel: ["1 2 3", "4 5 6", "7 8 9", "+ 0 {bksp}", "{close}"],
            }}
            display={{
              "{bksp}": "&#9003",
              "{close}": "⇩",
              //   "+": "&#10133",
            }}
          />
        </div>
      );

    case "numeric":
      return (
        <div style={{ width: "20rem", margin: "0 auto" }}>
          <KeyboardReact
            mergeDisplay={true}
            layoutName="numeric"
            inputMask={{
              default: {
                regex: /^[0-9].$/,
              },
            }}
            onKeyPress={handleKeyPress}
            onChange={handleChangeKeyboard}
            keyboardRef={(e) => setKeyboard(e)}
            disableCaretPositioning={true}
            layout={{
              numeric: ["1 2 3", "4 5 6", "7 8 9", ". 0 {bksp}", "{close}"],
            }}
            display={{
              "{bksp}": "&#9003",
              "{close}": "⇩",
              //   "+": "&#10133",
            }}
          />
        </div>
      );

    default:
      return (
        <KeyboardReact
          layoutName={layout.name}
          onKeyPress={handleKeyPress}
          onChange={handleChangeKeyboard}
          keyboardRef={(e) => setKeyboard(e)}
          physicalKeyboardHighlightBgColor="#000"
          theme={"hg-theme-default hg-layout-default myTheme"}
          disableCaretPositioning={true}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space} {close}",
            ],
            shift: [
              "~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M &lt; &gt; ? {shift}",
              ".com @ {space} {close}",
            ],
          }}
          display={{
            "{bksp}": "&#9003",
            "{close}": "⇩",
            //   "+": "&#10133",
          }}
        />
      );
  }
}

export default Keyboard;
