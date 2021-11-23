import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "../../components/card";
import { CardList } from "../../components/cardList";
import { DropZone } from "../../components/dropZone";
import { Modal } from "../../components/modal";
import styles from "../../styles/CardSort.module.css";

const CardSort = () => {
  const [cards, setCards] = useState([
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
  ]);

  const [listCount, setListCount] = useState(1);
  const router = useRouter();

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const [lists, setLists] = useState([
    // {
    //   id: "0",
    //   title: "Men's Clothing",
    //   locked: true,
    //   cards: [],
    // },
  ]);

  const moveStackRight = () => {
    const cloneCards = [...cards];
    cloneCards.push(cloneCards.shift());
    setCards(cloneCards);
  };

  const moveStackLeft = () => {
    const cloneCards = [...cards];
    cloneCards.unshift(cloneCards.pop());
    setCards(cloneCards);
  };

  const onSubmit = () => {
    const inGroups = cardsInList();
    const hasRCards = inGroups.length < cards.length;

    if (hasRCards > 0) setSubmitDialogOpen(true);
    else processSubmit();
  };

  const processSubmit = async () => {
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

    try {
      const result = await fetch("/api/card-sort/submit", {
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

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="navbar flex justify-end w-full flex-row">
        <button className="btn btn-ghost mx-2">What do I do?</button>
        <button className="btn btn-primary mx-2">I'm Finished</button>
      </div>
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
      <DropZone
        id="card-dropzone"
        className="min-w-full max-h-full flex-1 overflow-auto bg-base-300 py-4 px-8"
        ondrop={onZoneCardDrop}
      >
        {cardsInList().length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <img src="/design-thinking.svg" width="120" />

            <div className="text-xm font-light pt-2">
              Drag a card from below to form a group
            </div>
          </div>
        )}
        <div className="flex flex-row">
          {lists.map((i) => (
            <div key={i.id} className="mx-4">
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
                    <div className="m-2">
                      <Card title={c.title} id={c.id} key={c.key} />
                    </div>
                  ))}
              </CardList>
            </div>
          ))}
        </div>
      </DropZone>
      <div className="flex flex-col justify-center w-full py-10 items-center bg-200">
        <div className="mb-4 font-bold text-secondary">
          {cards.length - cardsInList().length} cards in stack
        </div>
        <div className="flex justify-center items-center">
          <button
            className="btn btn-ghost btn-xl pb-16 text-primary"
            onClick={moveStackLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="stack mx-6">
            {cards
              .filter((i) => !cardsInList().includes(i.id))
              .map((i) => (
                <Card title={i.title} id={i.id} key={i.id} />
              ))}
          </div>
          <button
            className="btn btn-ghost btn-xl pb-16 text-primary"
            onClick={moveStackRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      {/* <div className="flex justify-center w-full px-8 py-4 border-t">
        <button className="btn btn-primary btn-lg" onClick={onSubmit}>
          {"I'm finished!"}
        </button>
      </div> */}
    </div>
  );
};

export default CardSort;
