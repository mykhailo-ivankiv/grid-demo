import {attachEventListener} from "./customEvents.js";
export const makeDraggable = (node) => {
  attachEventListener(node, "dragstart", (event) => event.preventDefault());
  attachEventListener(node, "custom:dragstart", (event) => {
    event.stopPropagation();
    const dragGhost = document.createElement("div");
    dragGhost.classList.add("draggableGhost");
    document.body.appendChild(dragGhost);
    const dragUnsubscribe = attachEventListener(document, "custom:dragover", ({clientX, clientY}) => {
      dragGhost.style.left = `${clientX}px`;
      dragGhost.style.top = `${clientY}px`;
    });
    const dropUnsubscribe = attachEventListener(document, "custom:drop", () => {
      dropUnsubscribe();
      dragUnsubscribe();
      document.body.removeChild(dragGhost);
    });
  });
};
