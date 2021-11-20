import styles from "./card.module.css";

const Card = ({ id, title }) => {
  const ondragstart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      id={id}
      className="bg-base-200 border rounded inline-block py-6 px-16 text-sm shadow m-2"
      draggable={true}
      onDragStart={ondragstart}
    >
      {title}
    </div>
  );
};

export { Card };
