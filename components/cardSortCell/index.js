import { useState } from "react";
import { Card } from "../card";
import { CardList } from "../cardList";

const CardSortCell = ({
  cards = [],
  isList = cards.length > 1,
  title = undefined,
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
    ev.dataTransfer.dropEffect = "move";
  };

  const cardObjects = cards.map((card, index) => (
    <Card
      key={card.id}
      id={card.id}
      card={card}
      title={card.title}
      onCardDrop={onCardDrop}
    />
  ));

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={() => setIsDragTarget(true)}
      onDragLeave={() => setIsDragTarget(false)}
      className={`
        ${
          isDragTarget &&
          !isList &&
          cardObjects.length === 0 &&
          "rounded-lg shadow-none bg-blue-200 bg-transparent w-full h-16"
        }
      
      `}
    >
      {isList && (
        <CardList title={title} onCardDrop={onCardDrop} setTitle={setTitle}>
          {cardObjects}
        </CardList>
      )}
      {!isList && <>{cardObjects}</>}
    </div>
  );
};

export { CardSortCell };
