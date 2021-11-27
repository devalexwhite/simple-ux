import { PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";

const CardList = ({ title, children, onCardDrop, setTitle }) => {
  const [isDragTarget, setIsDragTarget] = useState(false);

  const onDrop = (ev) => {
    ev.preventDefault();
    setIsDragTarget(false);
    const data = ev.dataTransfer.getData("text/plain");
    onCardDrop(data);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    setIsDragTarget(true);
    ev.dataTransfer.dropEffect = "move";
  };

  const onClickTitle = () => {
    const newTitle = prompt("What would you like to name this group?");

    setTitle(newTitle);
  };

  return (
    <div
      className="flex flex-col relative"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div
        className={`w-full h-0 z-20 top-0 left-0 absolute ${
          isDragTarget && "h-full bg-blue-200 rounded-lg visible"
        }`}
        onDragLeave={() => setIsDragTarget(false)}
      ></div>
      <button
        className="text-base text-blue-700 mb-2 font-medium flex items-center"
        onClick={onClickTitle}
      >
        <PencilIcon width={16} className="mr-2" />
        {title}
      </button>
      <div className="relative">
        {children.map((child) => (
          <div className={`mb-2 `}>{child}</div>
        ))}
        {children.length === 0 && (
          <div
            className={`rounded-lg border-inset border-4 shadow-none border-dashed border-gray-200 bg-transparent w-full h-16 flex justify-center items-center text-sm font-bold text-gray-400`}
          >
            Drop to join group
          </div>
        )}
      </div>
    </div>
  );
};

export { CardList };
