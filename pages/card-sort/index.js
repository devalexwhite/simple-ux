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
    <div>
      <div className={styles.cardContainer}>
        {cards
          .filter((i) => !cardsInList().includes(i.id))
          .map((i) => (
            <Card title={i.title} id={i.id} key={i.id} />
          ))}
      </div>
      <div>
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
        <DropZone
          id={"0"}
          className={styles.newListDropzone}
          ondrop={onZoneCardDrop}
        >
          Create new group
        </DropZone>
      </div>
      <div>
        <button>Cancel</button>
        <button onClick={onSubmit}>I'm finished!</button>
      </div>
    </div>
  );
}
