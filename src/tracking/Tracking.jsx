import { Fragment, useEffect, useRef, useState } from "react";
import _ from "lodash";

function Tracking({ stepCount = 6 }) {
  const startStep = useRef();
  const endStep = useRef();
  const [distance, setDistance] = useState({ start: 1, end: 3 });
  const [position, stePosition] = useState({ start: {}, end: {} });

  //   console.log(position);

  useEffect(() => {
    stePosition({
      start: {
        x: startStep?.current?.offsetLeft,
        y: startStep?.current?.offsetTop,
      },
      end: {
        x: endStep?.current?.offsetLeft,
        y: endStep?.current?.offsetTop,
      },
    });
  }, []);

  return (
    <div className="body">
      <div className="divs-container">
        <div className="div" style={{ width: "150px" }}></div>
        <div className="div2" style={{ width: "150px" }}></div>
      </div>
      <div className="step-container">
        {_.range(0, stepCount).map((i) => (
          <Fragment key={i}>
            <div>
              <div
                className="step"
                ref={
                  distance?.start === i
                    ? startStep
                    : distance?.end === i
                    ? endStep
                    : null
                }
              />
              {distance?.start === i && <div className="startLine" />}
              {distance?.end === i && <div className="endLine" />}
            </div>

            {i + 1 < stepCount && <div className="line" />}
          </Fragment>
        ))}

        {/* {startStep?.current && (
          <div className="startLine" style={{ left: position?.start?.x }} />
        )}

        {endStep?.current && (
          <div className="endLine" style={{ left: position?.end?.x }} />
        )} */}
      </div>
    </div>
  );
}

export default Tracking;
