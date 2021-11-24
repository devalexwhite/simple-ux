import { useState } from "react";
import styles from "./card.module.css";

const Card = ({ id, title, onCardDrop, isInList }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragTarget, setIsDragTarget] = useState(false);

  const onDragStart = (ev) => {
    ev.dataTransfer.setData("text/plain", id);
    ev.dataTransfer.dropEffect = "move";
  };

  const onDragEnter = (ev) => {
    ev.preventDefault();
    setIsDragTarget(true);
    ev.dataTransfer.dropEffect = "move";
  };

  const onDrop = (ev) => {
    ev.preventDefault();
    setIsDragTarget(false);
    setIsDragging(false);
    const data = ev.dataTransfer.getData("text/plain");
    onCardDrop(data, id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      id={id}
      style={{ height: "fit-content" }}
      className={`bg-white px-4 py-5 shadow rounded-lg border-gray-200 sm:px-6 cursor-move font-medium ${
        isDragging &&
        "border-inset border-4 shadow-none border-dashed border-gray-200 bg-transparent"
      }
      ${isDragTarget && !isDragging && "bg-blue-200 text-blue-200 shadow-none"}
      `}
      draggable={true}
      onDragStart={onDragStart}
      onDrag={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onDragEnter={(ev) => (isInList ? () => {} : onDragEnter(ev))}
      onDragLeave={() => (isInList ? () => {} : setIsDragTarget(false))}
      onDragOver={(ev) => (isInList ? () => {} : onDragOver(ev))}
      onDrop={(ev) => (isInList ? () => {} : onDrop(ev))}
    >
      {!isDragging && title}
    </div>
  );
};

export { Card };
