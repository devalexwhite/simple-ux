import { useState } from "react";
import { Card } from "../../components/card";
import { CardList } from "../../components/cardList";
import { DropZone } from "../../components/dropZone";
import styles from "../../styles/CardSort.module.css";

export default function () {
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

  const [lists, setLists] = useState([
    {
      id: "0",
      title: "Example Group",
      locked: true,
      cards: [],
    },
  ]);

  const onSubmit = () => {
    const inGroups = cardsInList();
    const hasRCards = inGroups.length < cards.length;
    if (hasRCards) {
      if (!confirm("There are still cards not in a group, continue?")) return;
    }

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

    console.log(submitObject);
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
    console.log(ev);
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");

    setLists([
      ...lists.map((i) => ({
        ...i,
        cards: [...i.cards.filter((c) => c != data)],
      })),
      {
        id: `${listCount}`,
        title: "",
        cards: [data],
        locked: false,
      },
    ]);

    setListCount(listCount + 1);
  };

  const onListCardDrop = (listId, cardId) => {
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
    <div className="flex flex-col min-h-screen">
      <div className="w-full py-4 px-4">
        <div className="px-2 pb-4">
          <progress
            class="progress progress-primary mb-4"
            value={cardsInList().length}
            max={cards.length}
          ></progress>
          <span className="block font-medium">Drag the cards below</span>
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
        id={"0"}
        className="w-full py-16 border-2 font-bold bg-base-300 text-center"
        ondrop={onZoneCardDrop}
      >
        Drop a card here to form a group
      </DropZone>
      <div className="flex-1 flex flex-row overflow-y-auto">
        {lists.map((i) => (
          <div key={i.id}>
            <CardList
              id={i.id}
              title={i.title}
              onCardDrop={(id) => onListCardDrop(i.id, id)}
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
      <div className="flex justify-between w-full px-8 py-4 border-t">
        <button className="btn btn-ghost">Cancel</button>
        <button className="btn btn-primary" onClick={onSubmit}>
          I'm finished!
        </button>
      </div>
    </div>
  );
}
