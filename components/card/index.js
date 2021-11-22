import styles from "./card.module.css";

const Card = ({ id, title }) => {
  const ondragstart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      id={id}
      className={`font-normal cursor-move bg-base-200 border rounded inline-block py-4 px-2 flex justify-center items-center text-center text-sm shadow m-2 ${styles.card}`}
      draggable={true}
      onDragStart={ondragstart}
    >
      {title}
    </div>
  );
};

export { Card };
