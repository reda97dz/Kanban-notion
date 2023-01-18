import { Button, Flex } from "@mantine/core";
import Card from "../card/Card";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import useCards from "../../hooks/useCards";
import useLists from "../../hooks/useLists";
import ListTitle from "./ListTitle/ListTitle";

interface ListProps {
  list: List;
  cards: Card[];
  removeListFromBoard?: (listId: number) => void;
}

export default function List(props: ListProps) {
  const { list, cards, removeListFromBoard } = props;
  const [listCards, setListCards] = useState<Card[]>(cards);
  const [newCards, setNewCards] = useState<Card[]>([]);
  const [{ data }, { addCard, removeCard }] = useCards();
  const [_, { editList }] = useLists();
  const [listName, setListName] = useState(list.name);
  const [listNameInput] = useDebouncedValue(listName, 500);

  useDidUpdate(() => {
    if (list.id)
      editList(list.id, {
        ...list,
        name: listNameInput,
      });
  }, [listNameInput]);

  const addCardToList = (card: Card) => {
    addCard(card);
  };

  const removeCardFromList = (cardId: number) => {
    removeCard(cardId);
  };

  useDidUpdate(() => {
    if (data && data.name) {
      setListCards((prev) => [...prev, data]);
      setNewCards([]);
    }
    if (data && Object.keys(data).length === 1) {
      setListCards((prev) => prev.filter((l) => l.id !== data.id));
    }
  }, [data]);

  const onClickAdd = () => {
    setNewCards((prev) => {
      const newCard: Card = {
        description: "",
        due_date: "2022-01-01 12:00:00",
        list_id: list.id ?? 0,
        name: "",
        position: 1,
      };
      return [...prev, newCard];
    });
  };

  return (
    <Flex direction="column" gap={4}>
      <ListTitle
        listName={listName}
        setListName={setListName}
        length={listCards.length}
        removeListFromBoard={() => {
          if (removeListFromBoard && list.id) removeListFromBoard(list.id);
        }}
      />
      {listCards.map((card) => (
        <Card
          card={card}
          removeCardFromList={removeCardFromList}
          key={Math.random()}
        />
      ))}
      {newCards.map((card) => (
        <Card
          card={card}
          addCardToList={addCardToList}
          newCard
          key={Math.random()}
        />
      ))}
      <Button
        onClick={onClickAdd}
        variant="subtle"
        color="gray"
        leftIcon={<IconPlus size={20} />}
        styles={{
          inner: {
            justifyContent: "flex-start",
          },
        }}
      >
        New
      </Button>
    </Flex>
  );
}
