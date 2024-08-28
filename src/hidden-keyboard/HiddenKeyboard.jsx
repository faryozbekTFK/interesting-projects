import { useRef, useState } from "react";

function HiddenKeyboard() {
  // const inpRef = useRef(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <div>
      <label htmlFor="inpt">Label</label>
      <input
        id="inpt"
        type="text"
        value="Faryozbek"
        onFocus={(e) =>
          e.target.setSelectionRange(
            e.target.value.length,
            e.target.value.length
          )
        }
      />
      {/* <button onClick={toggleOverlay}>Toggle Overlay</button>
      {isOverlayVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Custom Input"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )} */}
    </div>
  );
}

export default HiddenKeyboard;
