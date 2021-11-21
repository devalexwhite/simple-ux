import { useState } from "react";
import { Card } from "../../components/card";
import { CardList } from "../../components/cardList";
import { DropZone } from "../../components/dropZone";
import { Modal } from "../../components/modal";
import styles from "../../styles/CardSort.module.css";

const CardSort = () => {
  const cards = [
    {
      id: "1",
      title: "Jeans",
    },
    {
      id: "2",
      title: "Dresses",
    },
    {
      id: "3",
      title: "Socks",
    },
    {
      id: "4",
      title: "Shoes",
    },
    {
      id: "5",
      title: "Jackets",
    },
    {
      id: "6",
      title: "Swimwear",
    },
  ];

  const [listCount, setListCount] = useState(1);

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const [lists, setLists] = useState([
    {
      id: "0",
      title: "Men's Clothing",
      locked: true,
      cards: [],
    },
  ]);

  const onSubmit = () => {
    const inGroups = cardsInList();
    const hasRCards = inGroups.length < cards.length;

    if (hasRCards > 0) setSubmitDialogOpen(true);
    else processSubmit();
  };

  const processSubmit = () => {
    setSubmitDialogOpen(false);

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

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <Modal
        onCancel={() => setSubmitDialogOpen(false)}
        onConfirm={processSubmit}
        open={submitDialogOpen}
      >
        <div className="prose">
          <p>
            {`There are ${
              cards.length - cardsInList().length
            } cards not in groups.
          Sometimes cards simply don't fit into groups!`}
          </p>
          <p>{`Would you like to submit your response?`}</p>
        </div>
      </Modal>
      <div className="w-full py-4 px-4">
        <div className="px-2 pb-4">
          <span className="block font-medium">
            Click and drag the cards below (
            {cards.length - cardsInList().length} remaining)
          </span>
        </div>

        <div className="flex flex-row overflow-y-auto overflow-y-hidden w-full">
          {cards
            .filter((i) => !cardsInList().includes(i.id))
            .map((i) => (
              <Card title={i.title} id={i.id} key={i.id} />
            ))}
        </div>
      </div>
      <DropZone
        id="card-dropzone"
        className="z-0 flex-1 w-full  border-2 font-bold bg-base-300 text-center"
        ondrop={onZoneCardDrop}
      >
        <div className="text-xl py-8">Drop here to form a new group</div>
        <div className="flex flex-row overflow-y-auto">
          {lists.map((i) => (
            <div key={i.id}>
              <CardList
                id={i.id}
                title={i.title}
                onDrop={(ev) => onListCardDrop(i.id, ev)}
                onDelete={onListDelete}
                onChangeTitle={onChangeListTitle}
                locked={i.locked}
              >
                {cards
                  .filter((c) => i.cards.includes(c.id))
                  .map((c) => (
                    <Card title={c.title} id={c.id} key={c.key} />
                  ))}
              </CardList>
            </div>
          ))}
        </div>
      </DropZone>
      <div className="flex justify-center w-full px-8 py-4 border-t">
        <button className="btn btn-primary btn-lg" onClick={onSubmit}>
          {"I'm finished!"}
        </button>
      </div>
    </div>
  );
};

export default CardSort;
