import { DropZone } from "../dropZone";
import styles from "./cardList.module.css";

const CardList = ({
  id,
  title,
  children,
  onCardDrop,
  onDelete,
  onChangeTitle,
  locked = false,
}) => {
  const ondrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    onCardDrop(data);
  };

  return (
    <DropZone className={styles.cardList} ondrop={ondrop} id={id}>
      <div>
        <div className={styles.header}>
          <input
            className={styles.titleInput}
            type="text"
            placeholder="Click to set a title"
            onChange={(e) => onChangeTitle(id, e.target.value)}
            value={title}
            autoFocus
            disabled={locked}
          />
          {!locked && <button onClick={() => onDelete(id)}>Delete</button>}
        </div>
        {children}
      </div>
    </DropZone>
  );
};

export { CardList };
