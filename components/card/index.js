import { useState } from "react";

const Card = ({ id, title }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (ev) => {
    ev.dataTransfer.setData("text/plain", id);
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      style={{ height: "fit-content" }}
      className={`${
        !isDragging && "bg-white"
      } px-4 py-5 shadow rounded-lg border-gray-200 sm:px-6 cursor-move font-medium  ${
        isDragging &&
        "border-inset border-4 shadow-none border-dashed border-gray-200 bg-transparent min-h-16"
      }
      `}
      draggable={true}
      onDragStart={onDragStart}
      onDrag={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      {!isDragging && title}
    </div>
  );
};

export { Card };
