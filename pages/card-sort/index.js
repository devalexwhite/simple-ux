import { CheckCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "../../components/card";
import { CardList } from "../../components/cardList";
import { DropZone } from "../../components/dropZone";
import { SubmitCardSortModal } from "../../components/modals/submitCardSortModal";
import { StudyLayout } from "../../templates/studyLayout";

const CardSort = () => {
  const cards = [
    {
      id: "1",
      title: "View results",
    },
    {
      id: "2",
      title: "Message participants",
    },
    {
      id: "3",
      title: "Create a new study",
    },
    {
      id: "4",
      title: "View feedback surveys",
    },
    {
      id: "5",
      title: "Log out of user account",
    },
    {
      id: "6",
      title: "Edit profile name",
    },
    {
      id: "7",
      title: "Change email address",
    },
    {
      id: "8",
      title: "Data analytics dashboard",
    },
    {
      id: "9",
      title: "Contact support",
    },
    {
      id: "10",
      title: "Review notifications",
    },
  ];

  const [objectCount, setObjectCount] = useState(cards.length);
  const router = useRouter();

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const [boardObjects, setBoardObjects] = useState([...cards]);

  const onSubmit = () => {
    const inGroups = cardsInList();
    const hasRCards = inGroups.length < cards.length;

    if (hasRCards > 0) setSubmitDialogOpen(true);
    else processSubmit();
  };

  const processSubmit = async () => {
    const inGroups = cardsInList();
    const hasRCards = inGroups.length < cards.length;

    const findCard = (id) => cards.find((i) => i.id === id);

    const submitObject = lists.map((list) => {
      return {
        title: list.title,
        isUserGroup: !list.locked,
        cards: list.cards.map((id) => findCard(id)),
      };
    });

    if (hasRCards) {
      submitObject.push({
        title: "No Group",
        isUserGroup: false,
        cards: cards.filter((i) => !inGroups.includes(i.id)),
      });
    }

    try {
      await fetch("/api/card-sort/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cards: submitObject,
        }),
      });
      router.push("/card-sort/congrats");
    } catch (e) {
      alert(`An error occurred: ${e.message}`);
    }
  };

  const cardsInList = () => lists.reduce((p, c) => [...p, ...c.cards], []);

  const onChangeListTitle = (id, title) => {
    setLists(
      lists.map((list) => {
        if (id === list.id) {
          return {
            ...list,
            title,
          };
        } else return list;
      })
    );
  };

  const onListDelete = (key) => {
    if (confirm("Delete this group?"))
      setLists(lists.filter((i) => i.id !== key));
  };

  const onZoneCardDrop = (ev) => {
    ev.preventDefault();

    if (ev.dataTransfer.dropped) return;
    ev.dataTransfer.dropped = true;

    const cardId = ev.dataTransfer.getData("text/plain");

    setLists([
      ...lists.map((i) => ({
        ...i,
        cards: [...i.cards.filter((c) => c != cardId)],
      })),
      {
        id: `${listCount}`,
        title: "",
        cards: [cardId],
        locked: false,
      },
    ]);

    setListCount(listCount + 1);
  };

  const onListCardDrop = (listId, ev) => {
    ev.preventDefault();

    if (ev.dataTransfer.dropped) return;

    ev.dataTransfer.dropped = true;

    const cardId = ev.dataTransfer.getData("text/plain");

    const list = lists.find((i) => i.id === listId);

    setLists(
      lists.map((list) => {
        if (list.id == listId)
          return {
            ...list,
            cards: [...list.cards, cardId],
          };
        else
          return {
            ...list,
            cards: list.cards.filter((i) => i != cardId),
          };
      })
    );

    if (list) list.cards.push(cardId);
  };

  const onCardDrop = (target, destination) => {
    const newBoardObjects = [...boardObjects];
    const targetIndex = newBoardObjects.findIndex((i) => i.id === target);
    const destinationIndex = newBoardObjects.findIndex(
      (i) => i.id === destination
    );

    const targetCard = boardObjects[targetIndex];
    const destinationCard = boardObjects[destinationIndex];

    const listId = objectCount + 1;

    newBoardObjects.splice(destinationIndex, 1, {
      id: objectCount + 1,
      title: "Name this group",
    });

    destinationCard.listId = listId;
    targetCard.listId = listId;

    setObjectCount(objectCount + 1);

    setBoardObjects(newBoardObjects);
  };

  const onListDrop = (target, destination) => {
    const newBoardObjects = [...boardObjects];

    const targetIndex = newBoardObjects.findIndex((i) => i.id === target);

    const targetCard = newBoardObjects[targetIndex];
    const destinationList = newBoardObjects.find((i) => i.id === destination);

    destinationList.children.push(targetCard);

    newBoardObjects.splice(targetIndex, 1, {});

    setBoardObjects(newBoardObjects);
  };

  return (
    <StudyLayout>
      <div className="grid grid-cols-5 gap-6 h-full">
        {boardObjects.map((obj) => (
          <>
            {obj.children && (
              <CardList
                title={obj.title}
                key={obj.id}
                onListDrop={onListDrop}
                id={obj.id}
              >
                {obj.children.map((card) => (
                  <Card
                    key={card.id}
                    title={card.title}
                    id={card.id}
                    isInList={true}
                  ></Card>
                ))}
              </CardList>
            )}
            {!obj.children && obj.id && (
              <Card
                key={obj.id}
                {...obj}
                onCardDrop={onCardDrop}
                isInList={false}
              />
            )}
            {!obj.children && !obj.id && <div></div>}
          </>
        ))}
      </div>
      <div className="flex items-center justify-center py-4 fixed bottom-0 w-full left-0 bg-white border-t border-gray-300">
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

export default CardSort;
