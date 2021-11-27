import { PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";

const CardList = ({ title, children, setTitle }) => {
  const onClickTitle = () => {
    const newTitle = prompt("What would you like to name this group?");

    setTitle(newTitle);
  };

  return (
    <div className="flex flex-col relative">
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
