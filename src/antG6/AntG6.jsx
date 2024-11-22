import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { ExtensionCategory, Graph, register } from "@antv/g6";
import { ReactNode } from "@antv/g6-extension-react";
import rasm from "./TF 3x4 rasm.jpg";
import { range } from "lodash";
import { v4 } from "uuid";

const ContextMenu = ({ x, y, nodeData, onClose }) => {
  const [visible, setVisible] = useState(true);

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".g6-contextmenu")) {
        setTimeout(() => {
          setVisible(false);
          onClose();
        }, 0);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="g6-contextmenu "
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 1000,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="menu-container">
        {visible && (
          <div className="circular-menu">
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item analytics"
            >
              Analytics
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item prediction"
            >
              Prediction
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item relations"
            >
              Relations
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item same-type"
            >
              Same Type
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item around"
            >
              Around
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item profile"
            >
              Profile
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item media"
            >
              Media
            </div>
            <div
              onClick={(e) => console.log(e.target.textContent)}
              className="menu-item osint"
            >
              Osint
            </div>
            <div className="center-content">
              <img
                src={nodeData?.data?.img}
                alt="User"
                className="profile-image"
              />
            </div>
          </div>
          // <div
          //   style={{
          //     width: "120px",
          //     height: "120px",
          //     borderRadius: "100%",
          //     position: "relative",
          //     background: "black",
          //   }}
          // >
          //   <div
          //     style={{
          //       width: "50px",
          //       height: "50px",
          //       borderRadius: "100%",
          //       overflow: "hidden",
          //       position: "absolute",
          //       display: "flex",
          //       alignItems: "center",
          //       justifyContent: "center",
          //       top: "calc(50% - 25px)",
          //       left: "calc(50% - 25px)",
          //     }}
          //   >
          //     <img
          //       src={nodeData?.data?.img}
          //       alt={nodeData?.data?.id}
          //       style={{ width: "100%", height: "auto" }}
          //     />
          //   </div>
          // </div>
        )}
      </div>
    </div>,
    document.body
  );
};

