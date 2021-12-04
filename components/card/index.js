import { TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Card = ({ id, title, draggable = true, canDelete = false, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (ev) => {
    ev.dataTransfer.setData("text/plain", id);
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      style={{ height: "fit-content" }}
      className={`
      ${
        !isDragging && "bg-white"
      } px-4 py-5 shadow rounded-lg border-gray-200 sm:px-6 cursor-move font-medium  
      
      ${
        isDragging &&
        "border-inset border-4 shadow-none border-dashed border-gray-200 bg-transparent min-h-16"
      }

      ${canDelete && "hover:bg-gray-100 hover:border-gray-200 group"}

      relative overflow-hidden
      `}
      draggable={draggable}
      onDragStart={draggable ? onDragStart : null}
      onDrag={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <button
        onClick={onDelete}
        className={`
        ${!canDelete && "pointer-events-none"}
        invisible group-hover:visible absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 opacity-70 text-white`}
      >
        <TrashIcon width="24" height="24" />
      </button>
      {!isDragging && title}
    </div>
  );
};

export { Card };
