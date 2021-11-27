import { CheckCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { CardSortCell } from "../../components/cardSortCell";
import { StudyLayout } from "../../templates/studyLayout";

const sampleCards = [
  {
    id: 1,
    title: "Action",
  },
  {
    id: 2,
    title: "Agressive",
  },
  {
    id: 3,
    title: "Angry",
  },
  {
    id: 4,
    title: "Inspirational",
  },
  {
    id: 5,
    title: "Powerful",
  },
  {
    id: 6,
    title: "Upbeat",
  },
  {
    id: 7,
    title: "Exciting",
  },
  {
    id: 8,
    title: "Soft",
  },
  {
    id: 9,
    title: "Romantic",
  },
  {
    id: 10,
    title: "Playful",
  },
  {
    id: 11,
    title: "Beautiful",
  },
  {
    id: 12,
    title: "Carefree",
  },
  {
    id: 13,
    title: "Hypnotic",
  },
  {
    id: 14,
    title: "Scary",
  },
  {
    id: 15,
    title: "Suspense",
  },
  {
    id: 16,
    title: "Funny",
  },
];

const sampleLists = [
  {
    id: 1,
    title: "Happy",
    closed: true,
  },
];

const CardSortPage = ({ cards = sampleCards }) => {
  const [cellHash, setCellHash] = useState([
    ...sampleLists.map((list, index) => ({
      id: index,
      title: list.title,
      closed: list.closed,
      isList: true,
    })),
    ...cards.map((card, index) => ({
      id: index + sampleLists.length + 1,
    })),
    {
      id: sampleLists.length + cards.length + 1,
    },
  ]);

  const [cardStates, setCardStates] = useState(
    cards.map((card, index) => ({
      ...card,
      cellId: index + sampleLists.length + 1,
    }))
  );

  const assignCard = (cardId, cellId) => {
    const newCardStates = [...cardStates];
    const cardIndex = newCardStates.findIndex(
      (card) => `${card.id}` === `${cardId}`
    );

    const oldCellId = newCardStates[cardIndex].cellId;
    if (cardStates.filter((card) => card.cellId === oldCellId).length > 1) {
      updateCellTitle(oldCellId, "Set group title");
    }

    newCardStates[cardIndex].cellId = cellId;
    setCardStates(newCardStates);

    const newCellHash = [...cellHash];
    const cellIndex = newCellHash.findIndex(
      (cell) => `${cell.id}` === `${cellId}`
    );
    newCellHash[cellIndex].title =
      newCellHash[cellIndex].title || "Set group title";
  };

  const updateCellTitle = (cellId, title) => {
    const newCellHash = [...cellHash];
    const cellIndex = newCellHash.findIndex(
      (cell) => `${cell.id}` === `${cellId}`
    );
    newCellHash[cellIndex].title = title;
    setCellHash(newCellHash);
  };

  return (
    <StudyLayout>
      <div
        className={` w-full h-full max-h-full flex-1  overflow-hidden max-w-7xl mx-auto sm:px-6 lg:px-8`}
      >
        <div className="h-full  grid grid-cols-5 w-full gap-8">
          {cellHash.map((cell, index) => (
            <CardSortCell
              key={cell.id}
              isList={cell?.isList}
              title={cell?.title}
              setTitle={(title) => {
                updateCellTitle(cell.id, title);
              }}
              cards={cardStates.filter((card) => card.cellId === cell.id) ?? []}
              onCardDrop={(card) => assignCard(card, cell.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center py-4 w-full left-0 bg-white border-t border-gray-300">
        <button
          type="button"
          className="inline-flex items-center px-12 py-5 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CheckCircleIcon width={26} className="mr-2" />
          I'm Done!
        </button>
      </div>
    </StudyLayout>
  );
};

export default CardSortPage;
