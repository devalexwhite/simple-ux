import { DropZone } from "../dropZone";
import styles from "./cardList.module.css";

const CardList = ({
  id,
  title,
  children,
  onDrop,
  onDelete,
  onChangeTitle,
  locked = false,
}) => {
  return (
    <DropZone
      className={`z-10 border-2 flex flex-col bg-base-100 px-4 py-4 m-4 items-center ${styles.container}`}
      ondrop={onDrop}
      id={id}
    >
      <input
        className={`input-secondary input ${
          locked ? "input-ghost" : "input-bordered"
        } w-full text-center text-lg`}
        type="text"
        placeholder="Click to set a title"
        onChange={(e) => onChangeTitle(id, e.target.value)}
        value={title}
        autoFocus
        disabled={locked}
      />
      <div className={`flex-1 flex flex-col w-full  text-center py-8`}>
        {children.length ? (
          children
        ) : (
          <span className="w-full h-full flex justify-center items-center font-bold text-sm py-32">
            Drop a card into this group.
          </span>
        )}
      </div>
      {!locked && (
        <button
          className="btn btn-sm btn-warning w-full"
          onClick={() => onDelete(id)}
        >
          Delete group
        </button>
      )}
    </DropZone>
  );
};

export { CardList };
