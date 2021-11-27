import { useState } from "react";
import { Card } from "../card";
import { CardList } from "../cardList";
import styles from "./cardSortCell.module.css";

const CardSortCell = ({
  cards = [],
  isList = cards.length > 1,
  title = undefined,
  closed = false,
  onCardDrop = () => {},
  setTitle = () => {},
}) => {
  const [isDragTarget, setIsDragTarget] = useState(false);

  const onDrop = (ev) => {
    ev.preventDefault();

    setIsDragTarget(false);

    const data = ev.dataTransfer.getData("text/plain");
    onCardDrop(data);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    setIsDragTarget(true);
    ev.dataTransfer.dropEffect = "move";
  };

  const cardObjects = cards.map((card, index) => (
    <Card key={card.id} id={card.id} title={card.title} />
  ));

  return (
    <div
      onDrop={onDrop}
      onDragEnter={() => setIsDragTarget(true)}
      onDragLeave={() => setIsDragTarget(false)}
      onDragOver={onDragOver}
      className={` relative ${isDragTarget && styles.dragTarget}`}
    >
      {isList && (
        <CardList title={title} setTitle={setTitle} closed={closed}>
          {cardObjects}
        </CardList>
      )}
      {!isList && <>{cardObjects}</>}
    </div>
  );
};

export { CardSortCell };
