import { LockClosedIcon, PencilIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

const CardList = ({ title, children, setTitle, closed }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onClickTitle = () => {
    const newTitle = prompt("What would you like to name this group?");

    setTitle(newTitle);
  };

  return (
    <div className="flex flex-col relative">
      {mounted && <ReactTooltip place="top" type="info" effect="float" />}

      <div
        data-tip={closed ? `The title of this group cannot be changed.` : null}
      >
        <button
          className={`text-base mb-2 font-medium flex items-center relative ${
            closed ? "text-gray-700 cursor-not-allowed" : "text-blue-700"
          }`}
          onClick={() => (closed ? () => {} : onClickTitle())}
          disabled={closed}
        >
          {closed ? (
            <LockClosedIcon width={16} className="mr-2" />
          ) : (
            <PencilIcon width={16} className="mr-2" />
          )}
          {title}
        </button>
      </div>
      <div className="relative">
        {children.map((child, i) => (
          <div key={i} className={`mb-2 `}>
            {child}
          </div>
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