const CustomNode = ({ data, size }) => {
  const [width, height] = size;
  const { data: nodeData } = data;

  return (
    <div
      onClick={() => console.log("click")}
      style={{
        userSelect: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "red",
        }}
      >
        {/* <img
          src={rasm} // Use the imported local image
          alt="User"
          style={{
            width: "100%",
            height: "auto",
          }}
        /> */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      <span
        style={{
          fontSize: "12px",
          fontFamily: "monospace",
          background: "white",
        }}
      >
        {nodeData?.name}
      </span>
    </div>
  );
};

const data = {
  nodes: [
    { id: "node1", style: { x: 150, y: 100 } },
    { id: "node2", style: { x: 250, y: 100 } },
    { id: "node3", style: { x: 450, y: 100 } },
  ],
  edges: [
    { source: "node1", target: "node2" },
    { source: "node1", target: "node3" },
    { source: "node2", target: "node3" },
  ],
};

const generateFakeData = (node_count = 5) => {
  const nodes = [];
  const edges = [];

  const radius = 400;

  const n1 = v4();
  nodes.push({ id: n1 });
  const angleStep = (2 * Math.PI) / node_count;
  range(0, node_count).map((_, index) => {
    const n2 = v4();
    const angle = index * angleStep;
    const x = ((index % 2) + 1) * 800 * Math.cos(angle);
    const y = ((index % 2) + 1) * 800 * Math.sin(angle);
    nodes.push({ id: n2, style: { x, y } });
    edges.push({ source: n1, target: n2 });

    range(0, node_count).map((_, index) => {
      const n3 = v4();
      const angle = index * angleStep;
      const x1 = 200 * Math.cos(angle);
      const y1 = 200 * Math.sin(angle);
      nodes.push({ id: n3, style: { x: x + x1, y: y + y1 } });
      edges.push({ source: n2, target: n3 });
    });
  });

  return { nodes, edges };
};

function AntG6() {
  const graphRef = useRef(null);

  const fakeData = generateFakeData(50);

  console.log(fakeData?.nodes?.length);

  useEffect(() => {
    register(ExtensionCategory.NODE, "react", ReactNode);

    // Custom layoutni yaratish
    // const customRadialLayout = (graph, node, radius) => {
    //   const children = node.get("model").children || [];
    //   const angleStep = (2 * Math.PI) / children.length; // Har bir child uchun burchak

    //   children.forEach((childNode, index) => {
    // const angle = index * angleStep;
    // const x = radius * Math.cos(angle);
    // const y = radius * Math.sin(angle);

    //     const child = graph.findById(childNode.id); // Child node'ni olish
    //     graph.updateItem(child, {
    //       x: node.get("x") + x, // Child'larni doira shaklida joylashtirish
    //       y: node.get("y") + y,
    //     });

    //     // Rekursiv ravishda child'larni ham doira shaklida joylashtirish
    //     customRadialLayout(graph, child, radius * 0.7); // Radiusni kichikroq qilish
    //   });
    // };

    // Initialize the G6 graph
    const graph = new Graph({
      container: graphRef.current,
      width: graphRef?.current?.clientWidth,
      height: graphRef?.current?.clientHeight,
      autoResize: true,
      autoFit: true,
      // zoom: 0.5,
      animation: false,
      // node: {
      //   type: "react",
      //   style: {
      //     size: [40, 40],
      //     component: (data) => <CustomNode data={data} size={[40, 40]} />,
      //   },
      // },

      modes: {
        default: ["drag-canvas", "zoom-canvas", "drag-node"],
      },
      layout: {
        type: "compactBox", // Daraxt uchun bazaviy layout
        direction: "LR", // Daraxtni chizish yo'nalishi (chapdan o'ngga)
      },
      defaultNode: {
        size: 30,
        color: "#5B8FF9",
        style: {
          fill: "#9EC9FF",
          lineWidth: 3,
          border: 4,
        },
      },
      defaultEdge: {
        style: {
          stroke: "#e2e2e2",
        },
      },
      data: fakeData,
      behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
      transforms: ["process-parallel-edges"],
      plugins: [
        // {
        //   type: "tooltip",
        //   trigger: "click",
        //   enable: (e) => e.targetType === "node",
        // },
        {
          type: "contextmenu",
          trigger: "contextmenu",
          enable: (e) => e.targetType === "node",
          getContent: (e) => {
            const container = document.createElement("div");
            document.body.appendChild(container);
            const root = createRoot(container);

            const closeContextMenu = () => {
              root.unmount();
              if (container.parentNode) {
                container.parentNode.removeChild(container);
              }
            };

            root.render(
              <ContextMenu
                x={e.client.x}
                y={e.client.y}
                nodeData={e?.target?.attributes?.component?.props?.data}
                onClose={closeContextMenu}
              />
            );

            return container;
          },
          //   getContent: (props) => {
          //     const { x, y } = props.target.attributes;
          //     props.client = { x: x - 64, y: y - 64 };

          //     const content = `<div class='context-menu-container'>
          //     <div id="menu-1" class='menu menu-1'>menu 1</div>
          //     </div>`;

          //     const menu1 = document.getElementById("menu-1");
          //     console.log(menu1);

          //     menu1?.addEventListener("click", () => {
          //       console.log("click menu-1");
          //     });

          //     return content;
          //   },
        },
      ],
    });

    graph.render();

    // const rootNode = graph.getNodeData(1311);
    // customRadialLayout(graph, rootNode, 200); // Boshlang'ich radius

    return () => {
      graph.destroy();
    };
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100dvh" }}>
      {/* <div style={{ width: "300px", height: "100%", background: "green" }} /> */}
      <div
        ref={graphRef}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
}

export default AntG6;
