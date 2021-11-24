import { PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";

const CardList = ({
  id,
  title,
  children,
  onListDrop,
  onDelete,
  onChangeTitle,
  locked = false,
}) => {
  const [isDragTarget, setIsDragTarget] = useState(false);

  const onDrop = (ev) => {
    ev.preventDefault();
    setIsDragTarget(false);
    const data = ev.dataTransfer.getData("text/plain");
    onListDrop(data, id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    setIsDragTarget(true);
    ev.dataTransfer.dropEffect = "move";
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
      <div className="text-base text-blue-700 mb-2 font-medium flex items-center">
        <PencilIcon width={16} className="mr-2" />
        {title}
      </div>
      <div className="relative">
        {children.map((child) => (
          <div className={`mb-2 `}>{child}</div>
        ))}
      </div>
    </div>
  );
};

export { CardList };
