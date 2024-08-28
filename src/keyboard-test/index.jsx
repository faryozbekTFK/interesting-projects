// import Keyboard from "./Keyboard";
import { useState } from "react";
import Input from "./Input";

function KeyboardTest() {
  const [data, setData] = useState({
    phone: "",
    name: "",
    number: "123456",
  });

  const handleChangeData = (name, value) => setData({ ...data, [name]: value });

  // const handleLog = () => console.log(data);

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Input
          // id="inp1"
          value={data?.phone}
          placeholder="Input 1"
          inputMode="tel"
          mask="+\9\98 99 999 99 99"
          // onFocus={(e) => console.log(e, window)}
          onChange={(value) => handleChangeData("phone", value)}
        />
        <Input
          // id="inp2"
          value={data?.name}
          placeholder="Input 2"
          onChange={(value) => handleChangeData("name", value)}
        />
        <Input
          // id="inp3"
          type="text"
          inputMode="numeric"
          value={data?.number}
          placeholder="Input 3"
          // mask="+\9\98 99 999 99 99"
          // onFocus={(e) => console.log(e, window)}
          onChange={(value) => handleChangeData("number", value)}
        />
      </div>

      <div
        style={{
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p>
          <span>Phone: </span>
          <span>{data?.phone} </span>
        </p>
        <p>
          <span>Name: </span>
          <span>{data?.name} </span>
        </p>
        <p>
          <span>Number: </span>
          <span>{data?.number} </span>
        </p>
      </div>

      {/* <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          padding: "1rem",
        }}
      >
        <Keyboard enterKeyPress={handleLog} />
      </div> */}
    </div>
  );
}

export default KeyboardTest;
