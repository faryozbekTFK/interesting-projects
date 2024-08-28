import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  focusInput,
  chooseInput,
  changeInputValue,
  openOrCloseKeyboard,
} from "../store/slices/keyboardSlice";
import InputMask from "react-input-mask";
import Keyboard from "./Keyboard";

function Input({
  type = "text",
  value,
  onChange,
  inputMode = "none",
  mask = "",
  ...props
}) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [openKeyboard, setOpenKeyboard] = useState(false);
  // const keyboard = useSelector((store) => store.keyboard);

  // console.log(window);

  const handleChange = (e) => {
    onChange(e.target.value);
    dispatch(changeInputValue(e.target.value));
  };

  const handleChooseInput = (e) => {
    // console.log(e?.target === inputRef?.current?.getInputDOMNode());
    setOpenKeyboard(
      e?.target === inputRef?.current?.getInputDOMNode() ? true : false
    );
  };

  // const handleOpenOrCloseKeyboard = (status) =>
  //   dispatch(openOrCloseKeyboard(status));

  // const handleFocusInput = (status) => {
  //   // inputRef.current.focused = status;
  //   // dispatch(focusInput(status));
  //   dispatch(changeInputValue(value));
  //   handleOpenOrCloseKeyboard(status);
  // };

  // const handleChooseInput = (e) => {
  //   // handleFocus(e);
  //   // console.log(value?.toString());
  //   // window?.SimpleKeyboardInstances?.reactSimpleKeyboard?.setInput(
  //   //   value?.toString()
  //   // );
  //   // dispatch(chooseInput({ input: e.currentTarget, mask, inputMode }));
  //   // e.currentTarget && handleFocusInput(true);

  //   const chooseInputEvent = new CustomEvent("choose-input", {
  //     bubbles: true,
  //     detail: {
  //       input: e.currentTarget,
  //       openKeyboard: true,
  //       value: e.target.value,
  //       inputMode,
  //     },
  //   });

  //   dispatchEvent(chooseInputEvent);
  // };

  // window.addEventListener("change-keyboard-input", (e) => {
  //   inputRef?.current?.getInputDOMNode() === e?.detail?.input &&
  //     onChange(e?.detail?.value);
  // });

  // useEffect(() => {
  //   inputRef?.current?.getInputDOMNode() === keyboard?.input &&
  //     onChange(keyboard?.value);
  // }, [keyboard?.value]);

  // useEffect(() => {
  //   keyboard?.openKeyboard &&
  // window?.SimpleKeyboardInstances?.reactSimpleKeyboard?.setInput(
  //   value?.toString()
  // );
  // }, [keyboard?.openKeyboard]);

  // useEffect(() => {
  //   // console.log(inputRef?.current?.getInputDOMNode() === keyboard?.input);
  //   // console.log(keyboard?.input );
  //   // console.log((inputRef.current.focused, keyboard?.focusedInput));
  // }, [keyboard?.focusedInput]);

  // window.addEventListener("click", (e) => {
  //   // console.log(e);
  //   // !(
  //   //   e?.srcElement?.nodeName === "INPUT" ||
  //   //   e?.srcElement?.offsetParent?.children?.[0]?.dataset?.skinstance ===
  //   //     "reactSimpleKeyboard" ||
  //   //   e?.srcElement?.offsetParent?.children?.[0]?.children?.[0]?.dataset
  //   //     ?.skinstance === "reactSimpleKeyboard"
  //   // ) && handleOpenOrCloseKeyboard(false);
  // });

  return (
    <>
      <InputMask
        {...props}
        // mask={!keyboard?.openKeyboard ? mask : ""}
        // type="text"
        // type={type}
        value={value}
        ref={inputRef}
        inputMode="none"
        // inputMode="none"
        theme={"simple-keyboard hg-theme-default keyboard-theme"}
        // onFocus={() => console.log(inputRef?.current?.focused)}
        // onBlur={() => console.log(inputRef?.current?.focused)}
        onChange={handleChange}
        onClick={handleChooseInput}
        // onPointerDown={handleChooseInput}
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      />
      <div
        style={{
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          transition: "0.3s",
          transform: openKeyboard ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Keyboard
          inputMode={inputMode}
          // input={inputData?.input}
          inputValue={value}
        />
      </div>
    </>
  );
}

export default Input;
