import React, { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";

function AntG6() {
  const graphRef = useRef(null);

  useEffect(() => {
    // Initialize the G6 graph
    const graph = new Graph({
      container: graphRef.current,
      width: 800,
      height: 600,
      modes: {
        default: ["drag-canvas", "zoom-canvas", "drag-node"],
      },
      layout: {
        type: "force",
      },
      defaultNode: {
        size: 30,
        color: "#5B8FF9",
        style: {
          fill: "#9EC9FF",
          lineWidth: 3,
        },
      },
      defaultEdge: {
        style: {
          stroke: "#e2e2e2",
        },
      },
      data: {
        nodes: [
          { id: "node1", label: "Node 1" },
          { id: "node2", label: "Node 2" },
        ],
        edges: [{ source: "node1", target: "node2" }],
      },
      plugins: [
        {
          type: "tooltip",
          trigger: "click",
          enable: (e) => e.targetType === "node",
        },
        {
          type: "contextmenu",
          trigger: "contextmenu",
          enable: (e) => e.targetType === "node",
          //   getItems: (e) => {
          //     return [
          //       { name: "Label 1", value: "label1" },
          //       { name: "Label 1", value: "label1" },
          //     ];
          //   },
          getContent: (props) => {
            const { x, y } = props.target.attributes;

            // console.log({
            //   props,
            //   canvas: props.canvas,
            //   client: props.client,
            //   offset: props.offset,
            //   global: props.global,
            //   layer: props.layer,
            //   movement: props.movement,
            //   page: props.page,
            //   screen: props.screen,
            //   viewport: props.viewport,
            //   target: {
            //     attributes: props.target.attributes,
            //     parsedStyle: props.target.parsedStyle,
            //     transformable: props.target.transformable.localPosition,
            //   },
            // });

            props.client = { x: x - 64, y: y - 64 };
            const content = `<div  class='context-menu-container'></div>`;

            return content;
          },
        },
      ],
    });

    graph.render();

    // Add a context menu event listener to nodes
    // graph.on("node:contextmenu", (evt) => {
    //   evt.preventDefault(); // Prevent the default context menu from appearing

    //   const { item, canvasX, canvasY } = evt;
    //   const model = item.getModel();

    //   // Create a custom context menu (HTML Element)
    //   const contextMenu = document.createElement("div");
    //   contextMenu.style.position = "absolute";
    //   contextMenu.style.left = `${canvasX}px`;
    //   contextMenu.style.top = `${canvasY}px`;
    //   contextMenu.style.backgroundColor = "#fff";
    //   contextMenu.style.border = "1px solid #ccc";
    //   contextMenu.style.padding = "8px";
    //   contextMenu.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
    //   contextMenu.innerHTML = `
    //         <div id="menu-item-1">Delete ${model.label}</div>
    //         <div id="menu-item-2">Edit ${model.label}</div>
    //       `;

    //   document.body.appendChild(contextMenu);

    //   // Add event listeners to menu items
    //   contextMenu
    //     .querySelector("#menu-item-1")
    //     .addEventListener("click", () => {
    //       graph.removeItem(item); // Remove node
    //       document.body.removeChild(contextMenu); // Close context menu
    //     });

    //   contextMenu
    //     .querySelector("#menu-item-2")
    //     .addEventListener("click", () => {
    //       alert(`Editing ${model.label}`); // Example edit action
    //       document.body.removeChild(contextMenu); // Close context menu
    //     });

    //   // Handle closing the context menu
    //   const handleOutsideClick = () => {
    //     document.body.removeChild(contextMenu);
    //     document.removeEventListener("click", handleOutsideClick);
    //   };
    //   document.addEventListener("click", handleOutsideClick);
    // });

    return () => {
      graph.destroy();
    };
  }, []);

  return <div ref={graphRef} style={{ border: "1px solid #ddd" }}></div>;
}

export default AntG6;
