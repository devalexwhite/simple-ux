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
      className={`
        flex flex-col
      `}
      ondrop={onDrop}
      id={id}
    >
      <button className=" pb-1 text-left text-xl font-black">
        {title ? title : "Group title"}
      </button>
      {/* <input
        className={`input-secondary input ${
          locked ? "input-ghost" : "input-bordered"
        } w-full text-center w-full`}
        type="text"
        placeholder="Click to set a title"
        onChange={(e) => onChangeTitle(id, e.target.value)}
        value={title}
        autoFocus
        disabled={locked}
      /> */}
      <div
        className={`w-full overflow-x-auto overflow-y-hidden flex flex-row flex-wrap p-6 border-2 border-dashed rounded-lg border-black max-w-3xl block font-normal ${styles.container}`}
      >
        {children.length ? (
          children
        ) : (
          <span className="w-full h-full flex justify-center items-center font-bold text-sm py-8">
            Drop here to join this group
          </span>
        )}
      </div>
      {/* {!locked && (
        <button
          className="btn btn-sm btn-warning w-full"
          onClick={() => onDelete(id)}
        >
          Delete group
        </button>
      )} */}
    </DropZone>
  );
};

export { CardList };
