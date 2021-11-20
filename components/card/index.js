import styles from "./card.module.css";

const Card = ({ id, title }) => {
  const ondragstart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      id={id}
      className={styles.card}
      draggable={true}
      onDragStart={ondragstart}
    >
      {title}
    </div>
  );
};

export { Card };
