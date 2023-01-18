import { Group, Space, Text, Title } from "@mantine/core";
import List from "../list/List";
import { useStyles } from "./Board.styles";
import { useState } from "react";
import { useDidUpdate } from "@mantine/hooks";
import useLists from "../../hooks/useLists";
import AddBoardList from "./addBoardList/AddBoardList";

type ListType = Array<List & { cards: Card[] }>;

interface BoardProps {
  board: Board;
  lists: ListType;
}
export default function Board(props: BoardProps) {
  const { board, lists } = props;
  const { classes } = useStyles();
  const [{ data }, { addList, removeList }] = useLists();
  const [boardLists, setBoardLists] = useState<ListType>(lists);
  const [newLists, setNewLists] = useState<ListType>([]);
  const [opened, setOpened] = useState(false);
  const [newListName, setNewListName] = useState("");

  useDidUpdate(() => {
    if (data && data.name) {
      setBoardLists((prev) => [...prev, { ...data, cards: [] }]);
      setNewLists([]);
    }
    if (data && Object.keys(data).length === 1) {
      setBoardLists((prev) => prev.filter((l) => l.id !== data.id));
    }
  }, [data]);

  const removeListFromBoard = (listId: number) => {
    removeList(listId);
  };

  const onAddList = () => {
    const newList: List = {
      board_id: board.id ?? 0,
      name: newListName,
      position: 1,
    };
    addList(newList);
    setNewLists((prev) => {
      return [...prev, { ...newList, cards: [] }];
    });
  };

  return (
    <>
      <Title>{board.name}</Title>
      <Text color="gray.6">{board.description}</Text>
      <Space h="md" />
      <Group grow className={classes.listContainer}>
        {boardLists.map((l) => (
          <List
            list={l}
            cards={l.cards}
            removeListFromBoard={removeListFromBoard}
          />
        ))}
        {newLists.map((l) => (
          <List list={l} cards={[]} />
        ))}
        <AddBoardList
          opened={opened}
          setOpened={setOpened}
          newListName={newListName}
          setNewListName={setNewListName}
          onAddList={onAddList}
        />
      </Group>
    </>
  );
}
