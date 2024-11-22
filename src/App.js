// import { useSelector } from "react-redux";
// import KeyboardTest from "./keyboard-test";
// // import HiddenKeyboard from "./hidden-keyboard/HiddenKeyboard";

// import Keyboard from "./keyboard-test/Keyboard";
// import { Drawer } from "@mui/material";
import "./App.css";
// import { useState } from "react";
// import AntG6 from "./antG6/AntG6";
// import Tracking from "./tracking/Tracking";

function App() {
  // const { openKeyboard, inputMode } = useSelector((store) => store.keyboard);
  // const [inputData, setInputData] = useState({
  //   input: null,
  //   inputMode: "text",
  //   openKeyboard: false,
  //   value: "",
  // });

  // // console.log(window);

  // window.addEventListener("choose-input", (e) => {
  //   setInputData(e?.detail);
  // });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "70px",
          fontWeight: "bold",
          fontFamily: "arial",
          textTransform: "uppercase",
        }}
      >
        Hello
      </p>
      {/* <Tracking /> */}
      {/* <AntG6 /> */}
      {/* <Drawer
        open={openKeyboard}
        style={{ position: "static" }}
        anchor="bottom"
        hideBackdrop
      >
        <Keyboard inputMode={inputMode} />
      </Drawer> */}
      {/* <KeyboardTest /> */}
      {/* <div
        style={{
          overflow: "hidden",
          position: "fixed",
          bottom: 0,
          width: "100%",
          transition: "0.3s",
          transform: inputData?.openKeyboard
            ? "translateY(0)"
            : "translateY(100%)",
        }}
      >
        <Keyboard
          inputMode={inputData?.inputMode}
          input={inputData?.input}
          inputValue={inputData?.value}
        />
      </div> */}
    </div>
  );
}

export default App;
