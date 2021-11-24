import { PencilIcon } from "@heroicons/react/outline";
import { DropZone } from "../dropZone";
import styles from "./cardList.module.css";

const CardList = ({
  id,
  title,
  children,
  onListDrop,
  onDelete,
  onChangeTitle,
  locked = false,
}) => {
  const onDrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    onListDrop(data, id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="flex flex-col" onDrop={onDrop} onDragOver={onDragOver}>
      <div className="text-base text-blue-700 mb-2 font-medium flex items-center">
        <PencilIcon width={16} className="mr-2" />
        {title}
      </div>
      {children.map((child) => (
        <div className="mb-2">{child}</div>
      ))}
    </div>
  );
};

export { CardList };
